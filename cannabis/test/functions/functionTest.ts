import test from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { getASTNodeName, queryAst } from '../'
import { getFile } from '../../src/file'
import { code1, code3 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'

test('incorrect functions should throw error', queryAstSimpleTest, queryAst(`// VariableDeclaration [ nonExistent() ]`, `const a = 1`), { error: 'invalid function "nonExistent"' })

test('sourceFile()', queryAstSimpleTest, queryAst(`// VariableDeclaration [ below(sourceFile()) ]`, `const a = 1`), { result: { text: ['a = 1'] } })

test('isFunctionLike', t => {
  const query = `//* [ isFunctionLike() ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['FunctionDeclaration', 'FunctionDeclaration', 'Constructor', 'MethodDeclaration', 'MethodDeclaration', 'ArrowFunction'])
})

test('map and children', t => {
  const context = { logs: [] }
  let result = queryAst(`//VariableDeclaration  [ debug( map(children(), 'getKindName') )  ]`, getFile(code3), { context })
  t.falsy(result.error)
  t.deepEqual(context.logs, [
    '"Identifier", "ArrayLiteralExpression"',
    '"Identifier"'
  ])
  t.deepEqual(result.result!.map(getASTNodeName).filter(notSameNotFalsy), ['a', 'i'])
})
