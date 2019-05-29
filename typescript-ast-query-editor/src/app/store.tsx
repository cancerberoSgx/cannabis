import { Emitter } from 'misc-utils-of-mine-generic'
import { tsMorph } from 'ts-simple-ast-extra'
import { Example, examples, codeExamples } from "./examples"
import { getFile } from '../../../dist/src/file';

class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    this.state = {
      selectedExample: examples[0],
      currentEditorAst: getFile(codeExamples.find(c=>c.name===examples[0].code)&&codeExamples.find(c=>c.name===examples[0].code)!.content||codeExamples[0].content),
      result: [], examples,
      logs: [],
      nodesAtPosition: undefined,
      queryDump: '',
      sidebarVisibility: false
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

export interface State {
  selectedExample?: Example;
  currentEditorAst: tsMorph.SourceFile
  queryDump: string
  logs:string[]
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodesAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
  sidebarVisibility: boolean
}
