import { tsMorph } from 'ts-simple-ast-extra'
import { ASTDirectory } from './astNode'
import { unique } from './util'
// import { ASTDirectory, ASTFile } from './astNode';

let file: tsMorph.SourceFile | undefined
let _project: tsMorph.Project | undefined
let reuseProject = true

/**
 * Creates a new file with given code
 */
export function getFile(code: string) {

  file = getProject().createSourceFile(getNewFileName(), code)
  return file!
}

function getProject() {
  if (!reuseProject || !_project) {
    _project = new tsMorph.Project({})
  }
  return _project
}

function getNewFileName(): string {
  return `${unique('cannabis_test_file_')}.ts`
}

export function createSourceFile(code = '', name = getNewFileName(), parent?: ASTDirectory): tsMorph.SourceFile {
  if (parent) {
    return parent.createSourceFile(name, code)
  } else {
    return getFile(code)
  }
}

export function loadProject(tsConfigFilePath: string): ASTRoot {
  if (_project) {
    _project.getSourceFiles().forEach(f => f.forget())
  }
  _project = new tsMorph.Project({ tsConfigFilePath, addFilesFromTsConfig: true })
  return new ASTRootImpl(_project)
}

/**
 * Returns an object representing the project that gives access to the root directories using [[getRootDirectories]] which are queriable nodes. 
 */
export function createDirectory(name: string, parent?: ASTDirectory) {
  if (parent) {
    return parent.createDirectory(name)
  } else {
    return getProject().createDirectory(name)
  }
}

export function getTsMorphFile(code: string = '') {
  return getFile(code)
}

export function getTsFile(code: string = '') {
  return getFile(code).compilerNode
}

/**
 * This represents the project and is not a valid Node. Query on the root directories using [[getRootDirectory]].
 */
interface ASTRoot {
  getRootDirectory(): ASTDirectory
  getRootDirectories(): ASTDirectory[]
}
class ASTRootImpl implements ASTRoot {
  constructor(private _project: tsMorph.Project) { }
  /**
   * Returns all project's root directories, including those in node_modules project dependencies. The first one will be thir project's source directory alghouth you can force omitting node_modules ones with [[getRootDirectory]] .
   */
  getRootDirectories(): ASTDirectory[] {
    return this._project.getRootDirectories()
  }
  /**
   * [[getRootDirectories]] could return many folders since it will include also the ones in node_modules project dependencies. Use [[getRootDirectory]] to ignore those. 
   */
  getRootDirectory(): ASTDirectory {
    const filtered = this.getRootDirectories().filter(f => !f.getPath().includes('node_modules'))
    return filtered.length ? filtered[0] : this.getRootDirectories()[0]
  }
  getSourceFiles(): tsMorph.SourceFile[] {
    return this._project.getSourceFiles()
  }
}
// function isASTProject(a: any): a is ASTProjectImpl {
//   return a && a.__astProjectImpl===2
// }
