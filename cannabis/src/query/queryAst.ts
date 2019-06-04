import { ASTQQuery } from 'astq'
import { ts, tsMorph } from 'ts-simple-ast-extra'
import { getTypeScriptAstq } from '../adapter/adapter'
import { now } from '../adapter/util'
import { ASTNode } from "../node/astNode"
import { Config, getConfig, setConfig } from './config'
import { getFile } from './file'

export type Node = tsMorph.Node
export const TypeGuards = tsMorph.TypeGuards

export interface QueryResult<T extends ASTNode = ASTNode> {
  result?: T[]
  error?: Error
  query?: ASTQQuery<T>
  ast: ASTNode,
  timings: { parseAst: number, compileQuery: number, executeQuery: number }
}

/**
 * It will create and execute a new query defined by [[q]] on nodes defined by [[codeOrNode]] as follows. If
 * it's a string, then a new source file will be created with that content. If it's a ts.Node, then that node
 * will be used (internally creating a ts-morph node). If it's a ASTNode, it could be a Directory, a file or a
 * node and that will be used to issue the query.
 */
export function queryAst<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode, options?: Partial<Config>): QueryResult<T> {
  const timings = {
    parseAst: -1, compileQuery: -1, executeQuery: -1
  }
  const parseAstT0 = now()
  const node = getFile(codeOrNode)
  timings.parseAst = now() - parseAstT0
  let executeQueryT0 = -1
  // TODO: query cache so we dont compile each time or astq does already have it ?
  try {
    const compileQueryT0 = now()
    if (options) {
      setConfig(options)
    }
    const astq = getTypeScriptAstq()
    const trace = getConfig('trace')
    const query = astq.compile(q, trace) as ASTQQuery<T>
    timings.compileQuery = now() - compileQueryT0
    executeQueryT0 = now()
    const result = astq.execute(node, query, getConfig('params'), trace) as T[]
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
 * Async version of [[queryAst]]. 
 */
export function queryAstAsync<T extends ASTNode = Node>(q: string, codeOrNode: string | ts.Node | ASTNode, options?: Partial<Config>): Promise<QueryResult<T>> {
  return new Promise(resolve => {
    resolve(queryAst(q, codeOrNode, options))
  })
}


