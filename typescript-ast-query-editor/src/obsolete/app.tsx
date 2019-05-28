// import * as React from 'react'
// import { getNodesAtPosition, installCodeEditor } from '../editor/codeEditor'
// import { getMonacoInstance } from '../editor/monaco'
// import './app.css'
// import { AbstractComponent } from '../ui/component'
// import { EditorCursorDetails } from '../ui/editorCursorDetails'
// import { Examples } from '../ui/examples'
// import { ForkRibbon } from '../ui/forkRibbon'
// import { Header } from './header'
// import { QueryEditor } from '../ui/queryEditor'
// import { Results } from '../ui/results'

// export class App extends AbstractComponent {

//   componentDidMount() {
//     const editorContainer = document.getElementById("editor-container")!
//     installCodeEditor(editorContainer)
//     getMonacoInstance()!.onDidChangeCursorPosition(e => {
//       this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
//     })
//   }

//   render() {
//     return (
//       <div className="flex-container">
//         <Header />
//         <div className="flex-item left-panel">
//           <Examples></Examples>
//           <QueryEditor />
//           <Results />
//         </div>
//         <div className="flex-item right-panel" >
//           <EditorCursorDetails />>
//           <div id="editor-container" className="flex-item"></div>
//           <div className="trace-panel flex-item" >
//             <pre className="trace-text">
//               {this.state.queryTraceText}
//             </pre>
//           </div>
//         </div>
//         <ForkRibbon />
//       </div>
//     )
//   }
// }


