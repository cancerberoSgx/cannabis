import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst } from '../../src'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('extendsNamed', t => {
  const f = getFile(code2)
  let result = queryAst(`//* [ extendsNamed('C') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['D'])
  result = queryAst(`//* [ extendsNamed(\'A\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['B', 'C', 'D'])
  result = queryAst(`//* [ extendsNamed(\'I2\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['I3'])
  result = queryAst(`//* [ extendsNamed('I') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['I1', 'I2', 'I3'])
})

test(`extendsNamed('A,B')`, t => {
  const f = getFile(code2)
  const result = queryAst(`//* [ extendsNamed('A,B') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['B', 'C', 'D'])
})

test(`extendsNamed('A,B', true)`, t => {
  const f = getFile(code2)
  const result = queryAst(`//* [ extendsNamed('A,B', true) ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['C', 'D'])
})

test(`extendsNamed()`, t => {
  const f = getFile(code2)
  const result = queryAst(`//* [ compareText(extendsNamed(), 'A,I')]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['B', 'C', 'D', 'I1', 'I2', 'I3'])
})
