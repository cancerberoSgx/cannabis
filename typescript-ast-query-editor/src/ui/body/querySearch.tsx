import * as React from 'react'
import { Button } from 'semantic-ui-react'
import { debug } from '../../app/dispatchers'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'
import { QueryEditor } from './queryEditor'

export class QuerySearch extends AbstractComponent {

  render() {
    debug('QuerySearch render')
    return (
      < >
        {/* <TextArea rows={5} style={{ width: '100%' }} value={this.state.selectedExample.query} onChange={(e, props) => {
          if (this.state.selectedExample) {
            this.setState({ selectedExample: { ...this.state.selectedExample, query: (props.value + '') } })
          }
        }} /> */}
        <br />
        <QueryEditor />
        <br />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        <Button small onClick={e => executeQuery()}>Inspect Query</Button>
        <br />
      </>
    )
  }
}
