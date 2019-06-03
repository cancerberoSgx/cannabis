import test from 'ava'
import { queryAst } from '../'

test('findReferences', t => {
  const context = { logs: [] }
  let result = queryAst(`// Identifier [..//* && debug(count(findReferences()), kindName(), @name) && count(findReferences())==2]`, `
var a = 1; 
function f(b: number){
  return a + b
}
export const r = 1 + 2 + 3 + a
`, { context })
  t.falsy(result.error)
  t.is(result.result && result.result.length, 3)
  t.deepEqual(context.logs, [
    '2, "Identifier", "a"',
    '0, "Identifier", "f"',
    '1, "Identifier", "b"',
    '2, "Identifier", "a"',
    '1, "Identifier", "b"',
    '0, "Identifier", "r"',
    '2, "Identifier", "a"',
  ])
})
