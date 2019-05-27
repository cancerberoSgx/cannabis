import { Emitter } from 'misc-utils-of-mine-generic';
import { tsMorph } from 'ts-simple-ast-extra';
import { Example, examples } from "./examples";
// interface State {
//   selectedExample: Example
//   result: tsMorph.Node[]
//   error?: Error  
//   examples: Example[]
//   nodesAtPosition: tsMorph.Node | undefined
// }
type L = () => void;
class Store extends Emitter<L> {
  protected state: State;
  constructor() {
    super();
    this.state = {
      selectedExample: examples[0],
      result: [], examples,
      nodesAtPosition: undefined
    };
  }
  getState() {
    return this.state;
  }

}
export interface State {
  // asComponentState(): Readonly<State> {
  //  return {
  //    selectedExample: this.selectedExample, 
  // }
  selectedExample: Example;
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodesAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
}

let store: Store
export function getStore(){
  if(!store){
    store = new Store()
  }
  return store
}