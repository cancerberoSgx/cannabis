import { ASTQQuery, TraceListener } from 'astq'
import { ts, tsMorph } from 'ts-simple-ast-extra'
import { getTypeScriptAstq } from './adapter/adapter'
import { ASTNode, isASTNode } from "./astNode"
import { getFile } from './file'
import { setConfig } from './config';

export type Node = tsMorph.Node
export const TypeGuards = tsMorph.TypeGuards

export interface QueryResult<T extends ASTNode = ASTNode> {
  result?: T[]
  error?: Error
  query?: ASTQQuery<T>
  ast: ASTNode,
  timings: { parseAst: number, compileQuery: number, executeQuery: number }

}

export interface ExecutionContext {
  logs: string[]

  // _getChildren?: boolean
  // /**
  //  * Flag to stop searching if options.one was set and a result was already found.
  //  * @internal
  //  */
  // _one?: boolean
  // _query?: ASTQQuery<any>
}
interface QueryAstOptions<T extends ASTNode = ASTNode> {
  /**
   * If true the query execution will be traced, step by step, probably affecting performance but useful to debug and understand the internal process. Default value is false.
   */
  trace?: boolean | TraceListener<T>

  /**
   * Query execution parameters to be consumable using `{param1}` syntax (similar to attributes). Default value is `{}.`
   */
  params?: { [name: string]: any }

  context?: ExecutionContext
  // /**
  //  * Flag to stop searching if options.one was set and a result was already found.
  //  * @internal
  //  */
  // one?: boolean

  /**
   * TypeScript Children node mode. Default: 'forEachChild' that return only nodes with high level semantics.
   * 'getChildren' on the other hand, will return all kind of nodes, including tokens, jsdocs comments,
   * keywords, etc. In gneral is better to build queries with 'forEachChild' mode, but in some cases, is
   * necessary to use 'getChildren'. Take into account that queries in one mode could not work in the other
   * mode. 
   */
  getChildrenMode?: boolean

  includeJSDocTagNodes?: boolean
}

/**
 * It will create and execute a new query defined by [[q]] on nodes defined by [[codeOrNode]] as follows. If
 * it's a string, then a new source file will be created with that content. If it's a ts.Node, then that node
 * will be used (internally creating a ts-morph node). If it's a ASTNode, it could be a Directory, a file or a
 * node and that will be used to issue the query.
 */
export function queryAst<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode, options: QueryAstOptions = { params: {} }): QueryResult<T> {
  const timings = {
    parseAst: -1, compileQuery: -1, executeQuery: -1
  }
  const parseAstT0 = now()
  let node: Node | tsMorph.Directory
  if (typeof codeOrNode === 'string') {
    node = getFile(codeOrNode)!
  }
  else if (isASTNode(codeOrNode)) {
    node = codeOrNode
  }
  else {
    node = getFile(codeOrNode.getText())
  }
  timings.parseAst = now() - parseAstT0
  let executeQueryT0 = -1
  // TODO: query cache so we dont compile each time or astq does already have it ?
  try {
    const compileQueryT0 = now()
    const context: ExecutionContext = {...options.context || { logs: [] }}
    typeof options.getChildrenMode !== 'undefined' && setConfig('getChildren', !!options.getChildrenMode)
    typeof options.includeJSDocTagNodes !== 'undefined'  && setConfig('includeJSDocTagNodes', !!options.includeJSDocTagNodes)
    const astq = getTypeScriptAstq(context)
    const trace = options.trace || false
    const query = astq.compile(q, trace) as ASTQQuery<T>
    timings.compileQuery = now() - compileQueryT0
    executeQueryT0 = now()
    const result = astq.execute(node, query, options.params || {}, trace) as T[]
    timings.executeQuery = now() - executeQueryT0
    return {
      result,
      query,
      ast: node as any,
      timings
    }
  } catch (error) {
    timings.executeQuery = now() - executeQueryT0
    return {
      error,
      ast: node as any,
      timings
    }
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

function now() {
  return Date.now()
}
