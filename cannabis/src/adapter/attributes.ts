import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getASTNodeText } from '../node/astNode'
import { getASTNodeTypeAsString } from "../node/astNodeType"
import { getASTNodeIndexPath, getASTNodeKindPath, getASTNodeNamePath } from "../node/path"

export function getAttribute(node: ASTNode, attr: string) {
  try {
    if (attr === 'text') {
      return getASTNodeText(node)
    }
    else if (attr === 'name') {
      return (getASTNodeName(node) + '') || ''
    }
    else if (attr === 'type') {
      return getASTNodeTypeAsString(node)
    }
    else if (attr === 'indexPath') {
      return isNode(node) && getASTNodeIndexPath(node) || ''
    }
    else if (attr === 'kindPath') {
      return isNode(node) && getASTNodeKindPath(node) || ''
    }
    else if (attr === 'namePath') {
      return isNode(node) && getASTNodeNamePath(node) || ''
    }
    else if (attr === 'modifiers') {
      return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n => n.getText()).join(' ') || ''
    }
    else if (attr === 'expression') {
      return isNode(node) && node.compilerNode && (node.compilerNode as any).expression || null
    }
    else if (attr === 'literalText') {
      return isNode(node) && tsMorph.TypeGuards.isLiteralLikeNode(node) && node.getLiteralText() || null
    }
    else if (attr === 'start') {
      return isNode(node) && node.getStart() || null
    }
    else if (attr === 'end') {
      return isNode(node) && node.getEnd() || null
    }
    else if (attr === 'width') {
      return isNode(node) && node.getWidth() || null
    }
    else if (attr === 'body') {
      return isNode(node) && tsMorph.TypeGuards.isBodyableNode(node) && node.getBody() || null
    }
    else if (attr === 'leadingComments') {
      return isNode(node) && node.getLeadingCommentRanges().map(c => c.getText()) || []
    }
    else if (attr === 'trailingComments') {
      return isNode(node) && node.getTrailingCommentRanges().map(c => c.getText()) || []
    }
  } catch (error) {
    console.error('ERROR on getAttribute for attr==', attr, error)
  }
  return null
  //   symbol,
}
