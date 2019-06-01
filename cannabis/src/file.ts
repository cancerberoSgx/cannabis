import { unique } from 'misc-utils-of-mine-generic'
import { ts, tsMorph } from 'ts-simple-ast-extra'
import { ASTDirectory, ASTFile, ASTNode, getASTNodeFilePath } from './astNode'
import { getConfig } from './config'

let file: ASTFile | undefined
let _project: tsMorph.Project | undefined
let reuseProject = true

/**
 * Creates a new file with given code
 */
export function getFile(code: string): ASTNode {
  file = getProject().createSourceFile(getNewFileName(), code)
  return file!
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
  }
  return _project
}

function getNewFileName(): string {
  return `${unique('cannabis_test_file_')}.tsx`
}

/**
 * Creates a new SourceFile kind of node from given code with given name.
 */
export function createSourceFile(code = '', name = getNewFileName(), parent?: ASTDirectory): ASTNode {
  if (parent) {
    return parent.createSourceFile(name, code)
  } else {
    return getFile(code)
  }
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
  return new ASTRootImpl(_project)
}

/**
 * Allows to load an existing ts-morph project instance.
 */
export function setProject(project: tsMorph.Project): ASTRoot {
  if (_project) {
    _project.getSourceFiles().forEach(f => f.forget())
  }
  _project = project
  return new ASTRootImpl(_project)
}

/**
 * Creates a new directory kind ASTNode with given name and cihldren of given parent directory or at the root
 * if no parent is given.
 */
export function createDirectory(name: string, parent?: ASTDirectory): ASTNode {
  if (parent) {
    return parent.createDirectory(name)
  } else {
    return getProject().createDirectory(name)
  }
}

// /**
//  * @internal
//  */
// export function getTsMorphFile(code: string = '') : tsMorph.SourceFile {
//   return getFile(code)
// }

/**
 * This represents the project and is not a valid Node. Query on the root directories using
 * [[getRootDirectory]].
 */
interface ASTRoot {
  getRootDirectory(): ASTNode
  getRootDirectories(): ASTNode[]
}

class ASTRootImpl implements ASTRoot {

  constructor(private _project: tsMorph.Project) { }

  /**
   * Returns all project's root directories, including those in node_modules project dependencies. The first
   * one will be thir project's source directory alghouth you can force omitting node_modules ones with
   * [[getRootDirectory]] .
   */
  getRootDirectories(): ASTNode[] {
    return this._project.getRootDirectories().filter(d => getConfig('includeFilesInNodeModules') || !d.getPath().includes('node_modules'))
  }

  /**
   * [[getRootDirectories]] could return many folders since it will include also the ones in node_modules
   * project dependencies. Use [[getRootDirectory]] to ignore those. 
   */
  getRootDirectory(): ASTNode {
    const filtered = this.getRootDirectories().filter(f => getConfig('includeFilesInNodeModules') || !getASTNodeFilePath(f).includes('node_modules'))
    return filtered.length ? filtered[0] : this.getRootDirectories()[0]
  }

  getSourceFiles(): ASTFile[] {
    return this._project.getSourceFiles()
  }
}
