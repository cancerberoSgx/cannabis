import test, { ExecutionContext } from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { queryAst } from '../'
import { getASTNodeName } from '../../src'
import { withConfig } from '../../src/config'
import { code3 } from '../assets/code'


const tt = (t: ExecutionContext) => {
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
    '2, "Identifier", "a"', '0, "Identifier", "f"', '1, "Identifier", "b"', '2, "Identifier", "a"', '1, "Identifier", "b"', '0, "Identifier", "r"', '2, "Identifier", "a"',
  ])
}
test('findReferences', tt)
test('findReferences without cache', t => withConfig({ cacheReferences: false }, () => tt(t)))
test('findReferences with cache', t => withConfig({ cacheReferences: true }, () => tt(t)))

test('findReferences, ancestors, includes', t => {
  let result = queryAst(`
// * [
  !includes(
    map(ancestors(), 'getKindName')
    , 'ImportDeclaration'
  )
  &&
  includes(
    map(
      flat(
        ancestors(
          findReferences()
        )
      )
    , 'getKindName')
  , 'ImportDeclaration')
  
]
  `, code3)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName).filter(notSameNotFalsy), ['bar', 'Foo', 'puff', 'zok'])
})


