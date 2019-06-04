import test from 'ava'
import { queryAst } from '../'
import { withConfig } from '../../src/config'
import { queryAstSimpleTest } from '../testUtil'

test('@type explicit', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='Date[]']`, `export const a: Date[] = []`), { result: { text: ['a: Date[] = []'] } })

test('@type infer from usage', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='number']`, `
function f(){return 1}
export const b = 'foo'
export const a = f() + 2
`), { result: { text: ['a = f() + 2'] } })

test('@type infer from usage negative', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='boolean']`, `
export const b = 'foo'
`), { result: { text: [] } })

test('@type infer from usage several parameters', queryAstSimpleTest, queryAst(`// Parameter [ @type=='boolean' || @type=='number']`, `
function f(a=1, b='s', c=false, d={})
`), { result: { text: ['a=1', 'c=false'] } })

test('@type with cache', queryAstSimpleTest, withConfig({ cacheTypeText: true }, () => queryAst(`// Parameter [ @type=='boolean' || @type=='number']`, `
function f(a=1, b='s', c=false, d={})
`)), { result: { text: ['a=1', 'c=false'] } })

test('@type without cache', queryAstSimpleTest, withConfig({ cacheTypeText: false }, () => queryAst(`// Parameter [ @type=='boolean' || @type=='number']`, `
function f(a=1, b='s', c=false, d={})
`)), { result: { text: ['a=1', 'c=false'] } })
