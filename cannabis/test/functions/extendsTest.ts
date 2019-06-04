import test from 'ava'
import { getASTNodeName, queryAst } from '..'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('extendsAnyNamed1', t => {
  const f = getFile(code2)
  let result = queryAst(`//* [ extendsAnyNamed('C') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['D'])
})

test('extendsAnyNamed 2', t => {
  var result = queryAst(`//* [ extendsAnyNamed(\'A\') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['B', 'C', 'D'])
})

test('extendsAnyNamed 3', t => {
  var result = queryAst(`//* [ extendsAnyNamed(\'I2\') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['I3'])
})

test('extendsAnyNamed 4', t => {
  var result = queryAst(`//* [ extendsAnyNamed('I') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['I1', 'I2', 'I3'])
})

test(`extendsAnyNamed('A,B')`, t => {
  const f = getFile(code2)
  const result = queryAst(`//* [ extendsAnyNamed('A,B') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['B', 'C', 'D'])
})

test(`extendsAnyNamed('B,C,D)`, t => {
  const f = getFile(code2)
  const result = queryAst(`//* [ extendsAnyNamed('B,C,D') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', 'D'])
})

// test(`extendsAnyNamed('A,B', true)`, t => {
//   const f = getFile(code2)
//   const result = queryAst(`//* [ extendsAnyNamed('A,B', true) ]`, f)
//   t.falsy(result.error)
//   t.deepEqual(result.result!.map(getASTNodeName), ['C', 'D'])
// })

// test(`extendsAnyNamed()`, t => {
//   const f = getFile(code2)
//   const result = queryAst(`//* [ compareText(extendsAnyNamed(), 'A,I')]`, f)
//   t.falsy(result.error)
//   t.deepEqual(result.result!.map(getASTNodeName), ['B', 'C', 'D', 'I1', 'I2', 'I3'])
// })

test('extendsAllNamed 1', t => {
  let result = queryAst(`//* [ extendsAllNamed('A,B') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', 'D'])
})

test('extendsAllNamed 2', t => {
  let result = queryAst(`//* [ extendsAllNamed('A,B,C') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['D'])
})

test('extendsAnyNamed and implementsAnyNamed', t => {
  let result = queryAst(`
// Identifier [ ../*
  [ extendsAnyNamed('A') || implementsAnyNamed('I') ||  extendsAnyNamed('I') ]
]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D', 'I1', 'I2', 'I3',])
})
