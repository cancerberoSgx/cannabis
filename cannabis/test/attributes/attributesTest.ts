import test from 'ava'
import { Project } from 'ts-morph'
import { queryAst, queryOne, setProject } from '../../src'
import { getASTNodeIndexPath, getASTNodeKindPath } from "../../src/path"
import { queryAstSimpleTest } from '../testUtil'

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

test('@indexPath', t => {
  const p = new Project()
  const f = p.createSourceFile('banana.ts', `import 'ss'; interface{i:number,m(m:{f:Array<Foo<XXX>>}):void}`)
  setProject(p)
  const e = queryOne(`//Identifier [@indexPath=='banana/2/0/1/0/2/2/0/1/1/1/0']`, f)
  t.deepEqual(getASTNodeIndexPath(e!), 'banana/2/0/1/0/2/2/0/1/1/1/0')
})

test('@kindPath', t => {
  const p = new Project()
  const f = p.createSourceFile('banana.ts', `import 'ss'; interface{i:number,m(m:{f:Array<Foo<XXX>>}):void}`)
  setProject(p)
  const path = 'banana/Block/LabeledStatement/ExpressionStatement/BinaryExpression/CallExpression/ObjectLiteralExpression/PropertyAssignment/CallExpression/TypeReference/TypeReference/Identifier'
  const e = queryOne(`//Identifier [@kindPath=='${path}']`, f)
  t.deepEqual(getASTNodeKindPath(e!), path)
})


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
