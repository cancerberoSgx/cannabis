import { ExecutionContext } from 'ava'
import { indent, shorter } from 'misc-utils-of-mine-generic'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { attributeNames, getAttribute } from '../src/adapter/attributes'
import { ASTNode, getASTNodeKindName, getGeneralNodeName, getASTNodeText, visit } from '../src/astNode'
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
      expected.result.text.forEach((te, i) => expectToInclude(t, getASTNodeText(input.result![i]), te))
      expectSameLength(t, expected.result.text, input.result!.map(getASTNodeText))
    }
  }
  else {
    t.truthy(!input.result || !input.result.length)
  }
}

export function printNode(n: ASTNode, name = false, text = false) {
  return `${getGeneralNodeKindName(n)} ${name ? getGeneralNodeName(n) : ''}${text ? `("` + shorter(getASTNodeText(n)) + `")` : ''}`
}

export function printTypeAndAttrs(n: ASTNode) {
  const a = ['']
  visit(n, (c, p, l) => {
    a.push(`${indent(l)}<${getASTNodeKindName(c)} ${attributeNames.map(a => `${a}="${getAttribute(c, a)}"`).join(' ')}>`)
    return false
  })
  return a.reverse().join('\n')
}

export function isString(a: any): a is string {
  return typeof a === 'string'
}
