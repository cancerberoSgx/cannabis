import { Emitter } from 'misc-utils-of-mine-generic'
import { tsMorph } from 'ts-simple-ast-extra'
import { Example, examples } from "./editor/examples"

class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    this.state = {
      selectedExample: examples[0],
      result: [], examples,
      nodesAtPosition: undefined
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
export interface State {
  selectedExample: Example;
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodesAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
}

let store: Store
export function getStore() {
  if (!store) {
    store = new Store()
  }
  return store
}
