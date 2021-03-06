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

Returns current node's name if any. If it doesn't have a name, it returns an empty string. Nodes that have name are for example, Identifiers, class declarations in general, interface declarations, member declarations, variable declarations, object literal properties, etc, Examples: 

`// * [ @name=='f' && @modifiers=~'export' ]`

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



# Functions 
 
The following are custom function that can be used in the queries directly, added to standard query functions of astq library, related to TypeScript AST.

## isFunctionLike()

 * `isFunctionLike(arg?)` - `boolean`
 
 Returns true if current node kind is function like, this is a callable node like FunctionDeceleration, MethodDeclaration, ArrowFunction, etc.

 Examples: 
 
 `//* [ isFunctionLike() && type() != ConstructorDeclaration]`

## extendsAnyNamed(name)

`extendsAnyNamed(name)` - `boolean`
 
Returns true if current node (class declaration or interface declaration) extends recursively a type with given name. 

Take into account that it will search across  HeritageClauses of all Take into account that it will search across all `extends` HeritageClauses, recursively.

Also notice that it applies  both to classes and interfaces and remember that an interface can extend both interfaces and classes. 

Examples: 

`//ClassDeclaration [extendsAnyNamed('BaseClass')]`

`//InterfaceDeclaration [extendsAnyNamed('Touchable')]`
 
## implementsAnyNamed(name)

`implementsAnyNamed(name)` - `boolean`
 
Returns true if current node (class declaration) implements recursively an interface with given name. 
 
Take into account that it will search across all implemented HeritageClauses of all interfaces implemented by super classes and also interfaces extended by super interfaces, recursively. 
 
Examples: 
 
`//ClassDeclaration [implementsAnyNamed('Touchable')]`

 ## sourceFile(node?)

`sourceFile()` - `SourceFile` (ts-morph Node)
 
Returns current sourceFile Node

## findReferences(node?)

TODO

## debug(...args?)

TODO



# Query Syntax

 * [ASTQ Query syntax](astq-query-syntax.md)
 * Based on https://github.com/rse/astq
 * This is a very WIP project...
 * Helper functions to reference high level AST concepts will be added & documented




# TODO

See [TODO.md](TODO.md)