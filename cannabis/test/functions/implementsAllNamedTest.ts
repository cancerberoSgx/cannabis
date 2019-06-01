import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst, getASTNodeName } from '../../src'
import { getFile } from "../../src/file"
import { code2 } from '../assets/code'

test('implementsAllNamed positive 1', t => {
  const f = getFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsAllNamed('I,J') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), [ 'A', 'B', 'C', 'D'])  
})

test('implementsAllNamed positive 2', t => {
  const f = getFile(code2)
  let result = queryAst(`//ClassDeclaration [ implementsAllNamed('I1,I2,I3') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), [ 'C', 'D'])  
})
