import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst } from '../src'
import { getTsMorphFile } from "../src/file"
import { code2 } from './assets'

test('implementsNamed', t => {
  const f = getTsMorphFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsNamed('I3') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['C', "D"])
  result = queryAst(`//ClassDeclaration [ implementsNamed('I') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['A', 'B', 'C', 'D'])
})
