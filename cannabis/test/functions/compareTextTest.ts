import test from 'ava'
import { queryAll } from '../'

const code = `var a = 'hello'; var b = 'world'; var c = 'hello world'; `

test('compareText 1', t => {
  t.is(queryAll(`//StringLiteral [compareText(@literalText, 'hello',  'multiplicity:anyOf')]`, code).length, 2)
})

test('compareText 2', t => {
  t.is(queryAll(`//StringLiteral [compareText(@literalText,'hello', 'multiplicity:allOf')]`, code).length, 2)
})

test('compareText 3', t => {
  t.is(queryAll(`//StringLiteral [compareText(@literalText, 'hello,xxxxx')]`, code).length, 2)
})

test('compareText 4', t => {
  t.is(queryAll(`//StringLiteral [compareText( 'hello,xxxxx', @literalText,  'multiplicity:allOf')]`, code).length, 0)
})

test('compareText 5', t => {
  t.is(queryAll(`//StringLiteral [compareText( @literalText, 'hello','verb:equals')]`, code).length, 1)
})

test('compareText 6', t => {
  t.is(queryAll(`//StringLiteral [compareText(@text, 'hello', 'verb:equals')]`, code).length, 0)
})
