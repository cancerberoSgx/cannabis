import { GeneralNode, isNode, ts, tsMorph } from 'ts-simple-ast-extra'

export function getAttribute(node: GeneralNode, attr: string) {
  if (!node) {
    return undefined
  }
  else if (attr === 'text') {
    return isNode(node) ? node.getText() : ''
  }
  else if (attr === 'name') {
    const id = isNode(node) && node.getChildrenOfKind(ts.SyntaxKind.Identifier)
    return id && id.length && id[0].getText()
  }
  else if (attr === 'type') {
    return isNode(node) && node.getType().getText()
  }
  // else if (attr === 'sourceFile') {
  //   return isNode(node) && node.getSourceFile()
  // }
  else if (attr === 'modifiers') {
    return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n => n.getText()).join(' ')
  }
  //body, expression, symbol, type, pos, start, getModifiers, 
}
