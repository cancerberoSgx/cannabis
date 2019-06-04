import { objectKeys } from 'misc-utils-of-mine-generic'
import { ObjectStringKeyUnion } from 'misc-utils-of-mine-typescript'
import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getASTNodeText } from '../astNode'
import { getASTNodeTypeAsString } from "../astNodeType"
import { getASTNodeIndexPath, getASTNodeKindPath, getASTNodeNamePath } from "../path"

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

export type AttributeNames = ObjectStringKeyUnion<AttributeValues>

interface AttributeValues {
  /** 
   * Returns current node's text as in `ts.Node#getText()`. Example: `// VariableDeclaration [ @text!~'2' ]` 
   */
  text: string
  /**
   * Returns current node's name if any. If it doesn't have a name, it returns an empty string.
   * 
   * There are node kinds that have name, like InterfaceDeclaration, and others that don't, like IfStatement. Examples `// * [ @name=='f' && @modifiers=~'export' ]`
   */
  name: string
  /**
   * Returns current node's type string representation. If type is not declared it will be inferrer form usage. If type doesn't apply to current node it will return empty string. 
   * 
   * Examples: `// VariableDeclaration [ @type=='Date[]']`, `// Parameter [ @type=='boolean' || @type=='number']`
   */
  type: string
  /**
   * A comma separated modifier names in ` "export", "default", "declare", "abstract", "public", "protected", "private", "readonly", "static", "async", "const"`. Example: `// PropertyDeclaration [ @modifiers=~'private' || @modifiers=~'protected' ]`
   */
  modifiers: string
  /**
   * Returns a AST Node if the node has an expression, or null other wise. 
   */
  expression: ASTNode | null
  /**
   * Gets the literal text of a literal-like node. Example: `// LiteralString [compareText({forbidden}, @literalText, 'verb:equals,caseSensitive:true']`
   */
  literalText: string
  /**
   * Returns the position of current node in its source file.
   */
  start: number
  /**
   * Returns the position of current node's end, in its source file.
   */
  end: number
  /**
   * Returns the amount of characters of current node.
   */
  width: number
  /**
   * Return current node's body node, or null if it doesn't have a body.
   */
  body: ASTNode | null
  /**
   * Returns the text of comments before this node.
   */
  leadingComments: string[]
  /**
   * Returns the text of comments after this node.
   */
  trailingComments: string[]
  /**
   * Returns a node kind based path for the node, like `src/services/login/loginService/InterfaceDeclaration/Identifier`. Notice that unlike @indexPath, this doesn't necessarily points to the node.
   */
  kindPath: string
  /**
   * Returns a child-index based path for the node, similar to `src/services/login/loginService/2/1`
   */
  indexPath: string
  /**
   * Returns a node-name based path for current node, like `src/services/login/loginService/LoginService/method1/param1`. Notice that unlike @indexPath, this doesn't necessarily points to the node. If a node doesn't have a name, its kind name will be printed in the path instead.
   */
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

