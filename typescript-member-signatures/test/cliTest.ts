import test from 'ava'
import { execSync } from 'child_process'
import { existsSync } from 'fs'


test.before('should build', async t => {
  t.notThrows(() => execSync('npm run build', { stdio: 'pipe' }))
})

test('--project optional and --listInterfaces', async t => {
  t.true(existsSync('tsconfig.json'))
  const out = execSync('node bin/typescript-member-signatures.js --listInterfaces', { stdio: 'pipe' })
  t.true(!['"Options" (src/types/Options)'].find(ex => !out.includes(ex)))
})

test('--', async t => {
  const p = 'test/assets/project1/tsconfig.json'
  t.true(existsSync(p))
  const out = execSync(`node bin/typescript-member-signatures.js --project ${p} --typescriptOutput alfred --target "**/test1/G"`, { stdio: 'pipe' })
  t.true(!['export const alfred: Alfred', 'prop: Date[]'].find(ex => !out.includes(ex)))
})

