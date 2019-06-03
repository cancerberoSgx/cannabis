import { objectKeys, tryTo } from 'misc-utils-of-mine-generic'
import { ObjectStringKeyUnion } from 'misc-utils-of-mine-typescript'
import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getASTNodeText } from '../astNode'
import { getASTNodeIndexPath, getASTNodeKindPath } from "../path"

export function getAttribute(node: ASTNode, attr: string) {
  try {
    if (attr === 'text') {
      return getASTNodeText(node)
    }
    else if (attr === 'name') {
      return (getASTNodeName(node) + '') || ''
    }
    else if (attr === 'type') {
      return isNode(node) && tryTo(() => node.getType().getText()) || ''
    }
    else if (attr === 'indexPath') {
      return isNode(node) && getASTNodeIndexPath(node) || ''
    }
    else if (attr === 'kindPath') {
      return isNode(node) && getASTNodeKindPath(node) || ''
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

export type AttributeNames = ObjectStringKeyUnion<AttributeValues>
//>'text' | 'name' | 'type' | 'modifiers' | 'expression' | 'literalText' | 'start' | 'end' | 'width' | 'body' | 'leadingComments' | 'trailingComments' | 'kindPath' | 'indexPath'| 'namePath'
// enum a {
// ddd='sdsd'
// }
// type tt = {[ass in keyof a]:any}
// type tt = {[a:  AttributeNames]: string|string[]|ASTNode|number}

interface AttributeValues {
  text: string
  name: string
  type: string
  modifiers: string
  expression: ASTNode | null
  literalText: string
  start: number
  end: number
  width: number
  body: ASTNode | null
  leadingComments: string[]
  trailingComments: string[]
  kindPath: string
  indexPath: string
  namePath: string
}

type Attrs =
  { [a in AttributeNames]: 1 }

const attributeNamesMap: { [a in AttributeNames]: 1 } = {
  'text': 1, 'name': 1, 'type': 1, 'modifiers': 1, 'expression': 1, 'literalText': 1, 'start': 1, 'end': 1, 'width': 1, 'body'
    : 1, 'leadingComments': 1, 'trailingComments': 1, 'kindPath': 1, 'indexPath': 1, 'namePath': 1
}
export const attributeNames = objectKeys(attributeNamesMap)




// interface I extends Required<{[a in AttributeNames]: 1}> {}
class SupportedAttributesImpl implements AttributeValues {
  text: string = ''
  name: string = ''
  type: string = ''
  modifiers: string = ''
  expression: ASTNode | null = null
  literalText: string = ''
  start: number = 0
  end: number = 0
  width: number = 0
  body: ASTNode | null = null
  leadingComments: string[] = []
  trailingComments: string[] = []
  kindPath: string = ''
  indexPath: string = ''
  namePath: string = ''
}

