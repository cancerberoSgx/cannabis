import { ASTNode, ASTNodeType } from '../node/astNode'

interface BuiltInFunctions {
  /**
   * Return type of current node. Example: `type() == "foo"`
   */
  type(): string

  /**
   * Return the `sep`-separated concatenation of all attribute names of current node. The `sep` string is
   *  alway also prepended and appended for easier comparison of the result string. Example: `attr(",") ==
   *  ",foo,bar,"`
   */
  attrs(sep: string): string

  /**
   * Return depth in AST of current node (counting from 1 for the root node). Example: `depth() <= 3`
   */
  depth(): number

  /**
   * Return position of current node among sibling (counting from 1 for the first sibling). Example: `pos() ==
   *  2`
   */
  pos(): number

  /**
   *  Check whether position of current node among sibling is `pos` (counting from 1 for the first sibling).
   *  Negative values for `pos` count from the last sibling backward, i.e., `-1` is the last sibling. Example:
   *  `nth(3)`
   */
  nth(pos: number): boolean

  /**
   *  Shorthand for `nth(1)`.
   */
  first(): boolean

  /**
   *  Shorthand for `nth(-1)`.
   */
  last(): boolean

  /**
   * Return the number of elements in `array`. The `array` usually is either an externally passed-in parameter
   *  or a sub-query. Example: `count({nodes}) <= count(// *)`
   */
  count(array: Object[]): number

  /**
   *  Checks whether current node is somewhere below `node`, i.e., whether current node is a child or
   *  descendant of `node`. Usually, this makes sense only if `node` is an externally passed-in parameter.
   *  Example: `below({node})`.
   */
  below(node: ASTNode): boolean

  /**
   *  Checks whether current node is following `node`, i.e., whether current node comes after `node` in a
   *  standard depth-first tree visit (where parents are visited before childs). Usually, this makes sense
   *  only if `node` is an externally passed-in parameter. Example: `follows({node})`.
   */
  follows(node: ASTNode): boolean

  /**
   *  Checks whether current node is in `nodes`. Usually, `nodes` is either an externally passed-in parameter
   *  or a sub-query. Example: `in({nodes})`.
   */
  in(nodes: ASTNode[]): number

  /**
   * Returns the sub-string of `str`, starting at `pos` with length `len`. Negative values for `pos` count
   *  from the end of the string, i.e., `-1` is the last character. Example: `substr(@foo, 0, 1) == "A"`
   */
  substr(str: string, pos: number, len: number): string

  /**
   * Returns the index position of sub-string `sub` in string `str`, starting at `pos`. Example:
   *  `indexof(@foo, "bar", 0) >= 0`
   */
  index(str: string, sub: string, pos: number): number

  /**
   * Returns the string `str` with whitespaces removed from begin and end. Example: `trim(@foo) == "bar"`
   */
  trim(str: string): string

  /**
   * Returns the lower-case variant of `str`. Example: `lc(@foo) == "bar"`
   */
  lc(str: string): string

  /**
   * Returns the upper-case variant of `str`. Example: `uc(@foo) == "BAR"`
   */
  uc(str: string): string

}

interface Functions extends BuiltInFunctions {
  /**
   * Returns true if current node kind is function like, this is, is a callable node like
   * `FunctionDeceleration`, `MethodDeclaration`, `ArrowFunction`, etc. Example:  
   * `//* [ isFunctionLike() && type() != ConstructorDeclaration]`
   */
  isFunctionLike(arg?: ASTNode): boolean

  /**
   * Gets all extended types by given node or current node if node was not given. 
   */
  getExtended(node?: ASTNode): ASTNode[]

  /**
   * Gets the names of all extended types by given node or current node if node was not given. 
   */
  getExtendedNames(node?: ASTNode): string[]

  /**
   * Same as extendsAllNamed but returns true only if the node extends (directly or indirectly) types
   * including ALL names.
   */
  extendsAllNamed(nameOrNode: ASTNode | string | string[], name?: string | string[]): boolean

  /**
   * Supports two signatures: `extendsAnyNamed(name: string|string[]): boolean` , `extendsAnyNamed(node:
   * ASTNode, name: string|string[]): boolean`. 
   *
   * Returns true if current node (or given node given as parameter) extends any class or interface (directly
   * or indirectly) which name is included in `names` parameter. If `names` is a string then it will be split
   * using ','. 
   *
   * Example: `//ClassDeclaration [extendsAnyNamed('Base,ExternalBase')]`: Returns true if current node
   * ClassDeclaration extends (directly or indirectly) a class named 'Base' OR 'ExternalBase'. 
   *
   * Example: `Identifier [extendsAnyNamed(parent(), {names})`: Returns true if current node's parent extends
   * (directly or indirectly) a type with name included in names parameter.
   *
   * Take into account that it will search across all `extends` HeritageClauses, (directly or indirectly) so
   * it's an expensive operation. Also remember that an interface can extend both interfaces and classes
   */
  extendsAnyNamed(name: string, arg?: ASTNode): boolean

