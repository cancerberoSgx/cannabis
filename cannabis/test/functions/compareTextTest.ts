import test from 'ava'
import { queryAll } from '../../src'

test('compareText', t => {
  
  const code = `var a = 'hello'; var b = 'world'; var c = 'hello world'; `
  t.is(queryAll(`//StringLiteral [compareText(@literalText, 'hello',  'multiplicity:anyOf')]`, code).length, 2)
  t.is(queryAll(`//StringLiteral [compareText(@literalText,'hello', 'multiplicity:allOf')]`, code).length, 2)

  t.is(queryAll(`//StringLiteral [compareText(@literalText, 'hello,xxxxx')]`, code).length, 2)
  t.is(queryAll(`//StringLiteral [compareText( 'hello,xxxxx', @literalText,  'multiplicity:allOf')]`, code).length, 0)

  t.is(queryAll(`//StringLiteral [compareText( @literalText, 'hello','verb:equals')]`, code).length, 1)
  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello', 'verb:equals')]`, code).length, 0)
})

