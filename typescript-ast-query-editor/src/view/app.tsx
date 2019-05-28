import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { getNodesAtPosition, installCodeEditor } from '../editor/codeEditor'
import { getMonacoInstance } from '../editor/monaco'
import { AbstractComponent } from '../ui/component'
import { MyBody } from './body'
import { MyHeader } from './header'
import { SidebarExampleMultiple } from './sidebar'

// export interface PassBooleanFunction{ 
// }
// class EmitterCOmponent extends 
export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e => {
      this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
    })
  }
  render() {
    return <Container fluid textAlign="left">
      <MyHeader />

      <SidebarExampleMultiple  >
        <MyBody />
      </SidebarExampleMultiple>
    </Container>
  }
}
