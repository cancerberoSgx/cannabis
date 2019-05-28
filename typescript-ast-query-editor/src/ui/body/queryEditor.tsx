import * as React from 'react'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from '../component'

export class QueryEditor extends AbstractComponent {
  render() {
    return (<div>
      <textarea value={this.state.selectedExample.query} onChange={e => {
        this.setState({ selectedExample: { ...this.state.selectedExample, query: e.target.value } })
      }}></textarea>
      <br />
      <button className="primary" onClick={e => executeQuery()}>Search!</button>
      <button onClick={e => { }}>Trace execution</button>
      <button onClick={e => { }}>Inspect Query</button>
    </div>)
  }
}
