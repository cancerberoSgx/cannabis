import test from 'ava'
import { getASTNodeName, queryAst } from '..'
import { getFile } from "../../src/query/file"
import { code2 } from '../assets/code'

test('implementsAnyNamed 1', t => {
  let result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I3') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', "D"])
})

test('implementsAnyNamed 2', t => {
  let result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D'])
})

test('implementsAnyNamed 3', t => {
  let result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I,J') ]`, getFile(code2))
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D'])
})

test('implementsAllNamed positive 1', t => {
  const f = getFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsAllNamed('I,J') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D'])
})

test('implementsAllNamed positive 2', t => {
  const f = getFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsAllNamed('I1,I2,I3') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', 'D'])
})
