import test from 'ava'
import { queryAst } from '../src'
import { getTsMorphFile } from "../src/file"
// type FunctionDeclaration = tsMorph.FunctionDeclaration

// test('one kind descendant ava macro', queryAstSimpleTest,   queryAst(`// Identifier`, 'class C {}') , {result: {text: ['C']}, error: undefined});


test('multiple queries in same changing node', t => {
  const file = getTsMorphFile(`export function f(a: number[]){return 1+1}`)
  let result = queryAst(`//ClassDeclaration`, file)
  t.falsy(result.error)
  t.deepEqual(result.result, [])
  // const f = queryAst<tsMorph.FunctionDeclaration>(`//* [@name=='f']`, file).result
  // result = queryAst(`//ClassDeclaration [ implementsNamed('I') ]`, file);
  // t.falsy(result.error);
  // t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['A', 'B', 'C', 'D']);
})
