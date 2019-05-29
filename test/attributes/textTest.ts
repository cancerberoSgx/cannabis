import test from 'ava'
import { queryAst, queryOne } from '../../src'
import { code1 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'

test('@text', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @text!~'2' ]`, `const a = 1, b = 2`), { result: { text: ['a = 1'] } })

test('@text and JsxText', t => {
  const node = queryOne(`// JsxText [ @text=~'hello world' ]`, `export const a = <p>hello world</p>`)
  t.truthy(node)
  t.is(node && node.getText(), 'hello world')
})
