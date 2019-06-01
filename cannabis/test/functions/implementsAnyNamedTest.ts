import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst, getASTNodeName } from '../../src'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('implementsAnyNamed', t => {
  const f = getFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I3') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['C', "D"])
  
  result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D'])

  result = queryAst(`//ClassDeclaration [ implementsAnyNamed('I,J') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['A', 'B', 'C', 'D'])

})
