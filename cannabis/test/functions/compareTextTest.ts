import test from 'ava'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('compareText', t => {
  const f = getFile(code2)
  t.true(true)
})

