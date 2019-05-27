import { ExecutionContext } from 'ava'
import { getGeneralNodeKindName, isDirectory, tsMorph, GeneralNode } from 'ts-simple-ast-extra'
import { ASTNode, getGeneralNodeText, getGeneralNodeName } from '../src/astNode'
import { QueryResult } from '../src/queryAst'
import { shorter, setObjectProperty, getObjectProperty } from 'misc-utils-of-mine-generic';

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
      // expectSameLength(t, expected.result.kind, input.result!.map(c => getGeneralNodeKindName(c)))
      t.deepEqual(expected.result.kind, input.result!.map(getGeneralNodeKindName))
    }
    if (expected.result.text) {
      // expectSameLength(t, expected.result.text, input.result!.map(getGeneralNodeText))
      expected.result.text.forEach((te, i) => expectToInclude(t, getGeneralNodeText(input.result![i]), te))
    }
  }
  else {
    t.truthy(!input.result || !input.result.length)
  }
}


export function printNode(n: ASTNode, name=false, text=false){
   return `${getGeneralNodeKindName(n)} ${name? getGeneralNodeName(n):''}${text? `("`+shorter(getGeneralNodeText(n))+`")`:''}`
}

export function setNodeProperty(n:GeneralNode, path: string | (string | number)[], value: any){
  if(!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
setObjectProperty((n as any).cannabis_meta, path, value)
}
export function getNodeProperty<T = any>(n:GeneralNode, path: string | (string | number)[]): T|undefined{
  if(!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
return getObjectProperty<T>((n as any).cannabis_meta, path)
}
export function isString(a: any): a is string {
  return typeof a ==='string'
}