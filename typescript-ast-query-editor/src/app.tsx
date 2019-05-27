import { ASTNode } from 'cannabis'
import { shorter, throttle } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import * as React from 'react'
import { getGeneralNodeKindName, isDirectory, isNode, isSourceFile } from 'ts-simple-ast-extra'
import './app.css'
import { getNodesAtPosition, highlightNodesInEditor, installCodeEditor } from './codeEditor'
import { codeExamples, Example } from "./examples"
import { ForkRibbon } from './forkRibbon'
import { getMonacoInstance, setEditorText } from './monaco'
import { executeQuery } from './tsAstqAdapter'
import { State, getStore } from './L';

interface Props {
  examples: Example[]
}

// const state = new StateImpl()



export class AbstractComponent extends React.Component<Props, State>{
  componentDidMount(){
    getStore().add(()=>{
      this.setState({... getStore().getState()})
    })
  }
  constructor(p: Props, s: State) {
    super(p, s)
    this.state = getStore().getState()
  }
}
export class App extends  AbstractComponent{


  constructor(p: Props, s: State) {
    super(p, s)
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
        <div className="flex-item left-panel">
          {this.examples()}
          {this.queryEditor()}
          <Results {...this.props} />
        </div>
        <div className="flex-item right-panel" >
          {this.editorCursorDescription()}
          <div id="editor-container" className="flex-item"></div>
          <div className="trace-panel flex-item" >
            <h3>title</h3>
            Et aute pariatur laboris esse duis laboris. Consectetur laboris ullamco voluptate enim officia incididunt deserunt qui anim proident ut qui ea. Tempor veniam officia eu sit incididunt culpa velit velit irure quis adipisicing eu tempor. Non id mollit labore proident laboris non dolore tempor consectetur mollit. Cupidatat non amet sint id velit veniam occaecat consectetur.

            Labore consectetur velit adipisicing id est adipisicing occaecat nisi occaecat do pariatur. Nisi excepteur excepteur occaecat veniam ut sit veniam laboris ullamco. Ipsum Lorem sit eiusmod esse nostrud aliquip ad excepteur anim.</div>
        </div>
        <ForkRibbon />
      </div>)
  }

  editorCursorDescription(): React.ReactNode {
    return <div className="flex-item cursorDescription">
      Cursor: {this.state.nodesAtPosition && printNode(this.state.nodesAtPosition)} {this.state.nodesAtPosition && getAscendants(this.state.nodesAtPosition).reverse().map(a =>
        <a onClick={e => highlightNodesInEditor([a])}>->{getGeneralNodeKindName(a)}</a>)}
    </div>
  }

  protected onDidChangeCursorPosition(e: monaco.editor.ICursorPositionChangedEvent) {
    this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
  }

  protected examples(): React.ReactNode {
    return (<div>
      <h3>Examples</h3>
      <select onChange={e => {
        const selectedExample = this.props.examples.find(ex => ex.query === e.currentTarget.value)!
        if (selectedExample.code) {
          const code = codeExamples.find(c => c.name === selectedExample.code)
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
      <button className="primary" onClick={e => this.executeQuery()}>Search!</button>
      <button onClick={e => this.traceQuery()}>Trace execution</button>
      <button onClick={e => this.traceQuery()}>Inspect Query</button>
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

  // protected results() {
  //   return <div className="results">
  //     {this.state.result.length ? <div>
  //       <h3>Results</h3>
  //       <ul>
  //         {this.state.result.map((node, i) => <li key={i}
  //         ><a onClick={e => highlightNodesInEditor([node])}>{getGeneralNodeKindName(node)}</a>
  //         </li>)}
  //       </ul>
  //     </div> :
  //       'No results'}
  //     {this.state.error && <div><strong>Error: </strong><br /><pre>
  //       {this.state.error + ''}
  //     </pre></div>}
  //   </div>
  // }
}

class Results extends React.Component<Props, State> {
  constructor(p: Props, s: State) {
    super(p, s)
  }
  render() {
    return <div className="results">
      {this.state.result.length ? <div>
        <h3>Results</h3>
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
function getAscendants(n: ASTNode, andSelf = false) {
  if (isNode(n)) {
    return [n, ...n.getAncestors()]
  }
  else {
    return []
  }
}
function printNode(n: ASTNode) {
  if (isSourceFile(n) || isDirectory(n)) {
    return `${n.getBaseName()} (file)`
  }
  else {
    return `${n.getKindName()} (${shorter(n.getText())})`
  }
}
