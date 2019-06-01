import { tryTo, objectKeys } from 'misc-utils-of-mine-generic'
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

  } catch (error) {
    console.error('ERROR on getAttribute for attr==', attr, error)
  }
  return null
  //body,  symbol,
}

export type AttributeNames = 'text' | 'name' | 'type' | 'modifiers' | 'expression' | 'literalText'|'start'|'end'|'width'|'body'

const attributeNamesMap : {[a in AttributeNames]:1} = {
  'text': 1, 'name': 1, 'type': 1, 'modifiers': 1, 'expression': 1, 'literalText': 1,'start': 1, 'end': 1, 'width': 1, 'body'
  : 1
}
export const attributeNames = objectKeys(attributeNamesMap)