import { GeneralNode, getGeneralNodeChildren,  getGeneralNodeParent, ts, tsMorph,  } from 'ts-simple-ast-extra'
import ASTQClass from './astq'
import { getAttribute } from './attribtues'
import { getFile } from './file'
import { installFunctions } from './functions'
import { isGeneralNode, getGeneralNodeKindName } from './util';
type Node = tsMorph.Node

const ASTQ = require('astq') as typeof ASTQClass


let astq: ASTQClass<GeneralNode> | undefined

function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<GeneralNode>()
    astq.adapter({
      taste(node: any) {
        // return tsMorph.TypeGuards.isNode(node)
        return isGeneralNode(node) && !!getGeneralNodeKindName(node)
      },
      getParentNode(node: GeneralNode) {
        return node && getGeneralNodeParent(node)
      },
      getChildNodes(node: GeneralNode) {
        return node && getGeneralNodeChildren(node) || []
      },
      getNodeType(node: GeneralNode) {
        return node && getGeneralNodeKindName(node) || 'undefined'
      },
      getNodeAttrNames(node: GeneralNode) {
        return ['text', 'name', 'type', 'modifiers']
      },
      getNodeAttrValue(node: GeneralNode, attr: string) {
        return getAttribute(node, attr)
      }
    })
    installFunctions(astq)
  }
  return astq
}

export interface QueryResult<T extends GeneralNode = tsMorph.Node> {
  result?: T[]
  error?: Error
}

/**
 * It will create and execute a new query defined by [[q]] on nodes defined by [[codeOrNode]] as follows. If it's a string, then a new source file
 * will be created with that content. If it's a ts.Node, then that node will be used (internally creating a ts-morph node). 
 * If it's a GeneralNode, it could be a Directory, a file or a node and that will be used to issue the query.
 */
export function queryAst<T extends GeneralNode = tsMorph.Node>(q: string, codeOrNode: string | ts.Node | GeneralNode): QueryResult<T> {
  let node: Node|tsMorph.Directory
  if (typeof codeOrNode === 'string') {
    node = getFile(codeOrNode)!
  }
  else if (isGeneralNode(codeOrNode)) {
    node = codeOrNode 
  }
  else {
    // is a ts.Node
    node = getFile(codeOrNode.getText())
  }
  try {
    return { result: getTypeScriptAstq().query(node, q) as T[] }
  } catch (error) {
    return { error }
  }
}

/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently, returning an empty array.
 */
export function queryAll<T extends GeneralNode = Node>(q: string, codeOrNode: string | ts.Node | T): T[] {
  const r = queryAst<T>(q, codeOrNode)
  return r.result || []
}

/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently, returning an empty array.
 */
export function queryAllOrThrow<T extends GeneralNode = Node>(q: string, codeOrNode: string | ts.Node | T): T[] {
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
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently, returning an empty array.
 */
export function queryOne<T extends GeneralNode = Node>(q: string, codeOrNode: string | ts.Node | T): T | undefined {
  const r = queryAst<T>(q, codeOrNode)
  return r.result && r.result.length && r.result[0] || undefined
}

/**
 * Will query given code or node and if there is any error, like query syntax error, it will fail silently, returning an empty array.
 */
export function queryOneOrThrow<T extends GeneralNode = Node>(q: string, codeOrNode: string | ts.Node | T): T {
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





// isTypeParameteredNode, isAbstractableNode, isAmbientableNode, isArgumentedNode, isAsyncableNode, isAwaitableNode, isBodiedNode, isBodyableNode, DecoratableNode, ScopedNode, staticableNode, PropertyNamedNode, OverloadableNode, GeneratorableNode, ModifierableNode, JSDocableNode, ReadonlyableNode, ExclamationTokenableNode, QuestionTokenableNode, InitializerExpressionableNode, PropertyNamedNode

/*

researchrge

possible attributes:

 // TODO: body, expression, symbol, type, pos, start, fullStart, fuillText, width, fullWIdth, leadingtriviaWidth, trailingTriviaWidth, trailingTriviaEnd, getCombinedModifierFlags, getLastToken, childIndex, getIndentationLevel, getChildIndentationLevel, getIndentationText, getChildIndentationText, getStartLinePos, getStartLineNumber, getEndLineNumber, isFirstNodeOnLine, getLeadingCommentRanges, getTrailingCommentRanges, getScope, getReturnType, isStatic, getTypeArguments, getTypeParameters, getProperties, getStaticProperties, getInstanceProperties, getGetAccessors, getSetAccessors, getMethods, getStaticMethods, getInstanceMethods, getStaticMembers, getInstanceMembers, getMembers, getBaseTypes,. getBaseClass, getDerivedClasses, children, childCount

*/
