import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import './styles.css'
import { Container } from 'semantic-ui-react'
import { installCodeEditor } from '../editor/ts/codeEditor'
import { Body } from './body/body'
import { AbstractComponent } from './component'
import { ForkRibbon } from './common/forkRibbon'
import { Header } from './header/header'
import { SidebarExampleMultiple } from './header/sidebar'
import { installQueryEditor } from '../editor/query/queryEditor';

export class App extends AbstractComponent {

  componentDidMount() {
    // const queryEditorContainer = document.getElementById("query-editor-container")!
    // installQueryEditor('// Identifier [@text ≠~ "Cool"]', queryEditorContainer)
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
   

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
