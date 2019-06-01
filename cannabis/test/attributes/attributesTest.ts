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

test('@leadingComments and join()', queryAstSimpleTest, queryAst(`//* [join(@leadingComments)=~'seba']`, `
// foo
/* seba */
var a = 1;
/* foo */ 
if(true) {var b = 123451} 
/** bar */
if(false){b = 4}{ return 1}`),
  { result: { text: ['a = 1', `var a = 1`] } })

test('@leadingComments and includes()', queryAstSimpleTest, queryAst(`//* [includes(@leadingComments, '/* seba */')]`, `
// foo
/* seba */
var a = 1;
/* foo */ 
if(true) {var b = 123451} 
/* bar */
if(false){b = 4}{ return 1}`),
  { result: { text: ['a = 1', `var a = 1`] } })

//   test('@trailingComments and includes', queryAstSimpleTest, queryAst(
//     `//* [count(@trailingComments)>0]`

//     // `//* [includes(@trailingComments, '/*domingo*/')]`
//     , `
//   // foo
//   /* seba */
//   var a = 1;
//   /* foo */ 
//   if(true) {var b = 123451} 
//   /* bar */
//   jj()
//   /*domingo*/
//   if(false){b = 4}{ return 1}`),
//   { result: { kind: ['jj()'] } 

// })

// // ## @body
// // ## @leadingComments
// // ## @trailingComments
// test('should get JsxText22', t => {
//   const f = getFile(`
// var a; 
// //1
// /*1*/
// var b
// //1
// /*2*/
//   `) as tsMorph.SourceFile
//   f.getDescendants().forEach(d=>{
//     console.log('node: ', d.getText(), 'getTrailingCommentRanges: ', d.getTrailingCommentRanges().map(r=>r.getText()),'getLeadingCommentRanges: ', d.getLeadingCommentRanges().map(r=>r.getText()),  )
//   })

//   // !.getText(), 'foo')
//   // const f2 = getFile(`const a = <p>hello world</p>`) as tsMorph.SourceFile
//   // t.is(f2.getFirstDescendantByKind(ts.SyntaxKind.JsxText)!.getText(), 'hello world')
//   t.true(true)
// })
