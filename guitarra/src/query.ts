import { ASTQQuery, TraceListener } from 'astq'
import { getTypeScriptAstq } from './adapter'
import { ASTNode } from './astNode'
import { parse } from './parse';

interface QueryOptions<T extends ASTNode = ASTNode> {
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
  node?: ASTQQuery<T>
  ast: ASTNode
}

export function query(q: string, codeOrNode: string | ASTNode, options: QueryOptions = { params: {} }): QueryResult {
  const ast = typeof codeOrNode === 'string' ? parse(codeOrNode) : codeOrNode
  try {
    const astq = getTypeScriptAstq()
    const trace = options.trace || false
    const query = astq.compile(q, trace) as ASTQQuery<ASTNode>
    const result = astq.execute(ast, query, options.params || {}, trace)
    return {
      result,
      ast,
      node: query
    }
  }
  catch (error) {
    return {
      error, ast
    }
  }
}

