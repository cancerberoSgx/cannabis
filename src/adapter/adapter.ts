import ASTQ from 'astq'
import { ASTNode, getGeneralNodeChildren, getGeneralNodeKindName, getGeneralNodeParent, isGeneralNode } from "../astNode"
import { ExecutionContext } from '../queryAst'
import { AttributeNames, attributeNames, getAttribute } from './attributes'
import { installFunctions } from './functions'

let astq: ASTQ<ASTNode> | undefined

export function getTypeScriptAstq(context: ExecutionContext = { logs: [] }) {
  if (!astq) {
    astq = new ASTQ<ASTNode>()
    astq.adapter({
      taste(node: any) {
        return isGeneralNode(node) && !!getGeneralNodeKindName(node)
      },
      getParentNode(node: ASTNode) {
        if (!node) {
          return null as any
        }
        const parent = getGeneralNodeParent(node)
        if (!parent) {
          return null
        }
        if (node === parent) {
          return null
        }
        return parent || null
      },
      getChildNodes(node: ASTNode) {
        return node && getGeneralNodeChildren(node) || []
      },
      getNodeType(node: ASTNode) {
        return node && getGeneralNodeKindName(node) || 'undefined'
      },
      getNodeAttrNames(node: ASTNode): AttributeNames[] {
        return attributeNames
      },
      getNodeAttrValue(node: ASTNode, attr: string) {
        return getAttribute(node, attr) || null
      }
    })
    installFunctions(astq, context)
  }
  return astq
}
