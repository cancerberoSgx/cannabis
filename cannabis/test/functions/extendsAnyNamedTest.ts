import test from 'ava'
import { getASTNodeName, queryAst } from '../../src'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('extendsAnyNamed', t => {
  const f = getFile(code2)
  let result = queryAst(`//* [ extendsAnyNamed('C') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['D'])
  result = queryAst(`//* [ extendsAnyNamed(\'A\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['B', 'C', 'D'])

  result = queryAst(`//* [ extendsAnyNamed(\'I2\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['I3'])

  result = queryAst(`//* [ extendsAnyNamed('I') ]`, f)
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
