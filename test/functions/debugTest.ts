import test from 'ava'
import { queryAst } from '../../src'

test('debug', t => {
  // const f = getTsMorphFile(code2)
  const context = { logs: [] }
  let result = queryAst(`//NumericLiteral [debug()]`, 'export const r = 1 + 2 + 3', { context })
  t.falsy(result.error)
  t.truthy(result.result && result.result.length === 3)
  t.truthy(context.logs.length)
})
