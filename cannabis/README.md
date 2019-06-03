[![Build Status](https://travis-ci.org/cancerberoSgx/cannabis.svg?branch=master)](https://travis-ci.org/cancerberoSgx/cannabis) 
[![Coverage Status](https://coveralls.io/repos/github/cancerberoSgx/cannabis/badge.svg?branch=master)](https://coveralls.io/github/cancerberoSgx/cannabis?branch=master)

**TypeScript AST Query Selector library**

Based on the powerful [astq](https://github.com/rse/astq) AST Query engine and syntax language.

## Contents

<!-- toc -->

- [Playground](#playground)
- [Usage](#usage)
  * [From string](#from-string)
  * [From ts.Node](#from-tsnode)
  * [Loading projects](#loading-projects)
- [Custom Attributes](#custom-attributes)
  * [@text](#text)
  * [@name](#name)
  * [@modifiers](#modifiers)
  * [@type](#type)
  * [@expression](#expression)
- [Custom Functions](#custom-functions)
  * [isFunctionLike()](#isfunctionlike)
  * [extendsAnyNamed(name)](#extendsAnyNamedname)
  * [implementsAnyNamed(name)](#implementsAnyNamedname)
  * [sourceFile(node?)](#sourcefilenode)
  * [findReferences(node?)](#findreferencesnode)
  * [debug(...args?)](#debugargs)
- [Query Syntax](#query-syntax)
- [TODO](#todo)

<!-- tocstop -->

# Playground

Try out this <a href="https://cancerberosgx.github.io/demos/cannabis/typescript-ast-query-editor/">interactive TypeScript AST Query editor</a> with examples to understand what this is all about. 

# Usage

```
npm install cannabis
```

```ts
import { queryAst } from 'cannabis'

const code = `
function f(o: any){
  for(let i in o)
    console.log(i)
}
class A{
  private method1(){
    for(var name in this)
      this.n.push(name)    
  }
}
`
// match Blocks containing ForInStatement direct children
const query = '//Block [ /ForInStatement ]'
const { result, error} = queryAst(query, code1)
if(error){
  // there was a query syntax error 
}else{
  result.map(node=>console.log(node.getStart(), node.getEnd()))
}
```

## From string

## From ts.Node

## Loading projects

cannabis supports AST Nodes of type File and Directory, so it's possible to load a project or folder or sets of files as AST Nodes. 

```
TODO example
```


# Attributes

In general attributes will return a value if there is something to return, empty array, empty string, false or 0 for those types if there is no value to return, and null if thevalue is an object or there was an error. 

## @text

`@text` - `string`

returns current node's text as in `ts.Node#getText()`. Example:

`// VariableDeclaration [ @text!~'2' ]`

## @name

`@name`  - `string`

There are node kinds that have name, like InterfaceDeclaration, and others that don't, like IfStatement. Example: `// * [ @name=='f' && @modifiers=~'export' ]`

## @modifiers

`@modifiers` - `string`

A comma separated modifier names in ` "export","default","declare","abstract","public","protected","private","readonly","static","async","const"`. 

Example: 

`// PropertyDeclaration [ @modifiers=~'private' || @modifiers=~'protected' ]`

If the node has no modifiers at all it returns empty string. 

## @type

`@type`  - `string` 

Returns current node's type string representation. 

If type is not declared it will be inferrer form usage. 

If type doesn't apply to current node it will return empty string. 

Examples: 

`// VariableDeclaration [ @type=='Date[]']`, 

`// Parameter [ @type=='boolean' || @type=='number']`

## @expression

`@expression`  - `Node` (ts-morph Node instance) 

Returns a AST Node if the node has an expression, or null other wise. 

Examples:
TODO

## @literalText

Gets the literal text of a literal-like node , example

`// LiteralString [compareText({forbidden}, @literalText, 'verb:equals,caseSensitive:true']`

## @start

Returns the position of current node in its source file.

## @end

Returns the position of current node's end, in its source file.

## @width

Returns the amount of characters of current node.

## @body

Return current node's body node, or null if it doesn't have a body.

## @leadingComments

Returns the text of comments before this node.

## @trailingComments

Returns the text of comments after this node.

## @indexPath

Returns a child-index based path for the node, similar to `src/services/login/loginService/2/1`

## @kindPath

Returns a node kind based path for the node, like `src/services/login/loginService/InterfaceDeclaration/Identifier`. Notice that unlike @indexPath, this doesn't necessarily points to the node.

## @namePath

Returns a node-name based path for current node, like `src/services/login/loginService/LoginService/method1/param1`. Notice that unlike @indexPath, this doesn't necessarily points to the node. If a node doesn't have a name, its kind name will be printed in the path instead.



# Functions 
 
The following are custom function that can be used in the queries directly, added to standard query functions of astq library, related to TypeScript AST.

## isFunctionLike

 * `isFunctionLike(arg?)` - `boolean`
 
 Returns true if current node kind is function like, this is a callable node like FunctionDeceleration, MethodDeclaration, ArrowFunction, etc.

 Examples: 
 
 `//* [ isFunctionLike() && type() != ConstructorDeclaration]`

## extendsAnyNamed 

Supports two signatures:

`extendsAnyNamed(name: string)` - `boolean`
`extendsAnyNamed(node: ASTNode, name: string|string[])` - `boolean`
 
 Returns true if current node (or given node given as parameter) extends any class or interface (directly or indirectly) which name is included in `names` parameter. If `names` is a string then it will be split using ','. 
 
 Example: `//ClassDeclaration [extendsAnyNamed('Base,ExternalBase')]`: Returns true if current node ClassDeclaration extends (directly or indirectly) a class named 'Base' OR 'ExternalBase'. 

Example: `Identifier [extendsAnyNamed(parent(), {names})`: Returns true if current node's parent extends (directly or indirectly) a type with name included in names parameter.

Take into account that it will search across all `extends` HeritageClauses, (directly or indirectly) so it's an expensive operation. Also remember that an interface can extend both interfaces and classes. Examples:
 
## extendsAllNamed 

## implementsAnyNamed 

`implementsAnyNamed(name: string): boolean`
 
Returns true if current node (class declaration) implements recursively an interface with given name. 
 
Take into account that it will search across all implemented HeritageClauses of all interfaces implemented by super classes and also interfaces extended by super interfaces, recursively. 
 
Examples: 
 
`//ClassDeclaration [implementsAnyNamed('Touchable')]`

## implementsAllNamed 

 ## sourceFile 

`sourceFile(node?: ASTNode): ASTNode | null` 
 
Returns current sourceFile Node.

## findReferences

`(node?: ASTNode): ASTNode[]`

Returns an array of Nodes which are referencing current node. If a project was used as starting node, and current node is exported, then it could return references of nodes in other files.

If an argument is passed it will return the references of that node. 

Examples: 

Find unused variables:

`// VariableDeclaration [@modifiers!~'export' && count(findReferences())==0]`

Passing a node argument:

`// Identifier [@name=='Foo22' && count(findReferences(parent()))>=0]`


## debug(...args?: any[]): true

Examples: 

`// Identifier [..//* && debug(count(findReferences()), kindName(), @name) && count(findReferences())==2]`

## includes

`includes(a: string | any[], b: any): boolean`


## parent 

`parent(arg?ASTNode): ASTNode|null`


## children 

`children(arg?:ASTNode): ASTNode[]`

## sourceFile
  Gets given node's SourceFile or current node's if no node is given. 
  
# Query Syntax

 * [ASTQ Query syntax](astq-query-syntax.md)
 * Based on https://github.com/rse/astq
 * This is a very WIP project...
 * Helper functions to reference high level AST concepts will be added & documented




# TODO

See [TODO.md](TODO.md)