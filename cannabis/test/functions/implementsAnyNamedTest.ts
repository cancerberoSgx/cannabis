import test from 'ava'
import { getASTNodeName, queryAst } from '../../src'
import { getFile } from "../../src/file"
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
