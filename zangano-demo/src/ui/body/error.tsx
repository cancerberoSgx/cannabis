import * as React from 'react'
import { Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { Space } from '../uiUtil'

export class Error extends AbstractComponent {
  protected contextRef = React.createRef()
  render() {
    return (
      <> {this.state.error ? <Segment raised segment><pre>
        {this.state.error + ''}<Space /><br />
        {((this.state.error.stack || '').split('\n') || []).join('\n')}
      </pre></Segment> : ''}
      </>
    )
  }
}
