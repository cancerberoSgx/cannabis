import ASTQ from 'astq'
import { ASTNode, getASTNodeChildren, getASTNodeKindName, getASTNodeParent, isASTNode } from "../astNode"
import { ExecutionContext } from '../queryAst'
import { AttributeNames, attributeNames, getAttribute } from './attributes'
import { installFunctions } from './functions'
import { getConfig } from '../config';
import { GeneralNode, isDirectory, isNode, isSourceFile, ts, tsMorph } from 'ts-simple-ast-extra'
let astq: ASTQ<ASTNode> | undefined

export function getTypeScriptAstq(context: ExecutionContext) {
// function getChildrenMode(){
//   console.log(context._getChildren);
  
//   return context._getChildren
// }
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
        if(node){
          var r = getASTNodeChildren(node, getConfig('getChildren')) || []
          if(getConfig('includeJSDocTagNodes') && isNode(node) && tsMorph.TypeGuards.isJSDocableNode(node)) {
            r.push(...node.getJsDocs())
          }
          return r
        }
        else{
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
    installFunctions(astq, context)
  }
  return astq
}