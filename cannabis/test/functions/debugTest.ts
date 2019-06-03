import test from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { getASTNodeName, queryAst } from '../'
import { getFile } from '../../src/file'
import { code3 } from '../assets/code'

test('debug', t => {
  const context = { logs: [] }
  let result = queryAst(`//NumericLiteral [debug()]`, 'export const r = 1 + 2 + 3', { context })
  t.falsy(result.error)
  t.truthy(result.result && result.result.length === 3)
  t.truthy(context.logs.length)
})

test('debug context can be passed as an object', t => {
  const context = { logs: ['1'] }
  let result = queryAst(`//MethodDeclaration [ debug(  stringArray( map(children(), 'getKindName' ) )) ||children() ]`, getFile(code3), { context })
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName).filter(notSameNotFalsy), ['method1', 'secondMethod', 'sttMethod'])
})

test('debug context can be passed a function', t => {
  const reg = [] as any
  let result = queryAst(`//Identifier [ @text =~ 'oo' && debug( @name ) ]`, getFile(code3), { context: { logs: (...args) => reg.push(...args) } })
  t.falsy(result.error && result.error + ' - ' + result.error!.stack)
  t.deepEqual(reg, ['Foo', 'Foo'])
})
