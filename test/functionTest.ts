import test from 'ava'
import { queryAst } from '../src'
import { queryAstSimpleTest } from './testUtil'


test('incorrect functions should throw error', queryAstSimpleTest, queryAst(`// VariableDeclaration [ nonExistent() ]`, `const a = 1`), { error: 'invalid function "nonExistent"' })


test('sourceFile()', queryAstSimpleTest, queryAst(`// VariableDeclaration [ below(sourceFile()) ]`, `const a = 1`), { result: { text: ['a = 1'] } })
