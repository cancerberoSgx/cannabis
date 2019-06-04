import test from 'ava'
import { getASTNodeName, queryAst } from '.'
import { queryAstAsync } from '../src/query'
import { code1 } from './assets/code'

test('query', t => {
  const result = queryAst(`// Identifier`, 'class C {}')
  t.is(result.error, undefined)
  t.is(result.result!.length, 1)
  t.is(result.result![0].getText(), 'C')
})

test('should return error on invalid queries', t => {
  const result = queryAst('/ fo invalid / Identifier', 'class C {}')
  t.truthy(result.error)
  t.true((result.error + '').includes('query parsing failed'))
})

test('statement inside several kind', t => {
  const query = `//* [ //ForInStatement &&  (type()=="MethodDeclaration" || type()=="FunctionDeclaration" || type()=="Constructor" || type()=="ArrowFunction") ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.is(result.result!.length, 3)
  t.true(result.result![0].getText().includes('function f'))
  t.true(result.result![1].getText().includes('private method1()'))
  t.true(result.result![2].getText().includes('f=>{'))
})

test('statement inside several kind 2', t => {
  const query = `//Block [ //ForInStatement ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.is(result.result!.length, 3)
  t.true(result.result![0].getParent()!.getText().includes('function f'))
  t.true(result.result![1].getParent()!.getText().includes('private method1()'))
  t.true(result.result![2].getParent()!.getText().includes('f=>{'))
})

test('includeJSDocTagNodes without', t => {
  const result = queryAst(`//JSDocParameterTag`, `
/** @param a {boolean[]|Foo} some text */
  function f(a){}
  `, { includeJSDocTagNodes: false, getChildren: false })
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), [])
})

test('includeJSDocTagNodes with', t => {
  const result = queryAst(`//JSDocParameterTag`, `
/** @param a {boolean[]|Foo} some text */
  function f(a){}
  `, { includeJSDocTagNodes: true, getChildren: false })
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['a'])
})


test('queryAstAsync', async t => {
  const result = await queryAstAsync(`//VariableDeclaration`, `
var a = 1  `)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['a'])
})

