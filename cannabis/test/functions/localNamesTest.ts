import test from 'ava'
import { notSameNotFalsy, notFalsy } from 'misc-utils-of-mine-generic'
import { getASTNodeName, queryAst } from '..'
import { getASTNodeNamePath, getASTNodeText, getASTNodeKindPath } from '../../src'
import { getFile, setProject } from '../../src/file'
import { code1, code3 } from '../assets/code'
import { queryAstSimpleTest, expectNoErrors } from '../testUtil'
import { Project, Diagnostic, DiagnosticMessageChain } from 'ts-morph';
import { getLocals } from 'ts-simple-ast-extra';


const p = new Project({compilerOptions: {rootDir: '.'}})
setProject(p)
const code =  `
var a = 1; 
export interface I {
  m(i:any):any
}
function f(b: string){
  return ()=>{return a+b}
}
function g(i: I){
  var x = 1
  var j=9
  throw 1
}  
export const c: I = {
  m(i:any):any{
    var y = 2
    var j = 9
    return a+1
  }
}
function f2(){
  return 1
}
const u: I = {  
  m(i:any):any{
    return a+1
  }
}
`
const f = p.createSourceFile('name.ts',code)
queryAst('// *', f)

test('localNames()', t => {
  expectNoErrors(t, p)
    const r = queryAst(`//* [ isFunctionLike() && !compareText('i', localNames())]`, f, { logs: console.log.bind(console) })
    t.falsy(r.error)
    t.deepEqual(r.result!.map(getASTNodeNamePath), [
      'name/f',
      'name/f/Block/ReturnStatement/ArrowFunction',
      'name/f2'
    ])
  // const fff = f.getDescendants().map(d=>getLocals(d) && getLocals(d).length  ? [d, ...getLocals(d)]: undefined).filter(d=>d && d.length)
  // const I = f.getInterface('I')!
  // console.log(getLocals(I), fff);
  // t.true(getLocals(f).length==0)
}) 
  
test('localNames(list) and compareText()', t => {
  const r = queryAst(`//VariableDeclaration [ compareText(  localNames(ancestors())  , 'j')  ]`, f, { logs: console.log.bind(console) })
  t.falsy(r.error&& r.error.stack)
    t.deepEqual(r.result!.map(getASTNodeNamePath), [
      'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/x', 
      'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/j', 
      'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/y', 
      'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/j'
      
    ])
})


test('localNames(list) and includes()', t => {
  const r = queryAst(`//VariableDeclaration [ includes(  flat(localNames(ancestors()) ) , 'j')  ]`, f, { logs: console.log.bind(console) })
  t.falsy(r.error&& r.error.stack)
    t.deepEqual(r.result!.map(getASTNodeNamePath), [
      'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/x', 
      'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/j', 
      'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/y', 
      'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/j'      
    ])
})

//   t.falsy(r.error)
//   t.deepEqual(r.result!.map(getASTNodeNamePath), ['cannabis/cannabis_test_file_5/ExpressionStatement/f/a'])
// })
// !includes(localNames(), 'b')
// test('localNames', t => {
//   const r = queryAst(`//* [ debug(localNames())]`, , { logs: console.log.bind(console) })
//   t.falsy(r.error)
//   t.deepEqual(r.result!.map(getASTNodeNamePath), [  ])
// })

// test.skip('localNames multiple args', t => {
//   const r = queryAst(`//Identifier [ localNames(flat(ancestors())) ]`, `
// var a = 1; 
// function f(b: string){
//   var a = b+'sdf'
//   return ()=>{return a+b}
// }
// function g(a:number){
//   return a*a
// }
// `, { logs: console.log.bind(console) })
// })


// test('typeText', t => {
//   const r = queryAst(`// * [ (./VariableDeclaration || ./Parameter) && !includes(typeText(), 'b')]`, `
// var a = 1; 
// function f(b: string){
//   var a = b+'sdf'
//   return ()=>{return a+b}
// }
// function g(a:number){
//   return a*a
// }
// const fff = [g(1)]
// `, { logs: console.log.bind(console) })
//   t.falsy(r.error)
//   t.deepEqual(r.result!.map(getASTNodeNamePath), [  'cannabis/cannabis_test_file_6/VariableStatement/VariableDeclarationList/a', 'cannabis/cannabis_test_file_6/f/Block/VariableStatement/VariableDeclarationList/a', 'cannabis/cannabis_test_file_6/g/a',])
