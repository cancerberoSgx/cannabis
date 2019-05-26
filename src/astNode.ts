import { GeneralNode, getName, isDirectory, isNode, isSourceFile, tsMorph } from 'ts-simple-ast-extra'

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

export function isGeneralNode(f: any): f is ASTNode {
  return f && (isNode(f) || isDirectory(f))
}

export function getGeneralNodeKindName(n: ASTNode) {
  return !n ? undefined : isNode(n) ? n.getKindName() : 'Directory'
}

export function getASTNodeName(node: ASTNode) {
  if (isDirectory(node) || isSourceFile(node)) {
    return node.getBaseName()
  }
  else {
    return getName(node)
  }
}
