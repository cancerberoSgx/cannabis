import { getObjectProperty, setObjectProperty } from 'misc-utils-of-mine-generic'
import { GeneralNode, isDirectory, isNode, isSourceFile, ts, tsMorph } from 'ts-simple-ast-extra'
import { getConfig } from './config'
import { Node } from './queryAst'

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export type ASTNode = GeneralNode

export type ASTDirectory = tsMorph.Directory

export type ASTFile = tsMorph.SourceFile

/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getGeneralNodeChildren(f: ASTNode): ASTNode[] {
  return !f
    ? []
    : isDirectory(f)
      ? (f.getDirectories() as ASTNode[]).concat(f.getSourceFiles()).filter(f => getConfig('includeFilesInNodeModules') || !getASTNodeFilePath(f).includes('node_modules'))
      : f.forEachChildAsArray()
}
export const getASTNodeChildren = getGeneralNodeChildren
/**
 * get general node's parent
 */
export function getGeneralNodeParent(f: ASTNode): ASTNode | undefined {
  return !f
    ? undefined
    : isDirectory(f)
      ? (f.getParent() as ASTNode)
      : isSourceFile(f)
        ? f.getDirectory()
        : f.getParent()
}

export const getASTNodeParent = getGeneralNodeParent

export function isGeneralNode(f: any): f is ASTNode {
  return f && (isNode(f) || isDirectory(f))
}

export const isASTNode = isGeneralNode

export function getGeneralNodeKindName(n: ASTNode) {
  return !n ? undefined : isNode(n) ? n.getKindName() : 'Directory'
}

export const getASTNodeKindName = getGeneralNodeKindName

export function getASTNodeName(node: ASTNode) {
  if (isDirectory(node) || isSourceFile(node)) {
    return node.getBaseName()
  }
  else {
    return getName(node)
  }
}

export const getGeneralNodeName = getASTNodeName

export function getASTNodeText(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n.getText()
}

export function getASTNodeFilePath(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n.getSourceFile().getFilePath()
}

export function getName(n: Node) {
  function getNodeName(n: Node) {
    if (tsMorph.TypeGuards.isIdentifier(n)) {
      return n.getText()
    }
    const id = n.getFirstChildByKind(ts.SyntaxKind.Identifier)
    return id ? id.getText() : undefined
  }
  try {
    return (tsMorph.TypeGuards.hasName(n) ? n.getName() : getNodeName(n)) || undefined
  } catch (error) {
    return undefined
  }
}

export function visit<T extends ASTNode = any>(n: T, v: (n: T, parent?: T | undefined, level?: number | undefined) => boolean, childrenFirst = true, parent?: T, level = 0) {
  if (!n) {
    return
  }
  if (!childrenFirst && v(n, parent, level)) {
    return true
  }
  getASTNodeChildren(n).forEach((c: any) => { visit(c, v, childrenFirst, n, level + 1) })
  return childrenFirst && v(n, parent, level)
}

export function getASTNodeDescendants(node: ASTNode) {
  const a: ASTNode[] = []
  visit(node, n => {
    a.push(n)
    return false
  })
  return a
}

export function setNodeProperty(n: GeneralNode, path: string | (string | number)[], value: any) {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  setObjectProperty((n as any).cannabis_meta, path, value)
}

export function getNodeProperty<T = any>(n: GeneralNode, path: string | (string | number)[]): T | undefined {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  return getObjectProperty<T>((n as any).cannabis_meta, path)
}

export { getGeneralNodePath as getASTNodePath } from 'ts-simple-ast-extra'
// export function getASTNodePath(node: ASTNode) {
//   if (isDirectory(node) || isSourceFile(node)) {
//     return node.get
//   }
// }
