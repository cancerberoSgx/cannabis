## Objective real life queries:

* function containsAnyOf: // ClassDeclaration [containsAnyOf(@name, {classNames})] . containAnyOf(s: string, a: string[]). 
  * similar containedInAnyOf, containedInAllOf, containsAllOf
  * or a general function: contain(predicate: 'contains'|'contained', multiplicity: 'allOf', 'anyOf', 'noneOf', s: string|number, a: string[]|number[])
  * CLI example: `cannabis --query "[//* containsAnyOf(@name, {blackList}]" --project . --paramsFile blackListWords.txt`
  
* search text in comments : //LineComment [@text =~ ]

* `// ClassDeclaration [implements({IDNode})]` - example: 
```ts
var touchable = queryOne('//InterfaceDeclaration [@path ~= 'src/touch' && @name=='Touchable]'); 
var classes = queryAll('//ClassDeclaration [@path~= src/**/*area48/implements({touchable})])', {params: {touchable}})
// class 
```
 * function isDeclaration()

*   // files matching src/**/*Test.ts* that doesn't contain a class implementing (recursively) an the interface import('src/service/login/loginService.ts').LoginService
* // files in src/** referencing type import('old-library').Obsolete
* function that filter w glob-like expressions, by default using the type. Could ba also node index, node name, etc. Example: 
`//VariableDeclaration [matchAttributePatter('name', 'src/**/area45/**/*Model.ts*/**/MethodDeclaration/**/IfStatement/VariableDeclaration') == true]` 
meaning get all variable declaration in files matching`src/**/area45/**/*Model.ts*/` and direct children of statement matching `**/MethodDeclaration/**/IfStatement/VariableDeclaration`

 * idea  : git integration
```ts
var luisSuarezArea48Functions = queryAll(`//FunctionDeclaration [match(@path, 'src/**/*area48/**/*.ts')==true && git('lastModifiedBy')=='luisSuarez']`)
```
 * https://isomorphic-git.org/docs/en/fs

## research what else we can add as functions or attributes:

 * async api to execute search/compile so we can clal from browser bit without blocking
 * attribtues must add: 
 //body, expression, symbol, type, pos, start, getModifiers, 

possible functions

// isTypeParameteredNode, isAbstractableNode, isAmbientableNode, isArgumentedNode, isAsyncableNode,
// isAwaitableNode, isBodiedNode, isBodyableNode, DecoratableNode, ScopedNode, staticableNode,
// PropertyNamedNode, OverloadableNode, GeneratorableNode, ModifierableNode, JSDocableNode, ReadonlyableNode,
// ExclamationTokenableNode, QuestionTokenableNode, InitializerExpressionableNode, PropertyNamedNode

/*

possible attributes:

 // TODO: body, expression, symbol, type, pos, start, fullStart, fuillText, width, fullWIdth,
 leadingtriviaWidth, trailingTriviaWidth, trailingTriviaEnd, getCombinedModifierFlags, getLastToken,
 childIndex, getIndentationLevel, getChildIndentationLevel, getIndentationText, getChildIndentationText,
 getStartLinePos, getStartLineNumber, getEndLineNumber, isFirstNodeOnLine, getLeadingCommentRanges,
 getTrailingCommentRanges, getScope, getReturnType, isStatic, getTypeArguments, getTypeParameters,
 getProperties, getStaticProperties, getInstanceProperties, getGetAccessors, getSetAccessors, getMethods,
 getStaticMethods, getInstanceMethods, getStaticMembers, getInstanceMembers, getMembers, getBaseTypes,.
 getBaseClass, getDerivedClasses, children, childCount

*/


 add scope, isASync isStatic, isExported, etc or just with modifiers is OK ? 
   
   
   /**
     * Gets the compiler symbol or undefined if it doesn't exist.
     */
    getSymbol(): Symbol | undefined;
    /**
     * Gets the type of the node.
     */
    getType(): Type;
    /**
     * If the node contains the provided range (inclusive).
     * @param pos - Start position.
     * @param end - End position.
     */
    containsRange(pos: number, end: number): boolean;
    /**
     * Gets if the specified position is within a string.
     * @param pos - Position.
     */
    isInStringAtPos(pos: number): boolean;

    
    /**
     * Gets the child syntax list if it exists.
     */
    getChildSyntaxList(): SyntaxList | undefined;


      /**
     * Gets the child at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getChildAtPos(pos: number): Node | undefined;
    /**
     * Gets the most specific descendant at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getDescendantAtPos(pos: number): Node | undefined;
    /**
     * Gets the most specific descendant at the provided start text position with the specified width, or undefined if not found.
     * @param start - Start text position to search for.
     * @param width - Text length of the node to search for.
     */
    getDescendantAtStartWithWidth(start: number, width: number): Node | undefined;

      /**
     * Gets the last token of this node. Usually this is a close brace.
     */
    getLastToken(): Node;
    /**
     * Gets if this node is in a syntax list.
     */
    isInSyntaxList(): boolean;
    /**
     * Gets the parent if it's a syntax list or throws an error otherwise.
     */
    getParentSyntaxListOrThrow(): SyntaxList;
    /**
     * Gets the parent if it's a syntax list.
     */
    getParentSyntaxList(): SyntaxList | undefined;
    /**
     * Gets the child index of this node relative to the parent.
     */
    getChildIndex(): number;

      /**
     * Gets the last token of this node. Usually this is a close brace.
     */
    getLastToken(): Node;
    /**
     * Gets if this node is in a syntax list.
     */
    isInSyntaxList(): boolean;
    /**
     * Gets the parent if it's a syntax list or throws an error otherwise.
     */
    getParentSyntaxListOrThrow(): SyntaxList;
    /**
     * Gets the parent if it's a syntax list.
     */
    getParentSyntaxList(): SyntaxList | undefined;
    /**
     * Gets the child index of this node relative to the parent.
     */
    getChildIndex(): number;