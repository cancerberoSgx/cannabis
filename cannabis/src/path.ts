import { buildAstPath, isDirectory, isSourceFile, printAstPath, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getNodeProperty, setNodeProperty, isASTNode } from './astNode'
import { getConfig } from './config'
import { getASTRoot } from './file'


interface NodePathOptions {
  onlyIndex?: boolean
  onlyKindName?: boolean
  onlyNameOrKind?: boolean
}

const defaultPathOptions: Required<NodePathOptions> = {
  onlyIndex: false,
  onlyKindName: false,
  onlyNameOrKind: false
}

export function getASTNodePath(n: ASTNode, options: NodePathOptions = defaultPathOptions): string {
  if (!isASTNode(n)) {
    return ''
  }
  let result: string = ''
  if (getConfig('cacheNodePaths')) {
    const cached = getNodeProperty(n, options.onlyIndex ? 'path.index' : options.onlyKindName ? 'path.kind' : 'name')
    if (cached) {
      return cached
    }
  }
  const finalOptions = { ...defaultPathOptions, ...options, dontPrintSourceFilePrefix: false, levelSeparator: '/' }
  if (isDirectory(n) || isSourceFile(n)) {
    const root = getASTRoot().getRootDirectory() as tsMorph.Directory
    const p = root.getRelativePathAsModuleSpecifierTo(n as any)
    result = (p.startsWith('./') ? p.substring(2) : p).replace(/\//g, finalOptions.levelSeparator)
  }
  else {
    const p = buildAstPath(n, n.getSourceFile(), {
      mode: getConfig('getChildren') ? 'getChildren' : 'forEachChildren',
      includeNodeKind: true,
      includeNodeName: finalOptions.onlyNameOrKind
    })
    const nodePath = printAstPath(p, finalOptions)
    result = getASTNodePath(n.getSourceFile(), finalOptions) + finalOptions.levelSeparator + nodePath.substring(nodePath.indexOf('/') + 1)
  }
  if (getConfig('cacheNodePaths')) {
    setNodeProperty(n, options.onlyIndex ? 'path.index' : options.onlyKindName ? 'path.kind' : 'name', result)
  }
  return result
}

export function getASTNodeIndexPath(n: ASTNode): string {
  return getASTNodePath(n, { onlyIndex: true })
}

export function getASTNodeKindPath(n: ASTNode): string {
  return getASTNodePath(n, { onlyKindName: true })
}

export function getASTNodeNamePath(n: ASTNode): string {
  return getASTNodePath(n, { onlyNameOrKind: true })
}
