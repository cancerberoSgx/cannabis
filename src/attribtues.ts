import { GeneralNode, getName, isDirectory, isNode, isSourceFile, tsMorph } from 'ts-simple-ast-extra'

export function getAttribute(node: GeneralNode, attr: string) {
  if (!node) {
    return undefined
  }
  else if (attr === 'text') {
    return isNode(node) ? node.getText() : ''
  }
  else if (attr === 'name') {
    if (isDirectory(node) || isSourceFile(node)) {
      return node.getBaseName()
    }
    else {
      return getName(node)
    }
  }
  else if (attr === 'type') {
    return isNode(node) && node.getType().getText()
  }
  else if (attr === 'modifiers') {
    return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n => n.getText()).join(' ')
  }
  //body, expression, symbol, type, pos, start, getModifiers, 
}
