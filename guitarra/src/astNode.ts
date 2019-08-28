import { JSONValue } from 'misc-utils-of-mine-generic';

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export interface ASTNode     {
  type:'object'|'array'|'number'|'boolean'|'string'|'undefined'
  childNodes: ASTNode[]
  attributes: {name?: string, index?: number, length?: number, value?: JSONValue}
  parent?: ASTNode
}

export function isASTNode(a: any): a is ASTNode {
  return a && a.type
}
