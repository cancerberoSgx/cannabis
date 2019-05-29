import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon, List, Label, Segment, Checkbox, Button } from 'semantic-ui-react'
import { getGeneralNodeKindName, tsMorph, isNode } from 'ts-simple-ast-extra'
import { getASTNodeKindName, ASTNode, getASTNodeName, getASTNodeChildren, createSourceFile, getASTNodeText } from 'cannabis'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent, AbstractProps } from '../component'
import { getAscendants, iconForNodeKind, Space } from '../uiUtil'
import './cursorBreadcrumb.css'
import { getEditorText } from '../../editor/monaco';
import { shorter } from 'misc-utils-of-mine-generic';
import { debug } from '../../app/dispatchers';
import { State } from '../../app/store';

interface P extends AbstractProps {
  node?: ASTNode
}

export class Ast extends AbstractComponent<P> {
  componentWillMount(){
    this.forceUpdate()
  } 

  shouldComponentUpdate(nextProps:any, nextState: Readonly<State>, nextContext: any){
    return nextState.currentEditorAst!==this.state.currentEditorAst && this.state.astAutoUpdate ||  nextState.astAutoUpdate!==this.state.astAutoUpdate 
  }

  render() {
    let node: tsMorph.Node = this.props.node as tsMorph.Node
    if (!node) {
      node = this.state.currentEditorAst
    }
    return <Segment basic>
    <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props)=>{
      this.setState({astAutoUpdate: props.checked})
    }}></Checkbox>
    <Space/>
    {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e=> this.forceUpdate()}>Update</Button>}
    <List>
    {this.renderNode(node)}
    </List>
    </Segment>
  }
  renderNode(node: tsMorph.Node) {
    const children = getASTNodeChildren(node)
    return (<List.Item onClick={e => highlightNodesInEditor([node])}>
      <List.Icon name={iconForNodeKind(node.getKindName())} />
      <List.Content>
        <List.Header as="a">{getGeneralNodeKindName(node)} {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''}
        </List.Header>
        <List.Description>
          {getASTNodeName(node) ? <><Label size="small"><strong>{getASTNodeName(node)}</strong></Label><Space /></> : ''}
          "<code>{shorter(getASTNodeText(node), 100)}</code>"
  </List.Description>
        {children.length ? <List.List>{children.filter(isNode).map(c => this.renderNode(c))}</List.List> : <></>}
      </List.Content>
    </List.Item>)
  }
}
