import { GeneralNode, isDirectory, isNode, isSourceFile, ts, tsMorph } from 'ts-simple-ast-extra'
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
      ? (f.getDirectories() as ASTNode[]).concat(f.getSourceFiles() as ASTNode[])
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

export function getGeneralNodeText(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n.getText()
}
export const getASTNodeText = getGeneralNodeText

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
