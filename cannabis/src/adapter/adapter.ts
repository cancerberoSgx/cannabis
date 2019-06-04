import ASTQ from 'astq'
import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeChildren, getASTNodeKindName, getASTNodeParent, isASTNode } from "../astNode"
import { getConfig } from '../config'
import { getAttribute } from './attributes'
import { AttributeNames, attributeNames } from "./attributeTypes"
import { installFunctions } from './functions'
let astq: ASTQ<ASTNode> | undefined

export function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<ASTNode>()
    astq.adapter({
      taste(node: any) {
        return isASTNode(node) && !!getASTNodeKindName(node)
      },
      getParentNode(node: ASTNode) {
        if (!node) {
          return null as any
        }
        const parent = getASTNodeParent(node)
        if (!parent) {
          return null
        }
        if (node === parent) {
          return null
        }
        return parent || null
      },
      getChildNodes(node: ASTNode) {
        if (node) {
          var r = getASTNodeChildren(node, getConfig('getChildren')) || []
          if (getConfig('includeJSDocTagNodes') && isNode(node) && tsMorph.TypeGuards.isJSDocableNode(node)) {
            r.push(...node.getJsDocs())
          }
          return r
        }
        else {
          return []
        }
      },
      getNodeType(node: ASTNode) {
        return node && getASTNodeKindName(node) || 'undefined'
      },
      getNodeAttrNames(node: ASTNode): AttributeNames[] {
        return attributeNames
      },
      getNodeAttrValue(node: ASTNode, attr: string) {
        return getAttribute(node, attr) || null
      }
    })
    installFunctions(astq)
  }
  return astq
}
