import * as React from 'react'
import { getStore, State } from '../store'

interface Props {
}
export class AbstractComponent extends React.Component<Props, State> {
  constructor(p: Props, s: State) {
    super(p, s)
    this.state = getStore().getState()
    getStore().add(() => {
      super.setState({ ...getStore().getState() })
    })
  }
  setState(state: Partial<State>) {
    getStore().setState(state)
  }
}
