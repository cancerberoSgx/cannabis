import test from 'ava'
import { queryAst } from '../../src'
import { queryAstSimpleTest } from '../testUtil'

test('@start', queryAstSimpleTest, queryAst(`// VariableDeclaration [@start<10]`, 'var a = 1; if(true){var b=1}'),
  { result: { text: ['a = 1'] } })

  test('@end', queryAstSimpleTest, queryAst(`// VariableDeclaration [@end>20]`, 'var a = 1; if(true) {var b = 123451}'),
  { result: { text: ['b = 123451'] } })

  test('@width', queryAstSimpleTest, queryAst(`// VariableDeclaration [@width>6]`, 'var a = 1; if(true) {var b = 123451}'),
  { result: { text: ['b = 123451'] } })

  test('@body', queryAstSimpleTest, queryAst(`//IfStatement  [text(@body)=~'12345']`, 'var a = 1; if(true) {var b = 123451} if(false){b = 4}{ return 1}'),
  { result: { text: ['if(true) {var b = 123451}'] } })


  test('@leadingComments', queryAstSimpleTest, queryAst(`//*  [* &&  compareText('asd,sd', 'foo2,bar', 'multiplicity: allOf')]`, `
  // foo
  /* bar */
  var a = 1;
  /* foo */ 
  if(true) {var b = 123451} 
  /** bar */
  if(false){b = 4}{ return 1}`),
  { result: { text: ['a = 1'] } })
  

// ## @body
// ## @leadingComments
// ## @trailingComments