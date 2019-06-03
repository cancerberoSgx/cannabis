import test from 'ava'
import { getASTNodeName, queryAst } from '../../src'
import { getFile } from '../../src/file'
import { code2 } from '../assets/code'

test('matchEvery', t => {
  let result = queryAst(`//* [ matchEvery(array(@name, @text), '**I**,**2**') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['I2', 'I2', 'I2', 'I2', 'I2', 'I2'])
})

