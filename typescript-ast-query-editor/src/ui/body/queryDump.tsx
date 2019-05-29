import * as React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import './queryDump.css'

export class QueryDump extends AbstractComponent {
  render() {
    return <Segment className="queryDump" bas>
      <Header as="h3">Query Analysis</Header>
      <pre>
        {this.state.queryDump}
      </pre>
    </Segment>
  }
}
