import test from 'ava'
import { queryAst } from '.'
import { getASTNodeKindName, getASTNodeName, getASTNodeText } from '../src/astNode'
import { code3 } from './assets/code'

test('functions that contains variables, classes or parameters', t => {
  const f = queryAst(`// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`, code3)
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getASTNodeKindName), ['Constructor', 'MethodDeclaration', 'FunctionDeclaration', 'MethodDeclaration'])
})

test('members with given modifiers that belong to a class with given members', t => {
  const q = `
// *[ 
  .//* [ 
    @modifiers=~'private' && 
    @modifiers=~'static' || 
    @type=='number[]' 
  ] && 
  ../ClassDeclaration [
    @name=='C'
  ]
]
`
  const f = queryAst(q, code3)
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getASTNodeName), ['instanceAttr', 'inferred', 'sttMethod', 'inferredSimple',])
})

test.skip('debug types', t => {
  const q = `
// * [  debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)==true ]
  `
  const f = queryAst(q, `var a = [1]`)
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getASTNodeName), [])
})

test('comments without TODO or HEADS UP words', t => {
  const q = `
// *  [(type()=='SingleLineCommentTrivia' || type()=='MultiLineCommentTrivia') &&  lc(@text)!~'todo' && lc(@text)!~'heads up']
  `
  const f = queryAst(q, `
var a = 1
// TODO: fff
function f(){
  // cccmmm
  var b
  /* sad */
  // TODO: foo
  var c
}
/* TODO: */
/* bar */
var g
// heads up!: jaskkajs
// foooo
  `, { getChildrenMode: true })
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getASTNodeText), ['// cccmmm', '/* sad */', '/* bar */', '// foooo',])
})
