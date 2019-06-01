import test from 'ava'
import { queryAst } from '../src'
import { queryAstSimpleTest } from './testUtil'

test('one kind descendant ava macro', queryAstSimpleTest, queryAst(`// Identifier`, 'class C {}'), { result: { text: ['C'] }, error: undefined })

test('one kind descendant', t => {
  const result = queryAst(`// Identifier`, 'class C {}')
  t.is(result.error, undefined)
  t.is(result.result!.length, 1)
  t.is(result.result![0].getText(), 'C')
})

test('should return error on invalid queries', t => {
  const result = queryAst('/ fo invalid / Identifier', 'class C {}')
  t.truthy(result.error)
  t.true((result.error + '').includes('query parsing failed'))
})

test('should return error on invalid queries ava macro', queryAstSimpleTest, queryAst('/ fo invalid / Identifier', 'class C {}'), { error: 'query parsing failed' })

