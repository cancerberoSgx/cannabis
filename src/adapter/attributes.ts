import { isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getGeneralNodeText } from '../astNode'
import { tryTo } from 'misc-utils-of-mine-generic';
import { getProject } from '../file';

export function getAttribute(node: ASTNode, attr: string)  {
  try {
    if (!node) {
      return null
    }
    else if (attr === 'text') {
      // return isNode(node) ? node.getText() : ''
      return getGeneralNodeText(node)
    }
    else if (attr === 'name') {
      return getASTNodeName(node) || ''
    }
    else if (attr === 'type') {
      // const t = getProject().getTypeChecker()
      // node.getSourceFile()!.langua
      // debugger
      return isNode(node) && tryTo(()=>node.getType().getText()) || ''
    }
    else if (attr === 'modifiers') {
      return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n => n.getText()).join(' ') || ''
    }
    else if (attr === 'expression') {
      const e = isNode(node) && node.compilerNode && (node.compilerNode as any).expression || null
      // console.log('Expression',  e && e.getText());
      return e 
      // const e = isNode(node) && tsMorph.TypeGuards.isExpressionedNode(node) && node.getExpression() || 'null'
      // console.log('Expression',  e);
      // return e
    }
  } catch (error) {
    console.error('ERROR on getAttribute for attr==', attr, error)
 
  }
  return null
  //body, expression, symbol, type, pos, start, getModifiers, 
}

