import test from 'ava'
import { queryAst } from '../src'
import { getASTNodeName, getGeneralNodeKindName } from '../src/astNode'
import { code3 } from './assets/code'

test('functions that contains variables, classes or parameters', t => {
  const f = queryAst(`// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`, code3)
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getGeneralNodeKindName), ['Constructor', 'MethodDeclaration', 'FunctionDeclaration', 'MethodDeclaration'])
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

