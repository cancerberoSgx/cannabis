import ASTQ from 'astq'
import { ASTNode, isASTNode } from "./astNode"
import { objectKeys } from 'misc-utils-of-mine-generic';

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
        return node && node.childNodes || []
      },
      getNodeType(node: ASTNode) {
        return node && node.type || null
      },
      getNodeAttrNames(node: ASTNode) {
        return node && objectKeys(node.attributes||{})||[]
      },
      getNodeAttrValue(node: ASTNode, attr: string) {
        return node&&(  (node.attributes||{} )as any)[attr as any] || null
      }
    })
  }
  return astq
}
