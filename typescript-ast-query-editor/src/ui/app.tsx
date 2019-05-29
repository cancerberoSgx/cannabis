import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { getNodeAtPosition, installCodeEditor } from '../editor/codeEditor'
import { getMonacoInstance } from '../editor/monaco'
import { Body } from './body/body'
import { AbstractComponent } from './component'
import { ForkRibbon } from './forkRibbon'
import { Header } from './header/header'
import { SidebarExampleMultiple } from './header/sidebar'

export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e => {
      this.setState({
        nodeAtPosition: getNodeAtPosition(e.position)
      })
    })
  }

  render() {
    return <Container fluid textAlign="left">
      <Header />
      <SidebarExampleMultiple  >
        <Body />
      </SidebarExampleMultiple>
      <ForkRibbon />
    </Container>
  }
}
