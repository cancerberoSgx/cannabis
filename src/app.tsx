import * as ts from 'typescript'
import * as React from 'react'
import { Example } from "./examples";
import { executeQuery } from './tsAstqAdapter';
import { getKindName } from './tsUtil';
import './app.css'

interface P {
  examples: Example[];
}

interface S {
  selectedExample: Example
  result: ts.Node[]
}

export class App extends React.Component<P, S> {
  constructor(p: P, s: S) {
    super(p, s)
    this.state = {
      selectedExample: this.props.examples[0],
      result: []
    }
  }
  render() {
    return (
    <div  className="flex-container">
      <div className="flex-item">
        <h2>
          Examples
        </h2>

      <select onChange={e => {
      this.setState({ selectedExample: this.props.examples.find(ex => ex.query === e.currentTarget.selectedOptions[0].value)! });
      }}>{this.props.examples.map(example =>
      <option value={example.query} key={example.query} selected={example.query === this.state.selectedExample.query}>{example.query}</option>
      )}
      </select>

      <blockquote><strong>Example description</strong>: {this.state.selectedExample.description}</blockquote>

      <button onClick={e => {
        const result = executeQuery(this.state.selectedExample.query)
        this.setState({ result })
      }}>Query</button>   

      <ul>
        {this.state.result.map(node => <li>{getKindName(node)}</li>)}
      </ul>
      </div>

      <div className="flex-item" id="editor-container"></div>

    </div>);
  }
}
