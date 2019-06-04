import { notUndefined, tryTo } from 'misc-utils-of-mine-generic'
import { getDefinitionsOf, getExtendsRecursively, getImplementsAll, isNode, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeName, getNodeProperty, setNodeProperty } from './astNode'
import { getConfig } from './config'

export function getASTNodeType(node: ASTNode) {
  if (isNode(node)) {
    return tryTo(() => node.getType()) || null
  }
  return null
}

export function getASTNodeTypeAsString(n: ASTNode) {
  const propName = 'typeText'
  if (getConfig('cacheTypeText')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const t = getASTNodeType(n)
  const value = t ? t.getText() || '' : ''
  if (getConfig('cacheTypeText')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function findReferences(n: ASTNode): any {
  const propName = 'findReferences'
  if (getConfig('cacheReferences')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value = isNode(n) && tsMorph.TypeGuards.isReferenceFindableNode(n) ? n.findReferencesAsNodes() : []
  if (getConfig('cacheReferences')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function getExtended(n: ASTNode) {
  if (tsMorph.TypeGuards.isClassDeclaration(n as any) || tsMorph.TypeGuards.isInterfaceDeclaration(n as any)) {
    return [...getExtendsRecursively(n as any)
      .map(m => m.getFirstChildByKind(tsMorph.SyntaxKind.Identifier)!)]
      .map(i => tsMorph.TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [undefined])
      .flat()
      .filter(notUndefined)
  }
  return []
}

export function getExtendedNames(n: ASTNode) {
  return getExtended(n).map(getASTNodeName)
}

export function getImplemented(n: ASTNode): ASTNode[] {
  return tsMorph.TypeGuards.isClassDeclaration(n as any) ? getImplementsAll(n as any) : []
}

export function getImplementedNames(node: ASTNode): string[] {
  return getImplemented(node).map(getASTNodeName)
}
