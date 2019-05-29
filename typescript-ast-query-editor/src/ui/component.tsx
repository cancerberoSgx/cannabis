import * as React from 'react'
import { getStore, State } from '../app/store'

export interface AbstractProps {
}
export class AbstractComponent<P extends AbstractProps = AbstractProps, S extends State = State> extends React.Component<P, S>{
  constructor(p: P, s: State) {
    super(p, s)
    this.state = getStore().getState() as S
    getStore().add(() => {
      super.setState({ ...getStore().getState() })
    })
  }
  //@ts-ignore
  setState(state: Partial<S>) {
    getStore().setState(state)
  }
}