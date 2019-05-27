import * as React from 'react'
import { getNodesAtPosition, installCodeEditor } from '../editor/codeEditor'
import { getMonacoInstance } from '../editor/monaco'
import './app.css'
import { AbstractComponent } from './component'
import { EditorCursorDetails } from './editorCursorDetails'
import { Examples } from './examples'
import { ForkRibbon } from './forkRibbon'
import { QueryEditor } from './queryEditor'
import { Results } from './results'
import { Header } from './header';

export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e => {
      this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
    })
  }

  render() {
    return (
      <div className="flex-container">
        <Header/>
        <div className="flex-item left-panel">
          <Examples></Examples>
          <QueryEditor />
          <Results />
        </div>
        <div className="flex-item right-panel" >
          <EditorCursorDetails />>
          <div id="editor-container" className="flex-item"></div>
          <div className="trace-panel flex-item" >
            <pre className="trace-text">
              {this.state.queryTraceText}
            </pre>
          </div>
          <ForkRibbon />
        </div>
      </div>
    )
  }
}


