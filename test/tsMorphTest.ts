import test from 'ava'
import { tsMorph } from 'ts-simple-ast-extra'
import { queryAst, queryOne } from '../src'
import { getTsMorphFile } from "../src/file"
import { queryAstSimpleTest } from './testUtil'

test('multiple queries in same changing node ', t => {
  const file = getTsMorphFile(`
  function f(a: number){return a+1}
  const y = f(2)
  function k(){}
  `)

  // in the middle, suppose that someone makes a new query
  queryAstSimpleTest(t, queryAst(`//* [@name=='g' && type()!='Identifier']`, 'const g = 1'), { result: { kind: ['VariableDeclaration'] } })
  queryAstSimpleTest(t, queryAst(`//* [@name=='g'&&type()!='Identifier']`, file), { result: { kind: [] } })
  queryAstSimpleTest(t, queryAst(`//VariableDeclaration [@name=='y'&&type()!='Identifier']`, file), { result: { text: ['y = f(2)'] } })
  const r = queryAst(`//FunctionDeclaration [@name=='f'&&type()!='Identifier']`, file)
  queryAstSimpleTest(t, r, { result: { kind: ['FunctionDeclaration'] } })

  const f = r.result![0]

  // in the middle, suppose that someone makes a new query
  queryAstSimpleTest(t, queryAst(`//* [@name=='g'&&type()!='Identifier']`, 'const g = 1'), { result: { kind: ['VariableDeclaration'] } })

  if (tsMorph.TypeGuards.isRenameableNode(f)) {
    f.rename('g')
  }
  t.truthy(file.getFunction('g'))
  t.falsy(file.getFunction('f'))

  // in the middle, suppose that someone makes a new query
  queryAstSimpleTest(t, queryAst(`//* [@name=='g'&&type()!='Identifier']`, 'const g = 1'), { result: { kind: ['VariableDeclaration'] } })

  queryAstSimpleTest(t, queryAst(`//* [@name=='f'&&type()!='Identifier']`, file), { result: { kind: [] } })
  queryAstSimpleTest(t, queryAst(`//FunctionDeclaration [@name=='g'&&type()!='Identifier']`, file), { result: { kind: ['FunctionDeclaration'] } })
  queryAstSimpleTest(t, queryAst(`//VariableDeclaration [@name=='y'&&type()!='Identifier']`, file), { result: { text: ['y = g(2)'] } })

})

test('should parse jsx', t => {
  const node = queryOne('// JsxText', `export const a = <p>hello world</p>`)
  t.is(node && node.getText(), 'hello world')
})
