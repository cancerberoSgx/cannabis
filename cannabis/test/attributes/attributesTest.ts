import test from 'ava'
import { queryAst } from '../../src'
import { queryAstSimpleTest } from '../testUtil'


test('incorrect attribute should not throw error and much 0', queryAstSimpleTest, queryAst(`// * [ @nonExistent == 1]`, 'class C {}'), { result: { kind: [] } })

test('attrs()', queryAstSimpleTest, queryAst(`// Identifier [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: ['C'] } })

test('attrs() on empty node', queryAstSimpleTest, queryAst(`// NonExistent [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: [], kind: [] } })

test('@start', queryAstSimpleTest, queryAst(`// VariableDeclaration [@start<10]`, 'var a = 1; if(true){var b=1}'),
  { result: { text: ['a = 1'] } })

test('@end', queryAstSimpleTest, queryAst(`// VariableDeclaration [@end>20]`, 'var a = 1; if(true) {var b = 123451}'),
  { result: { text: ['b = 123451'] } })

test('@width', queryAstSimpleTest, queryAst(`// VariableDeclaration [@width>6]`, 'var a = 1; if(true) {var b = 123451}'),
  { result: { text: ['b = 123451'] } })

test('@body', queryAstSimpleTest, queryAst(`//IfStatement  [text(@body)=~'12345']`, 'var a = 1; if(true) {var b = 123451} if(false){b = 4}{ return 1}'), { result: { text: ['if(true) {var b = 123451}'] } })

const code = `
// foo
/* seba */
var a = 1;
/* foo */ 
if(true) {var b = 123451} 
/* bar */
jj()
/*domingo*/
if(false){b = 4}{ return 1}`

test('@leadingComments and join()', queryAstSimpleTest, queryAst(`//* [join(@leadingComments)=~'seba']`, code),
  { result: { text: ['a = 1', `var a = 1`] } })

test('@leadingComments and includes()', queryAstSimpleTest, queryAst(`//* [includes(@leadingComments, '/* seba */')]`, code),
  { result: { text: ['a = 1', `var a = 1`] } })

test.skip('@trailingComments not working', queryAstSimpleTest, queryAst(
  // `//* [count(@trailingComments)>0]`
  // `//* [includes(@trailingComments, '/*domingo*/')]`
  `//* [compareText(@trailingComments, '/*domingo*/,/* bar */')]`
  , code),
  {
    result: { kind: ['jj()'] }
  })


