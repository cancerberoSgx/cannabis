import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { installCodeEditor } from '../editor/ts/codeEditor'
import { Body } from './body/body'
import { ForkRibbon } from './common/forkRibbon'
import { loadUrl } from './common/uiUtil'
import { AbstractComponent } from './component'
import { Header } from './header/header'
import { SidebarExampleMultiple } from './header/sidebar'
import './styles.css'

export class App extends AbstractComponent {

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer) // TODO the same as query ed
    setTimeout(() => {
      loadUrl()
    }, 100)
  }

  render() {
    return <Container fluid textAlign="left">
      <Header />
      <SidebarExampleMultiple  >
        <Body activeIndex={this.state.currentTab}/>
      </SidebarExampleMultiple>
      <ForkRibbon />
    </Container>
  }
}
