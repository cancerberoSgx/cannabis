import { Emitter } from 'misc-utils-of-mine-generic'
import { tsMorph } from 'ts-simple-ast-extra'
import { Example, examples } from "../editor/examples"
import { StatefulEmitter } from '../util';
import * as React from 'react'

class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    this.state = {
      selectedExample: examples[0],
      result: [], examples,
      nodesAtPosition: undefined,
      queryTraceText: '',
      // sidebarVisibility: new StatefulEmitter<boolean>(false)ç
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
  selectedExample: Example;
  queryTraceText: string
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodesAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
  sidebarVisibility: boolean  // sidebarVisibility: StatefulEmitter<boolean>
}
