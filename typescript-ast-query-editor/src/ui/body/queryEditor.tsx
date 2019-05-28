import * as React from 'react'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'
import { Form, TextArea, Button } from 'semantic-ui-react';

export class QueryEditor extends AbstractComponent {
  render() {
    return (
      <Form>
        <TextArea value={this.state.selectedExample.query} onChange={e => {
          this.setState({ selectedExample: { ...this.state.selectedExample, query: (e.target as any).value } })
        }} />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        <Button small onClick={e => executeQuery()}>Inspect Query</Button>
      </Form>
    )
  }
}
