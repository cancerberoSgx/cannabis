import test, { beforeEach } from 'ava'
import { extractMemberSignatures } from '../src'
import { Result } from '../src/types'

let r: Result[]
beforeEach(() => {
  r = extractMemberSignatures({ project: 'test/assets/project1/tsconfig.json', target: '**/test1/G', })
})

test('interface name', async t => {
  t.deepEqual(r.length, 1)
  t.deepEqual(r[0].name, 'G')
})

test('signature', async t => {
  t.deepEqual(r[0].signature, 'interface G {\n  prop: Date[]\n  children(): I[]\n  m(a: Date): void\n}')
})

test.todo('each property signature')
test.todo('signatureOnly')
test.todo('membersStartingWithUnderscore')

