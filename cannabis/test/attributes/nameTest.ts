import test from 'ava'
import { queryAst } from '../'
import { code1 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'

test('attribute name', t => {
  const query = `//* [ @name == "method1" && type()!='Identifier' ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['MethodDeclaration'])
})

test('@name', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @name=='a' ]`,
  `export function f(){
    var a = 1
  }
  export const a = 2
`), { result: { text: ['a = 1', 'a = 2'] } })
