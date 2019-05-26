**TypeScript AST Query Selector library**

Based on the powerful [astq](https://github.com/rse/astq) AST Query engine and syntax language.

## Playground

Try out this <a href="https://cancerberosgx.github.io/demos/cannabis/typescript-ast-query-editor/">interactive TypeScript AST Query editor</a> with examples to understand what this is all about. 

## Usage

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

## custom functions 
 
 * `isFunctionLike()`, example: `//* [ isFunctionLike() ]`


## Query Syntax

 * is based on https://github.com/rse/astq
 * This is a very WIP project...
 * helper functions to reference high level AST concepts will be added & documented
