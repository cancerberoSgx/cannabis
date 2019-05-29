import { ExecutionContext } from 'ava'
import { getObjectProperty, setObjectProperty, shorter } from 'misc-utils-of-mine-generic'
import { GeneralNode, getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { ASTNode, getGeneralNodeName, getGeneralNodeText } from '../src/astNode'
import { QueryResult } from '../src/queryAst'

export function expectSameLength<T>(t: ExecutionContext, a: T[], b: T[] | number) {
  t.is(a.length, typeof b === 'number' ? b : b.length, `Expected "${a}" to have same length as "${b}"`)
}

export function expectToInclude(t: ExecutionContext, input: string, expected: string) {
  t.truthy(input.includes(expected), `Expected ${input} to include ${expected}`)
}

export function queryAstSimpleTest<T extends ASTNode = ASTNode>(t: ExecutionContext, input: QueryResult<T>, expected: {
  error?: string;
  result?: {
    kind?: string[]
    text?: string[]
  };
}) {
  (expected.error || input.error) ? expectToInclude(t, input.error + '' || '', expected.error + '' || '') : t.falsy(input.error)
  if (expected.result) {
    t.truthy(input.result)
    if (expected.result.kind) {
      t.deepEqual(expected.result.kind, input.result!.map(getGeneralNodeKindName))
      expectSameLength(t, expected.result.kind, input.result!.map(c => getGeneralNodeKindName(c)))
    }
    if (expected.result.text) {
      expected.result.text.forEach((te, i) => expectToInclude(t, getGeneralNodeText(input.result![i]), te))
      expectSameLength(t, expected.result.text, input.result!.map(getGeneralNodeText))
    }
  }
  else {
    t.truthy(!input.result || !input.result.length)
  }
}


export function printNode(n: ASTNode, name = false, text = false) {
  return `${getGeneralNodeKindName(n)} ${name ? getGeneralNodeName(n) : ''}${text ? `("` + shorter(getGeneralNodeText(n)) + `")` : ''}`
}

export function setNodeProperty(n: GeneralNode, path: string | (string | number)[], value: any) {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  setObjectProperty((n as any).cannabis_meta, path, value)
}
export function getNodeProperty<T = any>(n: GeneralNode, path: string | (string | number)[]): T | undefined {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  return getObjectProperty<T>((n as any).cannabis_meta, path)
}
export function isString(a: any): a is string {
  return typeof a === 'string'
}
