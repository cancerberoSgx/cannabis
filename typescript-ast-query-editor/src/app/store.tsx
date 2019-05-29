import { ASTQQuery, ASTYNode, createSourceFile, queryAst } from 'cannabis'
import { Emitter } from 'misc-utils-of-mine-generic'
import { tsMorph } from 'ts-simple-ast-extra'
import { codeExamples, Example, examples } from "./examples"

class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    const selectedExample = examples[0]
    const selectedExampleCode = codeExamples.find(c => c.name === selectedExample.code) && codeExamples.find(c => c.name === selectedExample.code)!.content || codeExamples[0].content
    const r = queryAst(selectedExample.query, selectedExampleCode)
    this.state = {
      selectedExample,
      astAutoUpdate: false,
      currentEditorAst: createSourceFile(selectedExampleCode),
      result: [], examples,
      logs: [],
      nodeAtPosition: undefined,
      queryDump: r.query && r.query.dump() || '',
      sidebarVisibility: false,
      query: r.query!,
      queryAst: r.query!.ast
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
  selectedExample: Example;
  currentEditorAst: tsMorph.SourceFile
  astAutoUpdate: boolean
  queryDump: string
  logs: string[]
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodeAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
  sidebarVisibility: boolean
  query: ASTQQuery
  queryAst: ASTYNode
}
