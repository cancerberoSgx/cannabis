import * as React from 'react'
import { Button, TextArea } from 'semantic-ui-react'
import { debug } from '../../app/dispatchers'
import { State } from '../../app/store'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'

export class QueryEditor extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.selectedExample.query !== this.state.selectedExample.query
  }
  render() {
    debug('queryEditor render')
    return (
      < >
        <TextArea rows={5} style={{ width: '100%' }} value={this.state.selectedExample.query} onChange={(e, props) => {
          if (this.state.selectedExample) {
            this.setState({ selectedExample: { ...this.state.selectedExample, query: (props.value + '') } })
          }
        }} />
        <br />
        <div id="query-editor-container" style={{ height: '100vh', maxHeight: '40vh', margin: 0, padding: 0 , width: '100%'}}></div>
                <br />
        <br />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        <Button small onClick={e => executeQuery()}>Inspect Query</Button>
        <br />
      </>
    )
  }
}
