import { notUndefined, tryTo } from 'misc-utils-of-mine-generic'
import { getDefinitionsOf, getExtendsRecursively, getImplementsAll, getLocals, getNodeLocalNames, getNodeLocalNamesNotReferencing, getNodeLocalsDeclarations, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { getConfig } from '../query/config'
import { ASTNode, getASTNodeName, getNodeProperty, setNodeProperty } from './astNode'

export function getASTNodeType(node: ASTNode): tsMorph.Type | null {
  const propName = 'nodeType'
  if (getConfig('cacheNodeType')) {
    const cached = getNodeProperty(node, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value = tryTo(() => isNode(node) && node.getType(), null) || null
  if (getConfig('cacheNodeType')) {
    setNodeProperty(node, propName, value)
  }
  return value
}
export function getASTNodeTypeAsString(n: ASTNode) {
  //TODO: cache this one too?
  const t = getASTNodeType(n)
  const value = t ? (t as tsMorph.Type).getText() || '' : ''
  return value
}

export function getReturnType(n: ASTNode) {
  if (!isNode(n)) {
    return null
  }
  let f: tsMorph.FunctionLikeDeclaration | undefined
  if (tsMorph.TypeGuards.isIdentifier(n)) {
    f = n.getDefinitionNodes().find(tsMorph.TypeGuards.isFunctionLikeDeclaration)
  }
  else if (tsMorph.TypeGuards.isFunctionLikeDeclaration(n)) {
    f = n
  }
  else {
    return null
  }
  if (!f) {
    return null
  }
  return f.getReturnType() || null
}

export function findReferences(n: ASTNode): any {
  const propName = 'findReferences'
  if (getConfig('cacheReferences')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value = isNode(n) && tsMorph.TypeGuards.isReferenceFindableNode(n) ? tryTo(() => n.findReferencesAsNodes()) : []
  if (getConfig('cacheReferences')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function getExtended(n: ASTNode) {
  const propName = 'extended'
  if (getConfig('cacheExtended')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  let value: ASTNode[] = []
  if (tsMorph.TypeGuards.isClassDeclaration(n as any) || tsMorph.TypeGuards.isInterfaceDeclaration(n as any)) {
    value = [...getExtendsRecursively(n as any)
      .map(m => m.getFirstChildByKind(tsMorph.SyntaxKind.Identifier)!)]
      .map(i => tsMorph.TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [undefined])
      .flat()
      .filter(notUndefined)
  }
  if (getConfig('cacheExtended')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function getExtendedNames(n: ASTNode) {
  return getExtended(n).map(getASTNodeName)
}

export function getImplemented(n: ASTNode): ASTNode[] {
  const propName = 'implemented'
  if (getConfig('cacheImplemented')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value: ASTNode[] = tsMorph.TypeGuards.isClassDeclaration(n as any) ? getImplementsAll(n as any) : []
  if (getConfig('cacheImplemented')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function getDerivedClasses(n: ASTNode): ASTNode[] {
  const propName = 'derivedClasses'
  if (getConfig('cacheDerivedClasses')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value = tsMorph.TypeGuards.isClassDeclaration(n as tsMorph.Node) ? (n as tsMorph.ClassDeclaration).getDerivedClasses() : []
  if (getConfig('cacheDerivedClasses')) {
    setNodeProperty(n, propName, value)
  }
  return value
}

export function getImplementations(n: ASTNode): ASTNode[] {
  const propName = 'implementations'
  if (getConfig('cacheImplementations')) {
    const cached = getNodeProperty(n, propName)
    if (typeof cached !== 'undefined') {
      return cached
    }
  }
  const value = tsMorph.TypeGuards.isIdentifier(n as tsMorph.Node) ? (n as tsMorph.Identifier).getImplementations().map(r => r.getNode()).filter(notUndefined) : []
  if (getConfig('cacheImplementations')) {
    setNodeProperty(n, propName, value)
  }
  return value as any
}

export function getImplementedNames(node: ASTNode): string[] {
  return getImplemented(node).map(getASTNodeName)
}

export function localNames(n: ASTNode) {
  return tryTo(() => getNodeLocalNames(n as any))
}

export function localNamesNotReferencing(n: ASTNode, target: string | ASTNode) {
  return tryTo(() => getNodeLocalNamesNotReferencing(n as any, target as any)) || []
}

export function locals(n: ASTNode) {
  return tryTo(() => getLocals(n as any)) as Symbol | []
}

interface Symbol {
  flags: ts.SymbolFlags;
  escapedName: ts.__String;
  declarations: ts.Declaration[];
  valueDeclaration: ts.Declaration;
  members?: ts.SymbolTable;
  exports?: ts.SymbolTable;
  globalExports?: ts.SymbolTable;
}

export function localsDeclarations(n: ASTNode) {
  return tryTo(() => getNodeLocalsDeclarations(n as any)) || []
}
