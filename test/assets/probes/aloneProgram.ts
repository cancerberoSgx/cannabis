import { queryAst } from '../../../src'

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
const { result, error } = queryAst(query, code)
debugger
if (error) {
  // there was a query syntax error 
} else {
  result!.map(node => console.log(node.getStart(), node.getEnd()))
}
