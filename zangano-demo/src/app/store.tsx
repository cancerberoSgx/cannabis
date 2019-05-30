import {} from 'ts-morph'
import { Emitter, objectKeys } from 'misc-utils-of-mine-generic'
import {createBrowserProject, tsMorph, ts} from 'zangano'


class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
     const currentProject = createBrowserProject()
     const currentSourceFile = currentProject.createSourceFile('test.ts', 'var a = [1,2]')
    this.state = {
      projects: [{project: currentProject , gitUrl: 'http://TODO', internalDir :'/dummy' }], 
      currentSourceFile,
      currentProject,
      logs: [],
      sidebarVisibility: false,
      gitUrlInput: '',
      status: undefined,
      error: undefined
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
  project:  tsMorph.Project
  gitUrl: string
  internalDir: string
}
export interface State {
  projects: GitProject[]
  sidebarVisibility: boolean,
  currentProject: tsMorph. Project
  currentSourceFile:  tsMorph.SourceFile
  nodeAtPosition?: tsMorph.Node
  logs: string[]
  gitUrlInput: string,
  status: undefined|string
  error: Error|undefined
}