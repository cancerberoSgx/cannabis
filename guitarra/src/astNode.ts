import { JSONValue } from 'misc-utils-of-mine-generic';

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export interface ASTNode     {
  type:string
  childNodes: ASTNode[]
  attributes: {name?: string, index?: number, length?: number, value?: any, type: T, level?: number, [a:string]:any}
  parent?: ASTNode
}

export function isASTNode(a: any): a is ASTNode {
  return a && a.type
}
type T = 'object'|'array'|'number'|'boolean'|'string'|'undefined'