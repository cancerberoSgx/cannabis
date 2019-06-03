import { ASTNode } from '../astNode'


interface Functions extends BuiltInFunctions {
  /**
   * Returns true if current node kind is function like, this is, is a callable node like
   * `FunctionDeceleration`, `MethodDeclaration`, `ArrowFunction`, etc. Example:  `//* [ isFunctionLike() &&
   * type() != ConstructorDeclaration]`
   */
  isFunctionLike(arg?: ASTNode): boolean
  getExtended(arg?: ASTNode): ASTNode[]
  getExtendedNames(arg?: ASTNode): string[]
  extendsAllNamed(name: string, arg?: ASTNode): boolean
  extendsAnyNamed(name: string, arg?: ASTNode): boolean
  getImplementations(arg?: ASTNode): ASTNode[]
  getImplementationNames(arg?: ASTNode): string[]
  text(arg?: ASTNode): string
  implementsAnyNamed(name: string, arg?: ASTNode): boolean
  implementsAllNamed(name: string, arg?: ASTNode): boolean
  findReferences(arg?: ASTNode): ASTNode[]
  sourceFile(arg?: ASTNode): ASTNode
  kindName(arg?: ASTNode): string
  debug(...args: any[]): true
  parent(arg?: ASTNode): ASTNode
  children(arg?: ASTNode): ASTNode[]
  join(arr: string[], joinChar?: string): string
  includes(arr: any[], item: any): boolean
  compareText(actual: string, expected: string, options?: string): boolean
  contains(a: string | any[], b: any): boolean
  /**
Returns true if every string in the given `list` matches any of the given glob `patterns`.

**Params**

* `list` **{String|Array}**: The string or array of strings to test.
* `patterns` **{String|Array}**: One or more glob patterns to use for matching.
* `options` **{Object}**: See available [options](#options) for changing how matches are performed
* `returns` **{Boolean}**: Returns true if any patterns match `str`

**Example**

```js
const mm = require('micromatch');
// mm.every(list, patterns[, options]);

console.log(mm.every('foo.js', ['foo.js']));
// true
console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
// true
console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
// false
console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
// false
```
   */
  matchEvery(input: string | string[], patterns: string | string[]): boolean

  /**
   * Returns true if all of the given patterns match the specified string.

Params

str {String|Array}: The string to test.
patterns {String|Array}: One or more glob patterns to use for matching.
options {Object}: See available options for changing how matches are performed
returns {Boolean}: Returns true if any patterns match str
Example
```
const mm = require('micromatch');
// mm.all(string, patterns[, options]);

console.log(mm.all('foo.js', ['foo.js']));
// true

console.log(mm.all('foo.js', ['*.js', '!foo.js']));
// false

console.log(mm.all('foo.js', ['*.js', 'foo.js']));
// true

console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
// true
```
   */
  matchAll(input: string | string[], patterns: string | string[]): boolean

  array(...args: any[]): any[]

  map(propertyName: string, ...arr: any[]): string[]


}

interface BuiltInFunctions {
  /**
   *  Return type of current node. Example: `type() == "foo"`
   */
  type(): string

  /**
   *  Return the `sep`-separated concatenation of all attribute names of current node. The `sep` string is
   *  alway also prepended and appended for easier comparison of the result string. Example: `attr(",") ==
   *  ",foo,bar,"`
   */
  attrs(sep: string): string

  /**
   *  Return depth in AST of current node (counting from 1 for the root node). Example: `depth() <= 3`
   */
  depth(): number

  /**
   *  Return position of current node among sibling (counting from 1 for the first sibling). Example: `pos()
   *  == 2`
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
   *  Return the number of elements in `array`. The `array` usually is either an externally passed-in
   *  parameter or a sub-query. Example: `count({nodes}) <= count(// *)`
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
   *  Returns the sub-string of `str`, starting at `pos` with length `len`. Negative values for `pos` count
   *  from the end of the string, i.e., `-1` is the last character. Example: `substr(@foo, 0, 1) == "A"`
   */
  substr(str: string, pos: number, len: number): string

  /**
   *  Returns the index position of sub-string `sub` in string `str`, starting at `pos`. Example:
   *  `indexof(@foo, "bar", 0) >= 0`
   */
  index(str: string, sub: string, pos: number): number

  /**
   *  Returns the string `str` with whitespaces removed from begin and end. Example: `trim(@foo) == "bar"`
   */
  trim(str: string): string

  /**
   *  Returns the lower-case variant of `str`. Example: `lc(@foo) == "bar"`
   */
  lc(str: string): string

  /**
   *  Returns the upper-case variant of `str`. Example: `uc(@foo) == "BAR"`
   */
  uc(str: string): string

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
  contains = 'contains',
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
  getImplementations = 'getImplementations',
  getImplementationNames = 'getImplementationNames',
  implementsAnyNamed = 'implementsAnyNamed',
  implementsAllNamed = 'implementsAllNamed',
  findReferences = 'findReferences',
  sourceFile = 'sourceFile',
  kindName = 'kindName',
  parent = 'parent',
  children = 'children',
  'matchEvery' = 'matchEvery',
  "matchAll" = 'matchAll',
  "array" = "array",
  'map'='map',
}

// export const functionNames = enumKeys(FunctionNames)


var o: { [a in FunctionNames]: 1 } = {
  below: 1,
  follows: 1,
  in: 1,
  debug: 1, join: 1,
  includes: 1, compareText: 1,
  contains: 1,
  attrs: 1, depth: 1,
  pos: 1, nth: 1,
  first: 1, last: 1,
  count: 1, substr: 1,
  index: 1, trim: 1,
  lc: 1, uc: 1,
  type: 1,
  isFunctionLike: 1,
  getExtended: 1,
  getExtendedNames: 1,
  text: 1,
  extendsAllNamed: 1,
  extendsAnyNamed: 1,
  getImplementations: 1,
  getImplementationNames: 1,
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
}
