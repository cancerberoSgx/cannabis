import * as React from 'react'
import { Button, Form as Segment, TextArea } from 'semantic-ui-react'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'
import { debug } from '../../app/dispatchers';

export class QueryEditor extends AbstractComponent {
  render() {
    debug('queryEditor render')    
    return (
      <Segment basic>
        <TextArea rows={8} value={this.state.selectedExample ? this.state.selectedExample.query: ''} onChange={(e, props) => {
          if(this.state.selectedExample){
            this.setState({ selectedExample: { ...this.state.selectedExample, query: (props.value+'') } })
          }
        }} />
        <br />
        <br />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        <Button small onClick={e => executeQuery()}>Inspect Query</Button>
      </Segment>
    )
  }
}