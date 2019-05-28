import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { MyBody } from './body'
import { MyHeader } from './header'
import { SidebarExampleMultiple } from './sidebar'
import { installCodeEditor, getNodesAtPosition } from '../editor/codeEditor';
import { getMonacoInstance } from '../editor/monaco';
import { Emitter } from 'misc-utils-of-mine-generic';
import { StatefulEmitter } from '../util';
import { AbstractComponent } from '../ui/component';

// export interface PassBooleanFunction{ 
// }
// class EmitterCOmponent extends 
export class App extends AbstractComponent   {
  // protected sideBarVisibilty = new  StatefulEmitter<boolean>(false)

  // constructor(p: {}, s: {}) {
  //   super(p, s)
  //   this.state  = { visible: false }
  //   // this.setVisible = this.setVisible.bind(this)
  //   // this.props.addHSetCVisibleListener(listener=>this.setVisible = this.setVisible)
  // }

  componentDidMount() {
    const editorContainer = document.getElementById("editor-container")!
    installCodeEditor(editorContainer)
    getMonacoInstance()!.onDidChangeCursorPosition(e => {
      this.setState({ nodesAtPosition: getNodesAtPosition(e.position) })
    })
  }
  // state = {visible: false}
  render(){
    return <Container fluid textAlign="left">
    <MyHeader/>
    
    <SidebarExampleMultiple  >
      <MyBody />
    </SidebarExampleMultiple>
  </Container>
  }
}
