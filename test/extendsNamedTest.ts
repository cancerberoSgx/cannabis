import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst } from '../src'
import { getTsMorphFile } from "../src/file"
import { code2 } from './assets'

test('extendsNamed', t => {
  const f = getTsMorphFile(code2)
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
