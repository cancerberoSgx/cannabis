import { unique } from 'misc-utils-of-mine-generic'
import { ts, tsMorph, isNode } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeFilePath, isASTNode } from './astNode'
import { getConfig } from './config'
import { Node } from 'ts-morph';
import { displayPartsToString } from 'typescript';

let file: tsMorph.SourceFile | undefined
let _project: tsMorph.Project | undefined
let reuseProject = true

/**
 * Creates a new file with given code. If there is a project loaded, the new file won't be associated with any directory. 
 * If fileName is passed, make sure is unique, if not it will throw.
 */
export function getFile(codeOrNode: string | ts.Node | ASTNode, fileName?: string): ASTNode {
  let node: tsMorph.Node | tsMorph.Directory
  if (typeof codeOrNode === 'string') {
    node = getProject().createSourceFile(fileName || getNewFileName(), codeOrNode)
  }
  else if (isASTNode(codeOrNode)) {
    // if(isNode(codeOrNode)){
    //   if(!getProject().getSourceFiles().find(f=>f===codeOrNode.getSourceFile())){
    //     throw new Error('Strange node detected and not supported.\nSeems you have created this node in an independent ts-morph project. You must call loadProject() or setProject() before!' )
    //     // node = getProject().createSourceFile(codeOrNode.getSourceFile().getFilePath(), codeOrNode)
    //   }
    // } else {
    //   if(!getProject().getDirectories().find(d=>d===codeOrNode)) {
    //     throw new Error('Strange Directory detected and not supported.\nSeems you have created this node in an independent ts-morph project. You must call loadProject() or setProject() before!' )
    //   }
    // }
    node = codeOrNode    
  }
  else {
    node = getFile(codeOrNode.getText())
  }
  return node!
}

function getProject() {
  if (!reuseProject || !_project) {
    _project = new tsMorph.Project(
      {
        compilerOptions: {
          target: ts.ScriptTarget.ES2015,
          module: ts.ModuleKind.CommonJS,
          lib: ['es2015'],
          jsx: ts.JsxEmit.React,
          rootDir: ".",
        }
      }
    )
    _astRoot = new ASTRootImpl(_project)
  }
  return _project
}

function getNewFileName(): string {
  return `${unique('cannabis_test_file_')}.tsx`
}

/**
 * Returns an object representing the project that gives access to the root directories using
 * [[getRootDirectories]] which are queriable nodes. 
 */
export function loadProject(tsConfigFilePath: string): ASTRoot {
  if (_project) {
    _project.getSourceFiles().forEach(f => f.forget())
  }
  _project = new tsMorph.Project({ tsConfigFilePath, addFilesFromTsConfig: true })
  return _astRoot = new ASTRootImpl(_project)
}

let _astRoot: ASTRoot

/**
 * Allows to load an existing ts-morph project instance.
 */
export function setProject(project: tsMorph.Project): ASTRoot {
  if (_project) {
    _project.getSourceFiles().forEach(f => f.forget())
  }
  _project = project
  return _astRoot = new ASTRootImpl(_project)
}

/**
 * This represents the project and is not a valid Node. Query on the root directories using
 * [[getRootDirectory]].
 */
interface ASTRoot {
  getRootDirectory(): ASTNode
  getRootDirectories(): ASTNode[]
  getSourceFiles(): ASTNode[]
}

export function getASTRoot() {
  if (!_astRoot) {
    _astRoot = new ASTRootImpl(getProject())
  }
  return _astRoot
}

class ASTRootImpl implements ASTRoot {

  constructor(private _project: tsMorph.Project) {

  }

  /**
   * Returns all project's root directories, including those in node_modules project dependencies. The first
   * one will be thir project's source directory alghouth you can force omitting node_modules ones with
   * [[getRootDirectory]] .
   */
  getRootDirectories(): ASTNode[] {
    const d= this._project.getRootDirectories().filter(d => getConfig('includeFilesInNodeModules') || !d.getPath().includes('node_modules'))
    if(!d.length){
      const dirs = this._project.getDirectories().filter(d => getConfig('includeFilesInNodeModules') || !d.getPath().includes('node_modules'))
      if(displayPartsToString.length){
        return dirs
      }
      else {
        const dir=      this._project.createDirectory('src')
        return [dir]
      }
    }
    else {
      return d
    }
  }

  /**
   * [[getRootDirectories]] could return many folders since it will include also the ones in node_modules
   * project dependencies. Use [[getRootDirectory]] to ignore those. 
   */
  getRootDirectory(): ASTNode {
    const filtered = this.getRootDirectories().filter(f => getConfig('includeFilesInNodeModules') || !getASTNodeFilePath(f).includes('node_modules'))
    return filtered.length ? filtered[0] : this.getRootDirectories()[0]
  }

  getSourceFiles(): ASTNode[] {
    return this._project.getSourceFiles()
  }
}
