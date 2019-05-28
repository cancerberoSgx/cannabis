import * as React from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'

export class QueryEditor extends AbstractComponent {
  render() {
    return (
      <Form>
        <TextArea rows={8} value={this.state.selectedExample.query} onChange={e => {
          this.setState({ selectedExample: { ...this.state.selectedExample, query: (e.target as any).value } })
        }} />
        <br />
        <br />
        <Button small primary onClick={e => executeQuery()}>Search!</Button>
        <Button small onClick={e => executeQuery()}>Trace Execution</Button>
        <Button small onClick={e => executeQuery()}>Inspect Query</Button>
      </Form>
    )
  }
}
