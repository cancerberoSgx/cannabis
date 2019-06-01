import { ASTNode, getASTNodeChildren, getASTNodeKindName, getASTNodeName, getASTNodeText, tsMorph } from 'cannabis';
import { shorter } from 'misc-utils-of-mine-generic';
import * as React from 'react';
import { Button, Checkbox, Label, List, Segment } from 'semantic-ui-react';
import { State } from '../../app/store';
import { highlightNodesInEditor } from '../../editor/codeEditor';
import { GetChildrenMode } from '../common/getChildrenMode';
import { AbstractComponent, AbstractProps } from '../component';
import { iconForNodeKind, Space } from '../uiUtil';

interface P extends AbstractProps {
  node?: ASTNode
}

export class Ast extends AbstractComponent<P> {
  componentWillMount() {
    this.forceUpdate()
  }

  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentEditorAst !== this.state.currentEditorAst && this.state.astAutoUpdate || nextState.astAutoUpdate !== this.state.astAutoUpdate || nextState.getChildren !== this.state.getChildren || nextState.astShowText !== this.state.astShowText
  }

  render() {
    let node: tsMorph.Node = this.props.node as tsMorph.Node
    if (!node) {
      node = this.state.currentEditorAst
    }
    return <>
      <GetChildrenMode />
      <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props) => {
        this.setState({ astAutoUpdate: !!props.checked })
      }}></Checkbox>
      <Space />
      {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e => this.forceUpdate()}>Update</Button>}
      <Checkbox defaultChecked={this.state.astShowText} label="Show Text" onChange={(e, props) => {
        this.setState({ astShowText: !!props.checked })
      }}></Checkbox>
      <List className="astTree">
        {this.renderNode(node)}
      </List>
    </>
  }

  renderNode(node: tsMorph.Node) {
    const children = getASTNodeChildren(node, this.state.getChildren)
    return (<List.Item onClick={e => {
      e.stopPropagation()
      highlightNodesInEditor([node])
    }}>
      <List.Icon name={iconForNodeKind(node.getKindName())} />
      <List.Content>
        <List.Header as="a">{getASTNodeKindName(node)} {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''}
        </List.Header>
        <List.Description>
        {this.state.astShowText ? 
        (<> <code>{shorter(getASTNodeText(node), 100)}</code>}</>) : ''}
  </List.Description>
        {children.length ? <List.List>{children.filter(tsMorph.TypeGuards.isNode).map(c => this.renderNode(c))}</List.List> : <></>}
      </List.Content>
    </List.Item>)
  }
}
