import * as monaco from 'monaco-editor'
import * as ts from 'typescript'
import * as React from 'react'
import { Example } from "./examples";
import { executeQuery } from './tsAstqAdapter';
import './app.css'
import { throttle, sleep } from 'misc-utils-of-mine-generic'
import { installCodeEditor, highlightNodesInEditor, getNodesAtPosition } from './codeEditor';
import { getMonacoInstance } from './monaco';
import { printNode, getAscendants, getKindName } from 'typescript-ast-util';
import { ForkRibbon } from './forkRibbon';

interface P {
  examples: Example[]
}

interface S {
  selectedExample: Example
  result: ts.Node[]
  error?: Error 
  nodesAtPosition: ts.Node|undefined
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
    const editorContainer = document.getElementById("editor-container")!;
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(this.onDidChangeCursorPosition)
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
        <div>Node at cursor: {this.state.nodesAtPosition && printNode(this.state.nodesAtPosition)}</div>
        <div>{this.state.nodesAtPosition && getAscendants(this.state.nodesAtPosition).reverse().map(a=><a onClick={e=>highlightNodesInEditor([a])}>->{getKindName(a)}</a>)}</div>
        <div id="editor-container"></div>
        </div>
        <ForkRibbon/>
      </div>)
  }

  protected onDidChangeCursorPosition(e: monaco.editor.ICursorPositionChangedEvent) {
    this.setState({nodesAtPosition: getNodesAtPosition(e.position)})
  }

  protected examples(): React.ReactNode {
    return( <div>
      <h2>Examples</h2>
    <select onChange={e => {
      const selectedExample= this.props.examples.find(ex => ex.query === e.currentTarget.value)! 
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
    return (  <div>
      <textarea value={this.state.selectedExample.query} onChange={e => {
    this.setState({ selectedExample: { ...this.state.selectedExample, query: e.target.value } })
    // e.currentTarget.textContent = e.currentTarget.value
    // this.executeQueryThrottled()// { ...this.state.selectedExample, query: e.currentTarget.value } )
    }}></textarea>
    <br />
    <button onClick={e=>this.executeQuery()}>Query</button>
    </div>)
  }

  protected executeQueryThrottled = throttle(this.executeQuery, 2000, { trailing: true }) as (selectedExample?: Example)=>void

  protected executeQuery(selectedExample?: Example) {
    const query = selectedExample &&selectedExample.query||this.state.selectedExample.query
    const r= executeQuery(query);
      if(r.result && r.result.length && !r.error) {
        highlightNodesInEditor(r.result  )
      }
      this.setState({ selectedExample: {...selectedExample || this.state.selectedExample, query}, result: r.result||[], error: r.error });
  }

  protected results() {
    return <div>
      {this.state.result.length ? <ul>
    {this.state.result.map((node, i) => <li key={i}><a onClick={e=>highlightNodesInEditor([node])}>{getKindName(node)}</a></li>)}
    </ul> : 'No results'}
  {this.state.error && <div><strong>Error: </strong><br/><pre>
    {this.state.error+''}
  </pre></div>}
    </div>
  }
}
// * [// ForInStatement && count(//Block)==0]

   