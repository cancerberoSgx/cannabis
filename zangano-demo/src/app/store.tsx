import { Emitter, pathJoin } from 'misc-utils-of-mine-generic'
import { } from 'ts-morph'
import { createBrowserProject, tsMorph } from 'zangano'
import { editor } from 'monaco-editor';


class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    const currentProject = {
      project: createBrowserProject(), 
      gitUrl: 'http://TODO', 
      baseFolder: '/dummy',
      packageJson: { name: 'dummy', version: '0.0.1' }    
}
    const currentSourceFile = currentProject.project.createSourceFile('test.ts', 'var a = [1,2]')
    this.state = {
      projects: [],
      currentSourceFile,
      currentProject,
      logs: [],
      sidebarVisibility: false,
      gitUrlInput: 'https://github.com/cancerberoSgx/yamat',
      status: undefined,
      error: undefined,
      showAllFiles: false,
      currentTab: 0
    }
  }
  setState(state: Partial<State>) {
    this.state = { ...this.state, ...state }
    this.emit()
  }
  getState() {
    return this.state
  }
}

let store: Store
export function getStore() {
  if (!store) {
    store = new Store()
  }
  return store
}


export interface GitProject {
  project: tsMorph.Project
  gitUrl: string
  baseFolder: string
  packageJson: any
  // projectName: string
}

export interface State {
  projects: GitProject[]
  sidebarVisibility: boolean,
  currentProject: GitProject
  currentSourceFile: tsMorph.SourceFile
  nodeAtPosition?: tsMorph.Node
  logs: string[]
  gitUrlInput: string,
  status: undefined | string
  error: Error | undefined
  showAllFiles: boolean
  currentTab: number
}

interface TypeScriptProjectBase {
  project: tsMorph.Project
  baseFolder: string
  name: string
}
class BrowserTypeScriptProject implements TypeScriptProjectBase {
  constructor(public project: tsMorph.Project,
    public baseFolder: string,
    public name: string){
      
    }  
}
class MonacoTypeScriptProject  extends BrowserTypeScriptProject {
  getTsConfigFilePath(): string {
    return pathJoin(this.baseFolder, 'tsconfig.json')
  }
  constructor(public project: tsMorph.Project,
    public baseFolder: string,
    public name: string, public editor: editor.IEditor){
      super(project , baseFolder, name)
      this.project.addSourceFilesFromTsConfig(this.getTsConfigFilePath())
    }
    // getFileModel(file: tsMorph.SourceFile){
    //   if(!this.models[file.getFilePath()]){
    //     const model = new editor.createModel(
    //       file.getFullText(), ''

    //     )
    //   }
    // }
}