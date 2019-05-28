import * as React from 'react'
import { Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import './queryDump.css'

export class QueryDump extends AbstractComponent {
  render() {
    return <Segment className="queryDump" >
      <h3>Query Analysis</h3>
      <pre>
        {this.state.queryDump}
      </pre>
    </Segment>
  }
}
