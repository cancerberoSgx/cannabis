import test from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { getASTNodeName, queryAst } from '../'
import { getASTNodeKindName, getASTNodeNamePath, getASTNodeText } from '../../src'
import { getASTNodeTypeAsString, getReturnType } from '../../src/node/astNodeType'
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

test('Type and get', t => {
  const r = queryAst(`//VariableDeclaration [ @name=='b222' && debug(get(Type(), 'getText')) ]`, `
  var a222 = 's'
  function f222(k:string) {return new Array<Date>(parseInt(k))}
  var b222 = f222(a222)`
    , { logs: console.log.bind(console) })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeTypeAsString), ['Date[]'])
})

test.only('returnType and get', t => {
  const code = `
  var a2221 = 's'
  function f2221(k:string) {return new Array<boolean>(parseInt(k))}
  var b2221 = f2221(a2221)`
  // console.log(getSourceFile(getFile(code))!.getFunction('f2221')!.getReturnType().getApparentType().getText())
  const r = queryAst(`//FunctionDeclaration [  debug(get(returnType(), 'getText')) ]`, code
    , { logs: console.log.bind(console) })
  // t.deepEqual(getASTRoot().getDiagnostics(), [])s
  t.falsy(r.error)
  t.deepEqual(r.result!.map(d => getReturnType(d)!.getText() + ' - ' + getASTNodeKindName(d)), ['boolean[] - FunctionDeclaration'])
})

// var a2221 = 's'
// function f2221(k:string) {return new Array<Date>(parseInt(k))}
// var b2221 = f2221(a2221)
// type t = ReturnType<typeof f2221>
// const p = new Project()
// const f = p.createSourceFile('asd.ts', code)
