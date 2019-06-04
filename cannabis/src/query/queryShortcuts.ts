import { ts } from 'ts-simple-ast-extra'
import { ASTNode } from "../node/astNode"
import { Node, queryAst } from './queryAst'
let queryShortcuts
/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently,
 * returning an empty array.
 */
export function queryAll<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode): T[] {
  const r = queryAst<T>(q, codeOrNode)
  return r.result || []
}
/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently,
 * returning an empty array.
 */
export function queryAllOrThrow<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode): T[] {
  const r = queryAst<T>(q, codeOrNode)
  if (r.error) {
    throw r.error
  }
  else if (!r.result || !r.result.length) {
    throw new Error('Expected to select at least one element with query ' + q + ' but none matched. ')
  }
  else {
    return r.result
  }
}
/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently,
 * returning an empty array.
 */
export function queryOne<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode): T | undefined {
  const r = queryAst<T>(q, codeOrNode)
  return r.result && r.result.length && r.result[0] || undefined
}
/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently,
 * returning an empty array.
 */
export function queryOneOrThrow<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode): T {
  const r = queryAst<T>(q, codeOrNode)
  if (r.error) {
    throw r.error
  }
  else if (!r.result || !r.result.length) {
    throw new Error('Expected to select at least one element with query ' + q + ' but none matched. ')
  }
  else {
    return r.result[0]
  }
}
