import { ASTNode } from 'cannabis'
import { shorter, throttle } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import * as React from 'react'
import { getGeneralNodeKindName, isDirectory, isNode, isSourceFile } from 'ts-simple-ast-extra'
import { getNodesAtPosition, highlightNodesInEditor, installCodeEditor } from '../editor/codeEditor'
import { Example } from "../editor/examples"
import { getMonacoInstance } from '../editor/monaco'
import { getStore, State } from '../store'
import { executeQuery as executeQuery2 } from '../tsAstqAdapter'
import './app.css'
import { ForkRibbon } from './forkRibbon'
import { Examples } from './examples';
import { AbstractComponent } from './component';

export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e=>this.onDidChangeCursorPosition(e))
  }

  render() {
    return (
      <div className="flex-container">
        <div className="flex-item left-panel">
          <Examples></Examples>
          {this.queryEditor()}
          <Results />
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


  protected queryEditor(): React.ReactNode {
    return (<div>
      <textarea value={this.state.selectedExample.query} onChange={e => {
        this.setState({ selectedExample: { ...this.state.selectedExample, query: e.target.value } })
      }}></textarea>
      <br />
      <button className="primary" onClick={e => executeQuery()}>Search!</button>
      <button onClick={e => this.traceQuery()}>Trace execution</button>
      <button onClick={e => this.traceQuery()}>Inspect Query</button>
    </div>)
  }
  protected traceQuery(): void {
    // const q = this.state.selectedExample.query
  }

  protected executeQueryThrottled = throttle(executeQuery, 2000, { trailing: true }) as (selectedExample?: Example) => void

}

class Results extends AbstractComponent {
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
export function executeQuery(selectedExample?: Example) {
  const state = getStore().getState()
  const query = selectedExample && selectedExample.query || state.selectedExample.query
  const r = executeQuery2(query)
  if (r.result && r.result.length && !r.error) {
    highlightNodesInEditor(r.result)
  }
  getStore().setState({ selectedExample: { ...selectedExample || state.selectedExample, query }, result: r.result || [], error: r.error })
} 
