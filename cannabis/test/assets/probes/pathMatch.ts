import { queryAst } from '../../../src'
import micromatch from 'micromatch'
import { getFile } from '../../../src/file';
import { getASTNodeDescendants, getASTNodeKindPath } from '../../../src/astNode';

console.log(micromatch(['foo', 'bar', 'baz', 'qux'], ['f*', 'b*', '*u*']))


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
const f = getFile(code)
const allPaths = getASTNodeDescendants(f).map(getASTNodeKindPath)
// console.log();
console.log(micromatch(allPaths, ['**/CallExpression/*/Identifier']));

// match Blocks containing ForInStatement direct children
// const query = '//Block [ /ForInStatement ]'
// const { result, error } = queryAst(query, code)
// debugger
// if (error) {
//   // there was a query syntax error 
// } else {
//   result!.map(node => console.log(node.getStart(), node.getEnd()))
// }
