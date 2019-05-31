import test from 'ava'
import { ts } from 'ts-simple-ast-extra'
import { queryAst } from '../../src'
import { getTsMorphFile } from "../../src/file"
import { code2 } from '../assets/code'

test.skip('findReferences', t => {
  const context ={logs: []}
  let result = queryAst(`// Identifier [..// ReturnStatement ]`, `
var a = 1; 
function f(b: number){
  return a + b
}
export const r = 1 + 2 + 3
`, {context})
  t.falsy(result.error)
  t.truthy(result.result && result.result.length === 1)
  // console.log(result.ast.d);
  
  // t.truthy(context.logs.length)
})
