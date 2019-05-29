import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon, List, Label, Segment, Button } from 'semantic-ui-react'
import { getGeneralNodeKindName, tsMorph, isNode } from 'ts-simple-ast-extra'
import { getASTNodeKindName, ASTNode, getASTNodeName, getASTNodeChildren, createSourceFile, getASTNodeText } from 'cannabis'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent, AbstractProps } from '../component'
import { getAscendants, iconForNodeKind, Space } from '../uiUtil'
import './cursorBreadcrumb.css'
import { getEditorText } from '../../editor/monaco';
import { shorter } from 'misc-utils-of-mine-generic';
import './logs.css'
import { State  } from '../../app/store';


export class Logs extends AbstractComponent {
  // protected shouldUpdateIfStateChange(p: StateChange ){
  //   return p.oldState.logs.length!==p.newState.logs.length
  // }  
  shouldComponentUpdate(nextProps:any, nextState: Readonly<State>, nextContext: any){
    return nextState.logs.length!==this.state.logs.length
  }
  render() {
    return <Segment>
      <Button onCLick={()=>this.setState({logs: []})}>Clear logs</Button>
      <List className="logsList">
    {this.state.logs.map(l=><List.Item>{l}</List.Item>)}
    </List></Segment>

}
}
