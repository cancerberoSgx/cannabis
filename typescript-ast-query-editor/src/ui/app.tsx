import { ASTNode } from 'cannabis'
import { shorter, throttle } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import * as React from 'react'
import { isDirectory, isNode, isSourceFile } from 'ts-simple-ast-extra'
import { getNodesAtPosition, installCodeEditor } from '../editor/codeEditor'
import { getMonacoInstance } from '../editor/monaco'
import { State } from '../store'
import './app.css'
import { ForkRibbon } from './forkRibbon'
import { Examples } from './examples';
import { AbstractComponent } from './component';
import { EditorCursorDetails } from './editorCursorDetails';
import { QueryEditor } from './queryEditor';
import { Results } from './results';

export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e=>{
      this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
    })
  }

  render() {
    return (
      <div className="flex-container">
        <div className="flex-item left-panel">
          <Examples></Examples>
          <QueryEditor/>
          <Results />
        </div>
        <div className="flex-item right-panel" >
         <EditorCursorDetails/>>
          <div id="editor-container" className="flex-item"></div>
          <div className="trace-panel flex-item" >
            <h3>title</h3>
            Et aute pariatur laboris esse duis laboris. Consectetur laboris ullamco voluptate enim officia incididunt deserunt qui anim proident ut qui ea. Tempor veniam officia eu sit incididunt culpa velit velit irure quis adipisicing eu tempor. Non id mollit labore proident laboris non dolore tempor consectetur mollit. Cupidatat non amet sint id velit veniam occaecat consectetur.

            Labore consectetur velit adipisicing id est adipisicing occaecat nisi occaecat do pariatur. Nisi excepteur excepteur occaecat veniam ut sit veniam laboris ullamco. Ipsum Lorem sit eiusmod esse nostrud aliquip ad excepteur anim.</div>
        </div>
        <ForkRibbon />
      </div>)
  }
}


