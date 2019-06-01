import { getObjectProperty, setObjectProperty } from 'misc-utils-of-mine-generic'
import { GeneralNode, isDirectory, isNode, isSourceFile, ts, tsMorph, printAstPath, buildAstPath } from 'ts-simple-ast-extra'
import { getConfig } from './config'
import { Node } from './queryAst'
import { config } from 'shelljs';
import { getASTRoot } from './file';

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export type ASTNode = GeneralNode

/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getASTNodeChildren(f: ASTNode, getChildren?: boolean): ASTNode[] {
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

export function getASTNodeText(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n ? n.getText() : ''
}

export function getASTNodeFilePath(n: ASTNode) {
  return isDirectory(n) ? n.getPath() : n ? n.getSourceFile().getFilePath() : ''
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

export function setNodeProperty(n: ASTNode, path: string | (string | number)[], value: any) {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  setObjectProperty((n as any).cannabis_meta, path, value)
}

export function getNodeProperty<T = any>(n: ASTNode, path: string | (string | number)[]): T | undefined {
  if (!(n as any).cannabis_meta) {
    (n as any).cannabis_meta = {}
  }
  return getObjectProperty<T>((n as any).cannabis_meta, path)
}

interface NodePathOptions {
  onlyIndex?: boolean;
  onlyKindName?: boolean
  // levelSeparator?: string
  // dontPrintSourceFilePrefix?: boolean
  // mode?: 'getChildren' | 'forEachChildren';

}
const defaultPathOptions: Required<NodePathOptions> = { 
  onlyIndex: false, 
  onlyKindName: false, 
  // levelSeparator: '/', 
  //  mode: getConfig('getChildren') ? 'getChildren' : 'forEachChildren' 
  }

export function getASTNodePath(n: ASTNode, options: NodePathOptions = defaultPathOptions): string {
  const finalOptions = { ...defaultPathOptions, ...options, dontPrintSourceFilePrefix: false, levelSeparator: '/' }
  if (isDirectory(n) || isSourceFile(n)) {
    const root = getASTRoot().getRootDirectory() as tsMorph.Directory
    const p = root.getRelativePathAsModuleSpecifierTo(n as any)
    // console.log(options, finalOptions, p, finalOptions.levelSeparator, (p.startsWith('./') ? p.substring(2) : p).replace(/\//g, finalOptions.levelSeparator));    
    return (p.startsWith('./') ? p.substring(2) : p).replace(/\//g, finalOptions.levelSeparator)
  }
  else {
    const p = buildAstPath(n, n.getSourceFile(),{mode: getConfig('getChildren') ? 'getChildren' : 'forEachChildren', includeNodeKind: true })
    const nodePath = printAstPath(p, finalOptions)
    return getASTNodePath(n.getSourceFile(), finalOptions) + finalOptions.levelSeparator + nodePath.substring(nodePath.indexOf('/')+1)
  }
}

export function getASTNodeIndexPath(n: ASTNode): string {
  return getASTNodePath(n, { onlyIndex: true })
}

export function getASTNodeKindPath(n: ASTNode): string {
  return getASTNodePath(n, { onlyKindName: true })
}

// export function getRoot(n:ASTNode): tsMorph.Directory|tsMorph.SourceFile{
//   getpro
//   const p = getASTNodeParent(n)
//   console.log('root', (n as tsMorph.Directory).getBaseName(),p&& (p as tsMorph.Directory).getBaseName());

//   if(!p||p===n){
//     return (isDirectory(n)||isSourceFile(n) )? n : getRoot(n.getSourceFile())
//   }
//   else {
//     return getRoot(p)
//   }
// }
// export { getGeneralNodePath as getASTNodePath } from 'ts-simple-ast-extra'
