    <!-- /**
     * Gets the line and column number at the provided position (1-indexed).
     * @param pos - Position in the source file.
     */
    getLineAndColumnAtPos(pos: number) {
        const fullText = this.getFullText();
        return {
            line: StringUtils.getLineNumberAtPos(fullText, pos),
            column: StringUtils.getLengthFromLineStartAtPos(fullText, pos) + 1
        };
    }



    /**
     * Gets the child at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getChildAtPos(pos: number): Node | undefined {
        if (pos < this.getPos() || pos >= this.getEnd())
            return undefined;

        for (const child of this._getCompilerChildren()) {
            if (pos >= child.pos && pos < child.end)
                return this._getNodeFromCompilerNode(child);
        }

        return undefined;
    }

    /**
     * Gets the most specific descendant at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getDescendantAtPos(pos: number): Node | undefined {
        let node: Node | undefined;

        while (true) {
            const nextNode: Node | undefined = (node || this).getChildAtPos(pos);
            if (nextNode == null)
                return node;
            else
                node = nextNode;
        }
    }

    /**
     * Gets the most specific descendant at the provided start text position with the specified width, or undefined if not found.
     * @param start - Start text position to search for.
     * @param width - Text length of the node to search for.
     */
    getDescendantAtStartWithWidth(start: number, width: number): Node | undefined {
        let foundNode: Node | undefined;

        this._context.compilerFactory.forgetNodesCreatedInBlock(remember => {
            let nextNode: Node | undefined = this.getSourceFile();

            do {
                nextNode = nextNode.getChildAtPos(start);
                if (nextNode != null) {
                    if (nextNode.getStart() === start && nextNode.getWidth() === width)
                        foundNode = nextNode;
                    else if (foundNode != null)
                        break; // no need to keep looking
                }
            } while (nextNode != null);

            if (foundNode != null)
                remember(foundNode);
        });

        return foundNode;
    }

    /** -->


    Today these are the methods (I found) the library has to perform queries like "most specific descendant contained or containing a position "
```
   getChildAtPos(pos: number): Node | undefined
    getDescendantAtPos(pos: number): Node | undefined
    getDescendantAtStartWithWidth(start: number, width: number): Node | undefined 
```
What I often need to implement / adapt manually are methods to query descendants positioned with respect one or more text ranges. For example, getSmallestDescendantContainingRange, getLargestDescendantContainedInRange. Also I often need some configuration regarding rations/offsets when comparing bounds to be more  less strict. I have more complex problems like selecting inside /outside regions, unions/intesections but I I think those doesn't correspond to this library. Nevertheless I think

Perhaps getDescendantAtStartWithWidth already implements some of this but I'm not sure - seems it doesnt have tests, I will try to play with with it now. Also I see Something is implemented here https://github.com/dsherret/ts-morph/blob/957620031b9f34c42eac6235effaaacc2ad1132b/src/compiler/tools/results/DocumentSpan.ts#L66 

My scenario are text editors, ranges, selections, markers, etc.
Questions:

Has the library  similar methods, or utilities i can reuse to build them?
Would you accept A PR with no more than 2 methods (I guess in Node) that tackle mentioned problems?