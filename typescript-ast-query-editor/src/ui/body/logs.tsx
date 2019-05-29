import * as React from 'react'
import { Button, List, Segment } from 'semantic-ui-react'
import { State } from '../../app/store'
import { AbstractComponent } from '../component'
import './cursorBreadcrumb.css'
import './logs.css'


export class Logs extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.logs.length !== this.state.logs.length
  }
  render() {
    return <Segment>
      <Button onCLick={() => this.setState({ logs: [] })}>Clear logs</Button>
      <List className="logsList">
        {this.state.logs.map(l => <List.Item>{l}</List.Item>)}
      </List></Segment>

  }
}
