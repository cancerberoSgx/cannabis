export const functionSignatures = [
  {
    "name": "isFunctionLike",
    "signature": "isFunctionLike(arg?: ASTNode): boolean",
    "jsDocsText": "Returns true if current node kind is function like, this is, is a callable node like\n`FunctionDeceleration`, `MethodDeclaration`, `ArrowFunction`, etc. Example:  \n`//* [ isFunctionLike() && type() != ConstructorDeclaration]`"
  },
  {
    "name": "getExtended",
    "signature": "getExtended(node?: ASTNode): ASTNode[]",
    "jsDocsText": "Gets all extended types by given node or current node if node was not given. "
  },
  {
    "name": "getExtendedNames",
    "signature": "getExtendedNames(node?: ASTNode): string[]",
    "jsDocsText": "Gets the names of all extended types by given node or current node if node was not given. "
  },
  {
    "name": "extendsAllNamed",
    "signature": "extendsAllNamed(nameOrNode: ASTNode | string | string[], name?: string | string[]): boolean",
    "jsDocsText": "Same as extendsAllNamed but returns true only if the node extends (directly or indirectly) types including ALL names."
  },
  {
    "name": "extendsAnyNamed",
    "signature": "extendsAnyNamed(name: string, arg?: ASTNode): boolean",
    "jsDocsText": "Supports two signatures: `extendsAnyNamed(name: string|string[]): boolean` , `extendsAnyNamed(node: ASTNode, name: string|string[]): boolean`. \n\nReturns true if current node (or given node given as parameter) extends any class or interface (directly or indirectly) which name is included in `names` parameter. If `names` is a string then it will be split using ','. \n\nExample: `//ClassDeclaration [extendsAnyNamed('Base,ExternalBase')]`: Returns true if current node ClassDeclaration extends (directly or indirectly) a class named 'Base' OR 'ExternalBase'. \n\nExample: `Identifier [extendsAnyNamed(parent(), {names})`: Returns true if current node's parent extends (directly or indirectly) a type with name included in names parameter.\n\nTake into account that it will search across all `extends` HeritageClauses, (directly or indirectly) so it's an expensive operation. Also remember that an interface can extend both interfaces and classes"
  },
  {
    "name": "getImplementations",
    "signature": "getImplementations(arg?: ASTNode): ASTNode[]",
    "jsDocsText": ""
  },
  {
    "name": "getImplementationNames",
    "signature": "getImplementationNames(arg?: ASTNode): string[]",
    "jsDocsText": ""
  },
  {
    "name": "text",
    "signature": "text(node?: ASTNode): string",
    "jsDocsText": "Return the text of given node or of current node if no node is given. "
  },
  {
    "name": "implementsAnyNamed",
    "signature": "implementsAnyNamed(name: string, arg?: ASTNode): boolean",
    "jsDocsText": ""
  },
  {
    "name": "implementsAllNamed",
    "signature": "implementsAllNamed(name: string, arg?: ASTNode): boolean",
    "jsDocsText": ""
  },
  {
    "name": "findReferences",
    "signature": "findReferences(arg?: ASTNode): ASTNode[]",
    "jsDocsText": ""
  },
  {
    "name": "sourceFile",
    "signature": "sourceFile(arg?: ASTNode): ASTNode",
    "jsDocsText": "Gets given node's SourceFile or current node's if no node is given. "
  },
  {
    "name": "kindName",
    "signature": "kindName(arg?: ASTNode): string",
    "jsDocsText": "Returns kind name of given node, or current node if no node was given."
  },
  {
    "name": "debug",
    "signature": "debug(...args: any[]): true",
    "jsDocsText": ""
  },
  {
    "name": "parent",
    "signature": "parent(arg?: ASTNode): ASTNode | null",
    "jsDocsText": "Returns parent node of given node, or of current node if no node was  given. Returns null if there is no parent. "
  },
  {
    "name": "children",
    "signature": "children(arg?: ASTNode): ASTNode[]",
    "jsDocsText": "Returns children nodes of given node, or of current node if no node was given."
  },
  {
    "name": "join",
    "signature": "join(arr: string[], joinChar?: string): string",
    "jsDocsText": "Returns the `join()` on given array of strings using given joinChar or ',' by default."
  },
  {
    "name": "includes",
    "signature": "includes(arr: string | any[], item: any): boolean",
    "jsDocsText": "Returns true if given array contains given item. If arr is a string it will be split using ',', character. "
  },
  {
    "name": "compareText",
    "signature": "compareText(actual: string, expected: string, options?: string): boolean",
    "jsDocsText": ""
  },
  {
    "name": "matchEvery",
    "signature": "matchEvery(list: string | string[], patterns: string | string[]): boolean",
    "jsDocsText": "Returns true if every string in the given `list` matches any of the given glob `patterns`."
  },
  {
    "name": "matchAll",
    "signature": "matchAll(input: string | string[], patterns: string | string[]): boolean",
    "jsDocsText": "Returns true if all of the given patterns match the specified string."
  },
  {
    "name": "array",
    "signature": "array(...args: any[]): any[]",
    "jsDocsText": "returns an array consisting on given arguments: "
  },
  {
    "name": "map",
    "signature": "map(arr: any[], propertyName: string): string[]",
    "jsDocsText": "Returns an array resulting on obtaining the property named 'propertyName' of each item of given array. If the value of the property is a function, then the result will be the return value of the method call without arguments. Example: `// * [includes(map(children(), 'getKindName'), 'Identifier')]`"
  },
  {
    "name": "type",
    "signature": "type(): string",
    "jsDocsText": "Return type of current node. Example: `type() == \"foo\"`"
  },
  {
    "name": "attrs",
    "signature": "attrs(sep: string): string",
    "jsDocsText": "Return the `sep`-separated concatenation of all attribute names of current node. The `sep` string is\n alway also prepended and appended for easier comparison of the result string. Example: `attr(\",\") ==\n \",foo,bar,\"`"
  },
  {
    "name": "depth",
    "signature": "depth(): number",
    "jsDocsText": "Return depth in AST of current node (counting from 1 for the root node). Example: `depth() <= 3`"
  },
  {
    "name": "pos",
    "signature": "pos(): number",
    "jsDocsText": "Return position of current node among sibling (counting from 1 for the first sibling). Example: `pos()\n == 2`"
  },
  {
    "name": "nth",
    "signature": "nth(pos: number): boolean",
    "jsDocsText": " Check whether position of current node among sibling is `pos` (counting from 1 for the first sibling).\n Negative values for `pos` count from the last sibling backward, i.e., `-1` is the last sibling. Example:\n `nth(3)`"
  },
  {
    "name": "first",
    "signature": "first(): boolean",
    "jsDocsText": " Shorthand for `nth(1)`."
  },
  {
    "name": "last",
    "signature": "last(): boolean",
    "jsDocsText": " Shorthand for `nth(-1)`."
  },
  {
    "name": "count",
    "signature": "count(array: Object[]): number",
    "jsDocsText": "Return the number of elements in `array`. The `array` usually is either an externally passed-in\n parameter or a sub-query. Example: `count({nodes}) <= count(// *)`"
  },
  {
    "name": "below",
    "signature": "below(node: ASTNode): boolean",
    "jsDocsText": " Checks whether current node is somewhere below `node`, i.e., whether current node is a child or\n descendant of `node`. Usually, this makes sense only if `node` is an externally passed-in parameter.\n Example: `below({node})`."
  },
  {
    "name": "follows",
    "signature": "follows(node: ASTNode): boolean",
    "jsDocsText": " Checks whether current node is following `node`, i.e., whether current node comes after `node` in a\n standard depth-first tree visit (where parents are visited before childs). Usually, this makes sense\n only if `node` is an externally passed-in parameter. Example: `follows({node})`."
  },
  {
    "name": "in",
    "signature": "in(nodes: ASTNode[]): number",
    "jsDocsText": " Checks whether current node is in `nodes`. Usually, `nodes` is either an externally passed-in parameter\n or a sub-query. Example: `in({nodes})`."
  },
  {
    "name": "substr",
    "signature": "substr(str: string, pos: number, len: number): string",
    "jsDocsText": "Returns the sub-string of `str`, starting at `pos` with length `len`. Negative values for `pos` count\n from the end of the string, i.e., `-1` is the last character. Example: `substr(@foo, 0, 1) == \"A\"`"
  },
  {
    "name": "index",
    "signature": "index(str: string, sub: string, pos: number): number",
    "jsDocsText": "Returns the index position of sub-string `sub` in string `str`, starting at `pos`. Example:\n `indexof(@foo, \"bar\", 0) >= 0`"
  },
  {
    "name": "trim",
    "signature": "trim(str: string): string",
    "jsDocsText": "Returns the string `str` with whitespaces removed from begin and end. Example: `trim(@foo) == \"bar\"`"
  },
  {
    "name": "lc",
    "signature": "lc(str: string): string",
    "jsDocsText": "Returns the lower-case variant of `str`. Example: `lc(@foo) == \"bar\"`"
  },
  {
    "name": "uc",
    "signature": "uc(str: string): string",
    "jsDocsText": "Returns the upper-case variant of `str`. Example: `uc(@foo) == \"BAR\"`"
  }
]
