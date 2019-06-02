import { getNodeProperty as getNodeProperty_, setNodeProperty as setNodeProperty_, GeneralNode, isDirectory, isNode, isSourceFile, ts, getName } from 'ts-simple-ast-extra'
import { getConfig } from './config'
import { Node } from './queryAst'
import { asArray, shorter } from 'misc-utils-of-mine-generic';

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export type ASTNode = GeneralNode

/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getASTNodeChildren(f: ASTNode, getChildren: boolean = getConfig('getChildren')): ASTNode[] {
  return !f
    ? []
    : isDirectory(f)
      ? (f.getDirectories() as ASTNode[]).concat(f.getSourceFiles()).filter(f => getConfig('includeFilesInNodeModules') || !getASTNodeFilePath(f).includes('node_modules'))
      : f ? getChildren ? f.getChildren() : f.forEachChildAsArray() : []
}

/**
 * get general node's parent
 */
export function getASTNodeParent(f: ASTNode): ASTNode | undefined {
  return !f
    ? undefined
    : isDirectory(f)
      ? (f.getParent() as ASTNode)
      : isSourceFile(f)
        ? f.getDirectory()
        : f.getParent()
}


export function getASTNodeSiblings(n: ASTNode ) {
  if (isSourceFile(n)) {
    const p = n.getDirectory()
    if(p && p!==n as any){
      return p.getSourceFiles().filter(f=>f!==n)
    }
  }
  else if(isDirectory(n)){
    const p = n.getParent()
    if(p && p!==n as any){
      return p.getDirectories().filter(f=>f!==n)
    }
  }
  else {
    return [...n.getNextSiblings(), ...n.getPreviousSiblings()]
  } 
  return[]
}

export function getASTNodeAncestors(n: ASTNode ) {
  const a : ASTNode[]= []
  let b : ASTNode |undefined
  while((b=getASTNodeParent(n))&& b!==n){
    a.push(b)
  }
  return a
}



/**
 * Gets a ASTNode that represents the SourceFile of given node, or undefined if it doesn't apply (i.e, given node is a directory).
 */
export function getASTSourceFile(f: ASTNode): ASTNode | undefined {
  return !f
    ? undefined
    : isDirectory(f)
      ? undefined       : isSourceFile(f) ? f :  f.getSourceFile()
}

export function isASTNode(f: any): f is ASTNode {
  return f && (isNode(f) || isDirectory(f))
}

export function getASTNodeKindName(n: ASTNode) {
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


export function setNodeProperty(n: ASTNode, path: string | (string | number)[], value: any) {
  setNodeProperty_(n as any,  ['cannabis', ...asArray(path)], value)
}

export function getNodeProperty<T = any>(n: ASTNode, path: string | (string | number)[]): T | undefined {
  return getNodeProperty_(n as any, ['cannabis', ...asArray(path)])
}

export function getASTNodeText(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n ? n.getText() : ''
}

export function getASTNodeFilePath(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n ? n.getSourceFile().getFilePath() : ''
}

export function visit<T extends ASTNode = any>(n: T, v: (n: T, parent?: T | undefined, level?: number | undefined) => boolean, childrenFirst = getConfig('visitChildrenFirst'), parent?: T, level = 0) {
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
