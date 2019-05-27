import { throttle, shorter } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import * as React from 'react'
import './app.css'
import { getNodesAtPosition, highlightNodesInEditor, installCodeEditor } from './codeEditor'
import { Example, codeExamples } from "./examples"
import { ForkRibbon } from './forkRibbon'
import { getMonacoInstance, setEditorText } from './monaco'
import { queryAst, ASTNode } from 'cannabis'
import { executeQuery } from './tsAstqAdapter';
import { isNode, isSourceFile, isDirectory, tsMorph } from 'ts-simple-ast-extra';
import { getGeneralNodeKindName } from 'ts-simple-ast-extra';

interface P {
  examples: Example[]
}

interface S {
  selectedExample: Example
  result: tsMorph.Node[]
  error?: Error
  nodesAtPosition: tsMorph.Node | undefined
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
          <div>{this.state.nodesAtPosition && getAscendants(this.state.nodesAtPosition).reverse().map(a => 
          <a onClick={e => highlightNodesInEditor([a])}>->{getGeneralNodeKindName(a)}</a>)}</div>
          <div id="editor-container"></div>
        </div>
        <ForkRibbon />
      </div>)
  }

  protected onDidChangeCursorPosition(e: monaco.editor.ICursorPositionChangedEvent) {
    this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
  }

  protected examples(): React.ReactNode {
    return (<div>
      <h2>Examples</h2>
      <select onChange={e => {
        const selectedExample = this.props.examples.find(ex => ex.query === e.currentTarget.value)!
        if(selectedExample.code){
          const code = codeExamples.find(c=>c.name===selectedExample.code)
          code && setEditorText(code.content)
        }
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
      }}></textarea>
      <br />
      <button onClick={e => this.executeQuery()}>Query</button>
      <button onClick={e => this.traceQuery()}>Trace</button>
    </div>)
  }
  protected traceQuery(): void {
    // const q = this.state.selectedExample.query
  }

  protected executeQueryThrottled = throttle(this.executeQuery, 2000, { trailing: true }) as (selectedExample?: Example) => void

  protected executeQuery(selectedExample?: Example) {
    const query = selectedExample && selectedExample.query || this.state.selectedExample.query
    const r = executeQuery(query)
    if (r.result && r.result.length && !r.error) {
      highlightNodesInEditor(r.result)
    }
    this.setState({ selectedExample: { ...selectedExample || this.state.selectedExample, query }, result: r.result || [], error: r.error })
  }

  protected results() {
    return <div>
      {this.state.result.length ? <div>
        <h4>Results</h4>
      <ul>
      {this.state.result.map((node, i) => <li key={i}
      ><a onClick={e => highlightNodesInEditor([node])}>{getGeneralNodeKindName(node)}</a>
      </li>)}
      </ul>
      </div> : 
      'No results'}
      {this.state.error && <div><strong>Error: </strong><br /><pre>
        {this.state.error + ''}
      </pre></div>}
    </div>
  }
}

function getAscendants(n: ASTNode) {
  if(isNode(n)){
    return n.getAncestors()
  }
  else {
    return []
  }
}
function printNode(n: ASTNode){
  if(isSourceFile(n)||isDirectory(n)){
    return `${n.getBaseName()} (file)`
  }
  else {
    return  `${n.getKindName()} (${shorter(n.getText())})`
    }
}