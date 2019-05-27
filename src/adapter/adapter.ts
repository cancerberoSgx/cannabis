import { ASTNode, getGeneralNodeChildren, getGeneralNodeKindName, getGeneralNodeParent, isGeneralNode } from "../astNode"
import ASTQClass from './astq'
import { getAttribute } from './attribtues'
import { installFunctions } from './functions'

const ASTQ = require('astq') as typeof ASTQClass

let astq: ASTQClass<ASTNode> | undefined

export function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<ASTNode>()
    astq.adapter({
      taste(node: any) {
        return isGeneralNode(node) && !!getGeneralNodeKindName(node)
      },
      getParentNode(node: ASTNode) {
        return node && getGeneralNodeParent(node)
      },
      getChildNodes(node: ASTNode) {
        return node && getGeneralNodeChildren(node) || []
      },
      getNodeType(node: ASTNode) {
        return node && getGeneralNodeKindName(node) || 'undefined'
      },
      getNodeAttrNames(node: ASTNode) {
        return ['text', 'name', 'type', 'modifiers']
      },
      getNodeAttrValue(node: ASTNode, attr: string) {
        return getAttribute(node, attr)
      }
    })
    installFunctions(astq)
  }
  return astq
}
