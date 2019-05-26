import { ExecutionContext } from 'ava'
import { GeneralNode, getGeneralNodeKindName, isDirectory, tsMorph } from 'ts-simple-ast-extra'
import { QueryResult } from '../src/queryAst'

export function expectSameLength<T>(t: ExecutionContext, a: T[], b: T[]) {
  t.is(a.length, b.length, `Expected "${a}" to have same length as "${b}"`)
}

export function expectToInclude(t: ExecutionContext, input: string, expected: string) {
  t.truthy(input.includes(expected), `Expected ${input} to include ${expected}`)
}

export function queryAstSimpleTest<T extends GeneralNode = tsMorph.Node>(t: ExecutionContext, input: QueryResult<T>, expected: {
  error?: string;
  result?: {
    kind?: string[];
    text?: string[];
  };
}) {
  (expected.error || input.error) ? expectToInclude(t, input.error + '' || '', expected.error + '' || '') : t.falsy(input.error)
  if (expected.result) {
    t.truthy(input.result)
    if (expected.result.kind) {
      expectSameLength(t, expected.result.kind, input.result!.map(c => getGeneralNodeKindName(c)))
      t.deepEqual(expected.result.kind, input.result!.map(getGeneralNodeKindName))
    }
    if (expected.result.text) {
      expectSameLength(t, expected.result.text, input.result!.map(c => getGeneralNodeText(c)))
      expected.result.text.forEach((te, i) => expectToInclude(t, getGeneralNodeText(input.result![i]), te))
    }
  }
  else {
    t.truthy(!input.result || !input.result.length)
  }
  // return input
}
function getGeneralNodeText(n: GeneralNode) {
  return isDirectory(n) ? n.getPath() : n.getText()
}
