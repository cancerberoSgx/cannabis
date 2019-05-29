import { ASTQQuery, TraceListener } from 'astq'
import { getTypeScriptAstq } from './adapter'
import { ASTNode } from './astNode'
import { parseCss } from './parseCss'
export function queryAst(q: string, codeOrNode: string | ASTNode, options: QueryAstOptions = { params: {} }): QueryResult {
  const node = typeof codeOrNode === 'string' ? parseCss(codeOrNode) : codeOrNode
  try {
    const astq = getTypeScriptAstq()
    const trace = options.trace || false
    const query = astq.compile(q, trace) as ASTQQuery<ASTNode>
    const result = astq.execute(node, query, options.params || {}, trace)
    return {
      result,
      query
    }
  }
  catch (error) {
    return {
      error
    }
  }
}
interface QueryAstOptions<T extends ASTNode = ASTNode> {
  /**
   * If true the query execution will be traced, step by step, probably affecting performance but useful to debug and understand the internal process. Default value is false.
   */
  trace?: boolean | TraceListener<T>;
  /**
   * Query execution parameters to be consumable using `{param1}` syntax (similar to attributes). Default value is `{}.`
   */
  params?: {
    [name: string]: any;
  };
}
export interface QueryResult<T extends ASTNode = ASTNode> {
  result?: T[];
  error?: Error;
  query?: ASTQQuery<T>;
}
