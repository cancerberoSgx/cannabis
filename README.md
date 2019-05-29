[![Build Status](https://travis-ci.org/cancerberoSgx/cannabis.svg?branch=master)](https://travis-ci.org/cancerberoSgx/cannabis) 
[![Coverage Status](https://coveralls.io/repos/github/cancerberoSgx/cannabis/badge.svg?branch=master)](https://coveralls.io/github/cancerberoSgx/cannabis?branch=master)

**TypeScript AST Query Selector library**

Based on the powerful [astq](https://github.com/rse/astq) AST Query engine and syntax language.

## Contents

<!-- toc -->

- [Playground](#playground)
- [Usage](#usage)
- [Custom Attributes](#custom-attributes)
- [Custom Functions](#custom-functions)
- [Query Syntax](#query-syntax)

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

# Custom Attributes

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


# Custom Functions 
 
The following are custom function that can be used in the queries directly, added to standard query functions of astq library, related to TypeScript AST.

## isFunctionLike()

 * `isFunctionLike()` - `boolean`
 
 Returns true if current node kind is function like, this is a callable node like FunctionDeceleration, MethodDeclaration, ArrowFunction, etc.

 Examples: 
 
 `//* [ isFunctionLike() && type() != ConstructorDeclaration]`

## extendsNamed(name)

`extendsNamed(name)` - `boolean`
 
Returns true if current node (class declaration or interface declaration) extends recursively a type with given name. 

Take into account that it will search across  HeritageClauses of all Take into account that it will search across all `extends` HeritageClauses, recursively.

Also notice that it applies  both to classes and interfaces and remember that an interface can extend both interfaces and classes. 

Examples: 

`//ClassDeclaration [extendsNamed('BaseClass')]`

`//InterfaceDeclaration [extendsNamed('Touchable')]`
 
## implementsNamed(name)

`implementsNamed(name)` - `boolean`
 
Returns true if current node (class declaration) implements recursively an interface with given name. 
 
Take into account that it will search across all implemented HeritageClauses of all interfaces implemented by super classes and also interfaces extended by super interfaces, recursively. 
 
Examples: 
 
`//ClassDeclaration [implementsNamed('Touchable')]`

 ## sourceFile()

`sourceFile()` - `SourceFile` (ts-morph Node)
 
Returns current sourceFile Node


# Query Syntax

 * [ASTQ Query syntax](astq-query-syntax.md)
 * Based on https://github.com/rse/astq
 * This is a very WIP project...
 * Helper functions to reference high level AST concepts will be added & documented


# TODO

 * `implementedByNamed()` and `extendedByNamed()`: the opposite to extendsNamed and implementsNamed : 

 * `returnType(type: string)`: will compare current (function-like) node return type with given type , as string, inferring it if not explicitly declared. `//FunctionDeclaration [ hasReturnType('number[]') ]`. Example: `//MethodDeclaration [ hasReturnType('boolean') ]` will match `method1(n:number){return n>.5  }`.

 *`hasParameter(type: string, index?: number)`: If no index is given, returns true if any parameter of current (function-like) node as given type ( compared as string). If index is given the parameter's type in that index must match the string . Example: `//MethodDeclaration [ hasParameter('number[]', 1) ]` will match `function f(a: string, b: number[])`.

 * `hasParameterList()` : `//MethodDeclaration [ hasParameterList('number[],boolean,Foo<Apple>[]') ]`. The type is compared as string.

 * `hasTypeParameter(type: string, index?: number)` : `//InterfaceDeclaration [ hasTypeParameter('T[]', 1) ]` . The type is compared as string.