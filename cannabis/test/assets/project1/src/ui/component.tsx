import * as React from 'react'
import {getStore} from '../store/store'
import {State} from '../store/state'

export interface AbstractProps {
}

export class AbstractComponent<P extends AbstractProps = AbstractProps, S extends State = State> extends React.Component<P, S>{
  constructor(p: P, s: State) {
    super(p, s)
    this.state = getStore().getState() as S
    
  }
  setState: React.Component<AbstractProps, State>['setState'] = state => {
  
  }
}
