import { Emitter, objectKeys } from 'misc-utils-of-mine-generic'
import { tsMorph } from 'ts-simple-ast-extra'
import { Example, examples, codeExamples } from "./examples"
import { getFile } from '../../../dist/src/file';

// export interface StateChange  {partial: Partial<State>, newState: State, oldState: State}
class Store extends Emitter<void> {
  protected state: State;
  constructor() {
    super()
    const currentEditorText = codeExamples.find(c=>c.name===examples[0].code)&&codeExamples.find(c=>c.name===examples[0].code)!.content||codeExamples[0].content
    this.state = {
      selectedExample: examples[0],
      currentEditorText: currentEditorText,
      astAutoUpdate: false,
      currentEditorAst: getFile(currentEditorText),
      result: [], examples,
      logs: [],
      nodeAtPosition: undefined,
      queryDump: '',
      sidebarVisibility: false
    }
  }
  setState(state: Partial<State>) {
    // const oldState = this.state
    this.state = { ...this.state, ...state }
    this.emit()///{partial: state, newState: this.state, oldState})
  }
  getState() {
    return this.state
  }
  dispatch(action: allActions){
    if(this.shouldDispatch(action)){
      action.dispatch(this )
    }
  }
  protected shouldDispatch(action: Action): any {
    if(isNodeAtPositionAction(action) && action.node===this.state.nodeAtPosition){
      return false
    }
    else {
      return true
    }
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
  currentEditorText: string
  queryDump: string
  logs:string[]
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodeAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
  sidebarVisibility: boolean
}

interface Action {
  type: string
  dispatch(state:Store):void
}
function  isNodeAtPositionAction(a: Action): a is INodeAtPositionAction {
  return a.type==='NodeAtPositionAction'
}
type allActions = INodeAtPositionAction
export interface INodeAtPositionAction extends Action {
  // type: 'NodeAtPositionAction',
  node: tsMorph.Node|undefined
}
export class NodeAtPositionAction implements INodeAtPositionAction {
  type='NodeAtPositionAction'
  constructor(public node: tsMorph.Node|undefined){}
  dispatch(s:Store){
    s.setState({
      nodeAtPosition: this.node
    })
    // s.nodeAtPosition=this.node
  }
}