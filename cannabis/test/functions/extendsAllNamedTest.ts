import test from 'ava'
import { getASTNodeName, queryAst } from '../'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

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
