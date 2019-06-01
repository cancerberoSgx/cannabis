import test from 'ava'
import { queryAll } from '../../src';

test('compareText', t => {
  const code = `var a = 'hello'; var b = 'world'; var c = 'hello world'; `
  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello')]`, code).length, 2)
  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello', 'multiplicity:allOf')]`, code).length, 2)

  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello,xxxxx')]`, code).length, 2)
  t.is(queryAll(`//StringLiteral [compareText( @text,'hello,xxxxx', 'multiplicity:allOf')]`, code).length, 0)

  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello', 'verb:equals')]`, code).length, 0)
  t.is(queryAll(`//StringLiteral [compareText(@literalText, 'hello', 'verb:equals')]`, code).length, 1)

  t.true(true)
})

