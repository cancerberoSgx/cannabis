import * as React from 'react'
import {array, printMs, randomIntBetween, throttle} from 'misc-utils-of-mine-generic'
import { ForkRibbon } from './forkRibbon';
import { highlightNodesInEditor } from '../../foo';
import { getKindName } from 'ts-simple-ast-extra';

interface P {
  examples: Example[]
}
export interface Example {
  query: string;
  name: string
  description: string;
  code?: string
}
interface S {
  selectedExample: Example
  result: any[]
  error?: Error
  nodesAtPosition: any | undefined
}

export class App extends React.Component<P, S> {

  constructor(p: P, s: S) {
    super(p, s)
    this.state = {
      selectedExample: this.props.examples[0],
      result: [],
      nodesAtPosition: undefined
    }
    this.executeQuery = this.executeQuery.bind(this)
    this.onDidChangeCursorPosition = this.onDidChangeCursorPosition.bind(this)
  }

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
  }

  render() {
    return (
      <div className="flex-container">
        <div className="flex-item">
          {this.examples()}
          {this.queryEditor()}
          {this.results()}
        </div>
        <div className="flex-item" >
          <div>Node at cursor: {this.state.nodesAtPosition && printMs(this.state.nodesAtPosition)}</div>
          <div>{this.state.nodesAtPosition && array(10).reverse().map(a => <a onClick={e =>{}}>->{ }</a>)}</div>
          <div id="editor-container"></div>
        </div>
        <ForkRibbon />
      </div>)
  }

  protected onDidChangeCursorPosition(e: any) {
    this.setState({ nodesAtPosition: randomIntBetween(1,2) })
  }

  protected examples(): React.ReactNode {
    return (<div>
      <h2>Examples</h2>
      <select onChange={e => {
        const selectedExample = this.props.examples.find(ex => ex.query === e.currentTarget.value)!
        // this.setState({ selectedExample })
        // console.log({selectedExample: selectedExample.query});
        this.executeQuery(selectedExample)
      }}>{this.props.examples.map(example =>
        <option value={example.query} key={example.query} >{example.name}</option>
      )}
      </select>
      <blockquote><strong>Example description</strong>: {this.state.selectedExample.description}</blockquote>
    </div>)
  }

  protected queryEditor(): React.ReactNode {
    return (<div>
      <textarea value={this.state.selectedExample.query} onChange={e => {
        this.setState({ selectedExample: { ...this.state.selectedExample, query: e.target.value } })
        // e.currentTarget.textContent = e.currentTarget.value
        // this.executeQueryThrottled()// { ...this.state.selectedExample, query: e.currentTarget.value } )
      }}></textarea>
      <br />
      <button onClick={e => this.executeQuery()}>Query</button>
    </div>)
  }

  protected executeQueryThrottled = throttle(this.executeQuery, 2000, { trailing: true }) as (selectedExample?: Example) => void

  protected executeQuery(selectedExample?: Example) {
    const query = selectedExample && selectedExample.query || this.state.selectedExample.query
    const r = {} as any
    if (r.result && r.result.length && !r.error) {
      highlightNodesInEditor(r.result)
    }
    this.setState({ selectedExample: { ...selectedExample || this.state.selectedExample, query }, result: r.result || [], error: r.error })
  }

  protected results() {
    return <div>
      {this.state.result.length ? <ul>
        {this.state.result.map((node, i) => <li key={i}
        ><a onClick={e => highlightNodesInEditor([node])}>{getKindName(node)}</a>
        </li>)}
      </ul> : 'No results'}
      {this.state.error && <div><strong>Error: </strong><br /><pre>
        {this.state.error + ''}
      </pre></div>}
    </div>
  }
}

