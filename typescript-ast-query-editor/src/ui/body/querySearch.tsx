import * as React from 'react'
import { Button } from 'semantic-ui-react'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'
import { QueryEditor } from './queryEditor'

export class QuerySearch extends AbstractComponent {
  render() {
    return (
      < >
        <QueryEditor />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        {/* <Button small onClick={e => executeQuery()}>Inspect Query</Button> */}
        <textarea value={this.state.queryLogs.join(', ')} style={{ width: '100%', height: '30px' }}></textarea>
      </>
    )
  }
}
