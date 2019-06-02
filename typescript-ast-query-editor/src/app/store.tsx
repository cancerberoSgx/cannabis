import { ASTQQuery, ASTYNode, queryAst, tsMorph } from 'cannabis'
import { getFile } from 'cannabis/dist/src/file'
import { Emitter, objectKeys } from 'misc-utils-of-mine-generic'
import { debug } from './dispatchers'
import { codeExamples, Example, examples } from "./examples"

class Store extends Emitter<void> {
  protected state: State
  constructor() {
    super()
    const selectedExample = examples[0]
    const selectedExampleCode = codeExamples.find(c => c.name === selectedExample.code) && codeExamples.find(c => c.name === selectedExample.code)!.content || codeExamples[0].content
    const r = queryAst(selectedExample.query, selectedExampleCode)
    this.state = {
      selectedExample,
      astAutoUpdate: false,
      // currentTabIndex: 0,
      currentEditorAst: getFile(selectedExampleCode) as tsMorph.SourceFile,
      result: [], examples,
      logs: [],
      nodeAtPosition: undefined,
      queryDump: r.query && r.query.dump() || '',
      sidebarVisibility: false,
      query: r.query!,
      queryAst: r.query!.ast,
      getChildren: false,
      astShowText: true,
      queryNodeAtPosition: undefined
    }
  }
  setState(state: Partial<State>) {
    debug('Store setState', objectKeys(state))
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
  selectedExample: Example
  currentEditorAst: tsMorph.SourceFile
  astAutoUpdate: boolean
  queryDump: string
  logs: string[]
  result: tsMorph.Node<tsMorph.ts.Node>[]
  error?: Error | undefined
  examples: Example[]
  nodeAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined
  sidebarVisibility: boolean
  query: ASTQQuery
  queryAst: ASTYNode
  getChildren: boolean
  // currentTabIndex: number
  astShowText: boolean
  queryNodeAtPosition: ASTYNode | undefined
}