  /**
   * Returns all interfaces implemented (directly or indirectly) by given classes or if none by current node
   * (class declaration). Returns all implements clauses of this class and its super classes both things
   * recursively, so for accessing the implemented interface declarations, just use `../`
   */
  getImplemented(arg?: ASTNode): ASTNode[]

  /**
   * Same as [[getImplemented]] but just return the names of implemented interfaces.
   */
  getImplementedNames(arg?: ASTNode): string[]

  implementsAnyNamed(name: string, arg?: ASTNode): boolean

  implementsAllNamed(name: string, arg?: ASTNode): boolean

  /**
   * Finds the nodes that reference the definition of given nodes or if none, of current node which have to be
   * an identifier-like node kind.
   */
  findReferences(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
   * Gets given node's SourceFile or current node's if no node is given. 
   */
  sourceFile(arg?: ASTNode | ASTNode[]): ASTNode | ASTNode[]

  /**
   * Returns kind name of given node, or current node if no node was given.
   */
  kindName(arg?: ASTNode | ASTNode[]): string | string[]

  /**
   * The `console.log` for printing debuggin message inside queries. Example: You are stuck with a query like:
   * `include(localNames(ancestors()), 'f')`, so to see the values between calls you can just replace or add
   * debug in any place since it will return the same input. This will be equivalent, and enables printing the
   * values between functions:
   *
   * ```
   * include(localNames(debug(ancestors())), 'f')
   * include(debug(localNames(ancestors())), 'f')
   * debug(include(localNames(ancestors()), 'f'))
   * ```
   *
   * To access the logs you need to register a log function in queryAst options or in setConfig:
   * ```
   * const r = queryAst( 
   * `//VariableStatement [includes(text(debug(siblings())), {text}]`, node, { 
   * log: console.log.bind(console) 
})
```
   * Or more permanently using setConfig:
   *
```
   * setConfig({log: (...args: any[])=>{...}})
```
*/
  debug<T extends any[]>(...args: T): T

  /**
   * Returns parent node of given node, or of current node if no node was  given. Returns null if there is no
   * parent. 
   */
  parent(arg?: ASTNode | ASTNode[]): ASTNode | null | (ASTNode | null)[]

  /**
  * Returns children nodes of given node, or of current node if no node was given.
  */
  children(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
  * Returns siblings nodes of given node, or of current node if no node was given.
  */
  siblings(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
  * Returns ancestor nodes of given nodes, or of current node if nodes was given.
  */
  ancestors(nodes?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
   * Returns the `join()` on given array of strings using given joinChar or ',' by default.
   */
  join(arr: string[], joinChar?: string): string

  /**
   * Returns the `flat()` on given array of arrays.
   */
  flat<T extends any>(arr: T[][]): T[]

  /**
   * Returns declaration nodes of given expressions or references. It can be used together with findReferences
   * to obtain the declarations.
   */
  declarations(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
   * Returns true if given array contains given item. If arr is a string it will be split using ',',
   * character. 
   */
  includes(arr: string | any[], item: any): boolean

  /**
   * Flexible API to compare strings or array of strings. Supports different compare operators: contains,
   * equals, asSourceCode, caseInsensitive, as well as different multiplicity : anyOf, allOf. For example,
   * functions like implementsAnyOf, implementsALlOffuse it. It accepts strings or array of strings. If
   * strings are given, by defaul they will be splitted using ',' character. Accept options as string using
   * the syntax: 'a:b,c:2,g:true'.
   */
  compareText(actual: string, expected: string, options?: string): boolean

  /**
   * Returns the name based path of given nodes or if none of current node. Example:
   * `'src/ui/components/leftPanel/VariableStatement'`
   */
  namePath(arg?: ASTNode | ASTNode[]): string | string[]

  /**
   * Returns true if every string in the given `list` matches any of the given glob `patterns`. It accepts
   * globs as in (minimatch) so is a very powerful selection tool. Example: `//* [ matchEvery(array(@name,
   * @text), '**I**,**2**') ]`
   */
  matchEvery(list: string | string[], patterns: string | string[]): boolean

  /**
   * Returns true if all of the given patterns match the specified string.
   */
  matchAll(input: string | string[], patterns: string | string[]): boolean

  /**
   * returns an array consisting on given arguments
   */
  array(...args: any[]): any[]

  /**
   * Returns an array resulting on obtaining the property named 'propertyName' of each item of given array. If
   * the value of the property is a function, then the result will be the return value of the method call
   * without arguments. Example: `// * [includes(map(children(), 'getKindName'), 'Identifier')]`
   */
  map(arr: any[], propertyName: string): string[]

  /**
   * Returns subclasses declaration (direct or indirect) .
   */
  derivedClasses(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
   * Gets the implementations of the identifier. This is similar to "go to implementation" functionality that
   * exists with TypeScript in most IDEs.
   */
  getImplementations(arg?: ASTNode | ASTNode[]): ASTNode[] | ASTNode[][]

  /**
   * Returns the local names found in given nodes or current node's local execution scope. Target nodes must
   * be something with an execution scope, like a function-like declaration
   *
   * `// * [ (./VariableDeclaration || ./Parameter) && @name != 'b' && !includes(localNames(), 'b')]`
   */
  localNames(arg?: ASTNode | ASTNode[]): string[] | string[][]

  /**
   * Returns given nodes type text representation, or or current node's if no node were given.. uses The same
   * implementation as attribute 'type' so, if types asrt enot explicitly declares in the code, will be
   * inferred form usage. 
   */
  typeText(arg?: ASTNode | ASTNode[]): string | string[]

  /**
   * Return the text of given node or of current node if no node is given. 
   */
  text(node?: ASTNode): string

  /**
   * Return the name of given node or of current node if no node is given. 
   */
  name(node?: ASTNode): string

  /**
   * Returns the return types of given function-fike nodes or if none given, of current node.  
   *
   * Returned values are not AST Nodes, so you can't use attributes or functions or them, you can only accees
   * them using [[get]], for example, `get(returnType(), 'getText')`.
   */
  returnType(arg?: ASTNode | ASTNode[]): ASTNodeType | ASTNodeType[]

  /**
   * returns the types of given nodes or of current node if none given. 
   *
   * Notice that Returned values are not AST Nodes, so you can't use attributes or funcitons or them, you can
   * only accees them using [[get]], for example, `get(returnType(), 'getText')`.
   */
  Type(arg?: ASTNode | ASTNode[]): ASTNodeType | ASTNodeType[]

  /**
   * Returns given property value of given nodes or if none given, of current node.if the property is a
   * method, then it calls it without passing arguments.
   */
  get(nodesOrName?: string | ASTNodeType | ASTNodeType[], name?: string): ASTNodeType | ASTNodeType[]
}

/**
 * This enum contains the function names supported by cannabis, plus also the ASTQ library built in functions.
 * User's can reference function names from  their queries using this instead of hard coding their names as
 * strings. Also could help when needing to list all supported functions. 
 */
export enum FunctionNames {
  below = 'below',
  follows = 'follows',
  in = 'in',
  debug = 'debug',
  join = 'join',
  includes = 'includes',
  compareText = 'compareText',
  attrs = 'attrs',
  depth = 'depth',
  pos = 'pos',
  nth = 'nth',
  first = 'first',
  last = 'last',
  count = 'count',
  substr = 'substr',
  index = 'index',
  trim = 'trim',
  lc = 'lc',
  uc = 'uc',
  type = 'type',
  isFunctionLike = 'isFunctionLike',
  getExtended = 'getExtended',
  getExtendedNames = 'getExtendedNames',
  text = 'text',
  extendsAllNamed = 'extendsAllNamed',
  extendsAnyNamed = 'extendsAnyNamed',
  getImplemented = 'getImplemented',
  getImplementedNames = 'getImplementedNames',
  implementsAnyNamed = 'implementsAnyNamed',
  implementsAllNamed = 'implementsAllNamed',
  findReferences = 'findReferences',
  sourceFile = 'sourceFile',
  kindName = 'kindName',
  parent = 'parent',
  children = 'children',
  matchEvery = 'matchEvery',
  matchAll = 'matchAll',
  array = "array",
  map = 'map',
  declarations = 'declarations',
  ancestors = 'ancestors',
  flat = 'flat',
  namePath = 'namePath',
  siblings = 'siblings',
  name = 'name',
  derivedClasses = 'derivedClasses',
  getImplementations = 'getImplementations',
  localNames = 'localNames',
  typeText = 'typeText',
  Type = "Type",
  get = 'get',
  returnType = 'returnType'
}

var o: { [a in FunctionNames]: 1 } = {
  below: 1,
  follows: 1,
  in: 1,
  debug: 1,
  join: 1,
  includes: 1,
  compareText: 1,
  attrs: 1,
  depth: 1,
  pos: 1,
  nth: 1,
  first: 1,
  last: 1,
  count: 1,
  substr: 1,
  index: 1,
  trim: 1,
  lc: 1, uc: 1,
  type: 1,
  isFunctionLike: 1,
  getExtended: 1,
  getExtendedNames: 1,
  text: 1,
  extendsAllNamed: 1,
  extendsAnyNamed: 1,
  getImplemented: 1,
  getImplementedNames: 1,
  implementsAnyNamed: 1,
  implementsAllNamed: 1,
  findReferences: 1,
  sourceFile: 1,
  kindName: 1,
  parent: 1,
  children: 1,
  matchEvery: 1,
  matchAll: 1,
  array: 1,
  map: 1,
  declarations: 1,
  ancestors: 1,
  flat: 1,
  namePath: 1,
  siblings: 1,
  name: 1,
  derivedClasses: 1,
  getImplementations: 1,
  localNames: 1,
  typeText: 1,
  Type: 1,
  get: 1,
  returnType: 1
}
