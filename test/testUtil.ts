import { ExecutionContext } from 'ava'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { QueryResult } from '../src/queryAst'

export function expectSameLength<T>(t: ExecutionContext, a: T[], b: T[]) {
  t.is(a.length, b.length, `Expected ${a} to have same length as ${b}`)
}
export function expectToInclude(t: ExecutionContext, input: string, expected: string) {
  t.truthy(input.includes(expected), `Expected ${input} to include ${expected}`)
}
export function queryAstSimpleTest(t: ExecutionContext, input: QueryResult, expected: {
  error?: string;
  result?: {
    kind?: string[];
    text?: string[];
  };
}) {
  expected.error ? t.true((input.error + '' || '').includes(expected.error)) : t.falsy(input.error)
  if (expected.result) {
    t.truthy(input.result)
    if (expected.result.kind) {
      t.is(expected.result.kind.length, input.result!.length)
      t.deepEqual(expected.result.kind, input.result!.map(getGeneralNodeKindName))
    }
    if (expected.result.text) {
      t.is(expected.result.text.length, input.result!.length)
      // expected.result.text.forEach((te, i)=>t.truthy(input.result![i].getText().includes(te), `Expected ${input.result![i].getText()} to includes ${te}`))
      expected.result.text.forEach((te, i) => expectToInclude(t, input.result![i].getText(), te))
    }
  }
  else {
    t.truthy(!input.result || !input.result.length)
  }
}
