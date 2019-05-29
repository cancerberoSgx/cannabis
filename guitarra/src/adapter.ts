import ASTQ from 'astq'
import { ASTNode, astNodeAttributeNames, isASTNode } from "./astNode"

let astq: ASTQ<ASTNode> | undefined

export function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<ASTNode>()
    astq.adapter({
      taste(node: any) {
        return isASTNode(node)
      },
      getParentNode(node: ASTNode) {
        return node.parent || null
      },
      getChildNodes(node: ASTNode) {
        return node && node.nodes || []
      },
      getNodeType(node: ASTNode) {
        return node && node.type || ''
      },
      getNodeAttrNames(node: ASTNode) {
        return astNodeAttributeNames
      },
      getNodeAttrValue(node: ASTNode, attr: string) {
        return node && (node as any)[attr] || null
      }
    })
  }
  return astq
}
