import test from 'ava'
import micromatch from 'micromatch'
import { getASTNodeDescendants } from '../src/astNode'
import { getFile } from '../src/file'
import { getASTNodeKindPath, getASTNodeNamePath } from "../src/path"

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
const desc = getASTNodeDescendants(f)
test('initial research test kind', t => {
  const allPaths = desc.map(getASTNodeKindPath)
  t.deepEqual(micromatch(allPaths, ['**/CallExpression/*/Identifier']), [
    'cannabis_test_file_0/FunctionDeclaration/Block/ForInStatement/ExpressionStatement/CallExpression/PropertyAccessExpression/Identifier',
    'cannabis_test_file_0/ClassDeclaration/MethodDeclaration/Block/ForInStatement/ExpressionStatement/CallExpression/PropertyAccessExpression/Identifier'
  ])
})

test('initial research test name', t => {
  const allPaths = desc.map(getASTNodeNamePath)
  t.deepEqual(micromatch(allPaths, ['**/*method*1*/**/*Statement*/**/push']), [
    'cannabis_test_file_0/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/push',
    'cannabis_test_file_0/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push',
  ])
})






// match Blocks containing ForInStatement direct children
// const query = '//Block [ /ForInStatement ]'
// const { result, error } = queryAst(query, code)
// debugger
// if (error) {
//   // there was a query syntax error 
// } else {
//   result!.map(node => console.log(node.getStart(), node.getEnd()))
// }
