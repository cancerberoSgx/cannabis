import * as React from 'react'
import { getStore, State } from '../app/store'

export interface AbstractProps {
}
export class AbstractComponent<P extends AbstractProps = AbstractProps, S extends State = State> extends React.Component<P, S>{
  constructor(p: P, s: State) {
    super(p, s)
    this.state = getStore().getState() as S
    // if(!this.customStateUpdate){
      getStore().add(( ) => {
        // const listenChanges = this.updatesOnlyWithChanges ? arrayInterception(this.updatesOnlyWithChanges, changes): changes
        
        // if(this.shouldUpdateIfStateChange(p)){
          super.setState({ ...getStore().getState() })
        // }
      })
    // }
  }
  // protected shouldUpdateIfStateChange(p: StateChange){
  //   return true
  // }
  setState: React.Component['setState'] = state => {
    getStore().setState(state as Partial<S>)
  }
}


export function arrayInterception<A=any, B=any>(a: A[], b: B[]): (A|B)[] {
  console.log('a.filter(a=>b.find((b:any)=>b===a))', a, b, a.filter(a=>b.find((b:any)=>b===a)));
  
  return a.filter(a=>b.find((b:any)=>b===a))
}