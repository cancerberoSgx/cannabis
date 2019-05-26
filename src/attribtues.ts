import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName } from './astNode'

export function getAttribute(node: ASTNode, attr: string) {
  try {
    if (!node) {
      return undefined
    }
    else if (attr === 'text') {
      return isNode(node) ? node.getText() : ''
    }
    else if (attr === 'name') {
      return getASTNodeName(node)
    }
    else if (attr === 'type') {
      return isNode(node) && node.getType().getText() || ''
    }
    else if (attr === 'modifiers') {
      return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n => n.getText()).join(' ') || ''
    }
  } catch (error) {
    console.error('ERROR on getAttribute for attr==', attr, error)
  }
  return undefined
  //body, expression, symbol, type, pos, start, getModifiers, 
}

