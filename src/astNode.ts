import { tsMorph, isDirectory, isSourceFile, isNode ,getName, GeneralNode } from 'ts-simple-ast-extra';

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
//  type GeneralNode = tsMorph.Node | tsMorph.Directory

export type ASTNode = GeneralNode


export type ASTDirectory = tsMorph.Directory

export type ASTFile = tsMorph.SourceFile


/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getGeneralNodeChildren(f: ASTNode): ASTNode[] {
  return !f
    ? []
    // : isASTProject(f) ? f.getChildren() 
    : isDirectory(f)
    ? (f.getDirectories() as ASTNode[]).concat(f.getSourceFiles() as ASTNode[])
    : f.forEachChildAsArray()
}

// export function isGeneralNode(f: any): f is GeneralNode {
//   return f && (isNode(f) || isDirectory(f))
// }

// export function getGeneralNodeKindName(n: GeneralNode) {
//   return !n ? undefined : isNode(n) ? n.getKindName() : 'Directory'
// }

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
  return f && (isNode(f) || isDirectory(f));
}

export function getGeneralNodeKindName(n: ASTNode) {
  return !n ? undefined : isNode(n) ? n.getKindName() : 'Directory';
}

export function getASTNodeName(node: ASTNode){
  if (isDirectory(node) || isSourceFile(node)) {
    return node.getBaseName()
  }
  else {
    return getName(node)
  }
}

// /**
//  * Directories and SourceFile path is given by getPath* methods. For nodes we use AstPath for defining their path.
//  */
// export function getGeneralNodePath(f: GeneralNode, relativeTo?: string): string | undefined {
//   if (isDirectory(f) || isSourceFile(f)) {
//     return relativeTo ? getRelativePath(relativeTo, getFilePath(f)) : getFilePath(f)
//   } else {
//     const file = f.getSourceFile()
//     const s = buildAstPath(f, file, { includeNodeKind: true })
//     let nodePath = printAstPath(s)
//     nodePath = nodePath.startsWith('SourceFile>') ? nodePath.substring('SourceFile>'.length) : nodePath
//     const path = `${getGeneralNodePath(file, relativeTo)}#${nodePath}`
//     return path
//   }
// }



// export interface ASTDirectoryConcrete{
//   /**
//    * Creates a directory if it doesn't exist.
//    * @param dirPath - Relative or absolute path to the directory that should be created.
//    */
//   createDirectory(dirPath: string): ASTDirectory;
//   /**
//    * Creates a source file, relative to this directory.
//    * @param relativeFilePath - Relative file path of the source file to create.
//    * @param sourceFileText - Text, structure, or writer function to create the source file text with.
//    * @throws - InvalidOperationError if a source file already exists at the provided file name.
//    */
//   createSourceFile(relativeFilePath: string, sourceFileText?: string): ASTFile;
// }

//  {

// } & ASTNode


// export function createASTProject(_project: tsMorph.Project): ASTDirectory{
//   return new ASTProjectImpl(_project) as any as ASTDirectory
// }
// class ASTProjectImpl implements ASTDirectoryConcrete {
//   constructor(private _project: tsMorph.Project){}
//   __astProjectImpl=2
//   createSourceFile(relativeFilePath: string, sourceFileText?: string | undefined): GeneralNode {
//     return this._project.createSourceFile(relativeFilePath, sourceFileText)
//   }
//   createDirectory(dirPath: string): ASTDirectory {
//     return this._project.createDirectory(dirPath)
//   }
//   getChildren(){
//     return this._project.getRootDirectories()
//   }
// }
// function isASTProject(a: any): a is ASTProjectImpl {
//   return a && a.__astProjectImpl===2
// }