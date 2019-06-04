import test from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { getASTNodeName, queryAst } from '../'
import { getASTNodeNamePath, getASTNodeText } from '../../src'
import { getFile } from '../../src/query/file'
import { code1, code3 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'

test('incorrect functions should throw error', queryAstSimpleTest, queryAst(`// VariableDeclaration [ nonExistent() ]`, `const a = 1`), { error: 'invalid function "nonExistent"' })

test('sourceFile()', queryAstSimpleTest, queryAst(`// VariableDeclaration [ below(sourceFile()) ]`, `const a = 1`), { result: { text: ['a = 1'] } })

test('isFunctionLike', t => {
  const query = `//* [ isFunctionLike() ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['FunctionDeclaration', 'FunctionDeclaration', 'Constructor', 'MethodDeclaration', 'MethodDeclaration', 'ArrowFunction'])
})

test('map and children', t => {
  const context = { logs: [] }
  let result = queryAst(`//VariableDeclaration  [ debug( map(children(), 'getKindName') )  ]`, getFile(code3), context)
  t.falsy(result.error)
  t.deepEqual(context.logs, [
    '"Identifier", "ArrayLiteralExpression"',
    '"Identifier"'
  ])
  t.deepEqual(result.result!.map(getASTNodeName).filter(notSameNotFalsy), ['a', 'i'])
})

test('declarations, ancestors, flat, kindName', t => {
  const context = { logs: [] }
  let result = queryAst(`//Identifier  [ includes( kindName(flat(ancestors(declarations()))), 'ImportDeclaration') && !includes(kindName(ancestors()), 'ImportDeclaration') ]`, getFile(code3, 'code34444.ts'), context)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeNamePath).filter(notSameNotFalsy), ['cannabis/code34444/C/Constructor/id/bar/bar', 'cannabis/code34444/C/method1/Block/ReturnStatement/CallExpression/value/Foo/Foo', 'cannabis/code34444/C/secondMethod/Block/f/Block/puff/puff', 'cannabis/code34444/C/secondMethod/Block/ExpressionStatement/BinaryExpression/zok/zok',
  ])
})

test('siblings', t => {
  const r = queryAst(`//VariableStatement [includes(text(siblings()), 'var b = 2;')]`, `var a = 1; var b = 2; var c = '9'`, { logs: console.log.bind(console) })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeText), ['var a = 1;', 'var c = \'9\'',])
})

test('getImplementations', t => {
  const r = queryAst(`//CallExpression/Identifier [ kindName(parent(parent(parent(getImplementations()))))=~'VariableStatement']`, `var a = 1; function f(k:any){}; f(a)`, { logs: console.log.bind(console) })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeNamePath), ['cannabis/cannabis_test_file_5/ExpressionStatement/f/a'])
})


// const p = new Project()
// const f = p.createSourceFile('name.ts', `
//   var a = 1; 
//   export interface I {
//     m(i:any):any
//   }
//   function f(b: string){
//     return ()=>{return a+b}
//   }
//   function g(i: I){
//     var x = 1
//     var j=9
//     throw 1
//   }  
//   export const c: I = {
//     m(i:any):any{
//       var y = 2
//       var j = 9
//       return a+1
//     }
//   }
//   function f2(){
//     return 1
//   }
//   const u: I = {  
//     m(i:any):any{
//       return a+1
//     }
//   }
//   `)

// test('localNames()', t => {
//   expectNoErrors(t, p)
//     const r = queryAst(`//* [ isFunctionLike() && !compareText('i', localNames())]`, f, { logs: console.log.bind(console) })
//     t.falsy(r.error)
//     t.deepEqual(r.result!.map(getASTNodeNamePath), [
//       'cannabis/name/f',
//       'cannabis/name/f/Block/ReturnStatement/ArrowFunction',
//       'cannabis/name/f2'
//     ])
//   // const fff = f.getDescendants().map(d=>getLocals(d) && getLocals(d).length  ? [d, ...getLocals(d)]: undefined).filter(d=>d && d.length)
//   // const I = f.getInterface('I')!
//   // console.log(getLocals(I), fff);
//   // t.true(getLocals(f).length==0)
// }) 

// test('localNames(list) and compareText()', t => {
//   const r = queryAst(`//VariableDeclaration [ compareText(  localNames(ancestors())  , 'j')  ]`, f, { logs: console.log.bind(console) })
//   t.falsy(r.error&& r.error.stack)
//     t.deepEqual(r.result!.map(getASTNodeNamePath), [
//       'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/x', 
//       'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/j', 
//       'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/y', 
//       'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/j'

//     ])
// })


// test('localNames(list) and includes()', t => {
//   const r = queryAst(`//VariableDeclaration [ includes(  flat(localNames(ancestors()) ) , 'j')  ]`, f, { logs: console.log.bind(console) })
//   t.falsy(r.error&& r.error.stack)
//     t.deepEqual(r.result!.map(getASTNodeNamePath), [
//       'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/x', 
//       'cannabis/name/g/Block/VariableStatement/VariableDeclarationList/j', 
//       'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/y', 
//       'cannabis/name/VariableStatement/VariableDeclarationList/c/ObjectLiteralExpression/m/Block/VariableStatement/VariableDeclarationList/j'      
//     ])
// })

// //   t.falsy(r.error)
// //   t.deepEqual(r.result!.map(getASTNodeNamePath), ['cannabis/cannabis_test_file_5/ExpressionStatement/f/a'])
// // })
// // !includes(localNames(), 'b')
// // test('localNames', t => {
// //   const r = queryAst(`//* [ debug(localNames())]`, , { logs: console.log.bind(console) })
// //   t.falsy(r.error)
// //   t.deepEqual(r.result!.map(getASTNodeNamePath), [  ])
// // })

// // test.skip('localNames multiple args', t => {
// //   const r = queryAst(`//Identifier [ localNames(flat(ancestors())) ]`, `
// // var a = 1; 
// // function f(b: string){
// //   var a = b+'sdf'
// //   return ()=>{return a+b}
// // }
// // function g(a:number){
// //   return a*a
// // }
// // `, { logs: console.log.bind(console) })
// // })


// // test('typeText', t => {
// //   const r = queryAst(`// * [ (./VariableDeclaration || ./Parameter) && !includes(typeText(), 'b')]`, `
// // var a = 1; 
// // function f(b: string){
// //   var a = b+'sdf'
// //   return ()=>{return a+b}
// // }
// // function g(a:number){
// //   return a*a
// // }
// // const fff = [g(1)]
// // `, { logs: console.log.bind(console) })
// //   t.falsy(r.error)
// //   t.deepEqual(r.result!.map(getASTNodeNamePath), [  'cannabis/cannabis_test_file_6/VariableStatement/VariableDeclarationList/a', 'cannabis/cannabis_test_file_6/f/Block/VariableStatement/VariableDeclarationList/a', 'cannabis/cannabis_test_file_6/g/a',])
