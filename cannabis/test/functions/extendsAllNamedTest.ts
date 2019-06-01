import test from 'ava'
import { getASTNodeName, queryAst } from '../../src'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('extendsAllNamed', t => {
  const f = getFile(code2)
  let result = queryAst(`//* [ extendsAllNamed('A,B') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', 'D'])

  result = queryAst(`//* [ extendsAllNamed('A,B,C') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['D'])
})
