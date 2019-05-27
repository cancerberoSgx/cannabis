import { ts, tsMorph } from 'ts-simple-ast-extra'
import { getTypeScriptAstq } from './adapter/adapter'
import { ASTNode, isGeneralNode } from "./astNode"
import { getFile } from './file'

type Node = tsMorph.Node

export interface QueryResult<T extends ASTNode = ASTNode> {
  result?: T[]
  error?: Error
  trace?: string
}

interface QueryAstOptions {
  trace?: boolean
}

/**
 * It will create and execute a new query defined by [[q]] on nodes defined by [[codeOrNode]] as follows. If
 * it's a string, then a new source file will be created with that content. If it's a ts.Node, then that node
 * will be used (internally creating a ts-morph node). If it's a ASTNode, it could be a Directory, a file or a
 * node and that will be used to issue the query.
 */
export function queryAst<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode, options?: QueryAstOptions): QueryResult<T> {
  let node: Node | tsMorph.Directory
  if (typeof codeOrNode === 'string') {
    node = getFile(codeOrNode)!
  }
  else if (isGeneralNode(codeOrNode)) {
    node = codeOrNode
  }
  else {
    node = getFile(codeOrNode.getText())
  }
  try {
    return { result: getTypeScriptAstq().query(node, q) as T[] }
  } catch (error) {
    return { error }
  }
}

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


