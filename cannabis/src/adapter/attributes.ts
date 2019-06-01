import { tryTo } from 'misc-utils-of-mine-generic'
import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getASTNodeText } from '../astNode'

export function getAttribute(node: ASTNode, attr: string) {
  try {
    if (!node) {
      return null
    }
    else if (attr === 'text') {
      return getASTNodeText(node)
    }
    else if (attr === 'name') {
      return getASTNodeName(node) || ''
    }
    else if (attr === 'type') {
      return isNode(node) && tryTo(() => node.getType().getText()) || ''
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
  } catch (error) {
    console.error('ERROR on getAttribute for attr==', attr, error)

  }
  return null
  //body,  symbol, type, pos, start 
}

export type AttributeNames = 'text' | 'name' | 'type' | 'modifiers' | 'expression' | 'literalText'
export const attributeNames: AttributeNames[] = ['text', 'name', 'type', 'modifiers', 'expression', 'literalText']
