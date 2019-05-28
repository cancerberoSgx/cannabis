import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { getNodesAtPosition, installCodeEditor } from '../editor/codeEditor'
import { getMonacoInstance } from '../editor/monaco'
import { AbstractComponent } from './component'
import { Body } from './body/body'
import { MyHeader } from './header/header'
import { SidebarExampleMultiple } from './header/sidebar'
import './styles.css'

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
        <Body />
      </SidebarExampleMultiple>
    </Container>
  }
}
