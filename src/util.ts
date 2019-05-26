import { GeneralNode, isDirectory, isNode } from 'ts-simple-ast-extra'

let _unique: number = 0
export function unique(prefix: string = '_'): string {
  return prefix + _unique++
}

export function isGeneralNode(f: any): f is GeneralNode {
  return f && (isNode(f) || isDirectory(f))
}

export function getGeneralNodeKindName(n: GeneralNode) {
  return !n ? undefined : isNode(n) ? n.getKindName() : 'Directory'
}
