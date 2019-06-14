import test, { beforeEach } from 'ava'
import { extractMemberSignatures } from '../src'
import { Result } from '../src/types'

let r: Result[]

beforeEach(() => {
  r = extractMemberSignatures({ project: 'test/assets/project1/tsconfig.json', target: '**/test1/G', generateMarkdownDocs: true })
})

test('markdown', async t => {
  t.true(r[0].markdown!.includes('* `prop: Date[]`: Velit ipsum dolor sit deserunt laborum tempor eu amet ipsum ullamco laborum.'))
})

