export const functionSignatures = [
  {
    "name": "isFunctionLike",
    "signature": "isFunctionLike(arg?: ASTNode): boolean",
    "jsDocsText": "Returns true if current node kind is function like, this is, is a callable node like\n`FunctionDeceleration`, `MethodDeclaration`, `ArrowFunction`, etc. Example:  `//* [ isFunctionLike() &&\ntype() != ConstructorDeclaration]`"
  },
  {
    "name": "getExtended",
    "signature": "getExtended(arg?: ASTNode): ASTNode[]",
    "jsDocsText": ""
  },
  {
    "name": "getExtendedNames",
    "signature": "getExtendedNames(arg?: ASTNode): string[]",
    "jsDocsText": ""
  },
  {
    "name": "extendsAllNamed",
    "signature": "extendsAllNamed(name: string, arg?: ASTNode): boolean",
    "jsDocsText": ""
  },
  {
    "name": "extendsAnyNamed",
    "signature": "extendsAnyNamed(name: string, arg?: ASTNode): boolean",
    "jsDocsText": ""
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
    "signature": "text(arg?: ASTNode): string",
    "jsDocsText": ""
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
    "jsDocsText": ""
  },
  {
    "name": "kindName",
    "signature": "kindName(arg?: ASTNode): string",
    "jsDocsText": ""
  },
  {
    "name": "debug",
    "signature": "debug(...args: any[]): true",
    "jsDocsText": ""
  },
  {
    "name": "parent",
    "signature": "parent(arg?: ASTNode): ASTNode",
    "jsDocsText": ""
  },
  {
    "name": "children",
    "signature": "children(arg?: ASTNode): ASTNode[]",
    "jsDocsText": ""
  },
  {
    "name": "join",
    "signature": "join(arr: string[], joinChar?: string): string",
    "jsDocsText": ""
  },
  {
    "name": "includes",
    "signature": "includes(arr: string | any[], item: any): boolean",
    "jsDocsText": ""
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
    "jsDocsText": ""
  },
  {
    "name": "map",
    "signature": "map(propertyName: string, ...arr: any[]): string[]",
    "jsDocsText": ""
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
],