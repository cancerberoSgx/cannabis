import { exec, config } from 'shelljs';

config.silent=true

describe('ts-ast', () => {
  function testFn123abc(){}
  it('--outputCount --project', () => {
    expect(parseInt(expectNotFailJsonOutput('--query "//FunctionDeclaration" --project . --outputCount'))).toBeGreaterThan(0)
    expect(parseInt(expectNotFailJsonOutput('--query "//FunctionDeclaration [@name==\'testFn123abc\']" --project . --outputCount'))).toBe(1)
  })
  it('--files, --output .js files', () => {
    const r = expectNotFailJsonOutput('--query "//FunctionDeclaration" --files "dist/**/*.js" --output name') as any[]
    expect(r.find(r=>r.name==='testFn123abc' && Object.keys(r).length===1)).toEqual({name: 'testFn123abc'})
  })
})

function expectNotFailJsonOutput(args: string) {
  const cmd = 'npx ts-node -T src/mainRun.ts ' + args
  const p = exec(cmd)
  expect(p.code).toBe(0)
  return JSON.parse(p.stdout.toString())
}