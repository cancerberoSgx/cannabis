import { getASTNodeChildren, getASTNodeKindName, getASTNodeName, getASTNodeText, tsMorph } from 'cannabis'
import { shorter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Button, Checkbox, Label, List } from 'semantic-ui-react'
import { State } from "../../app/state"
import { highlightNodesInEditor } from '../../editor/ts/codeEditor'
import { GetChildrenMode } from '../common/getChildrenMode'
import { iconForNodeKind, Space } from '../common/uiUtil'
import { AbstractComponent } from '../component'

export class Ast extends AbstractComponent {
  componentWillMount() {
    this.forceUpdate()
  }

  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentEditorAst !== this.state.currentEditorAst && this.state.astAutoUpdate ||
      nextState.astAutoUpdate !== this.state.astAutoUpdate ||
      nextState.getChildren !== this.state.getChildren ||
      nextState.astShowText !== this.state.astShowText ||
      nextState.currentEditorAstCollapsedNodes.length !== this.state.currentEditorAstCollapsedNodes.length
  }

  render() {
    let node = this.state.currentEditorAst
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
    const expanded = children.length === 0 || !this.state.currentEditorAstCollapsedNodes.includes(node)
    return (<List.Item onClick={e => {
      // debugger;
      e.stopPropagation()
      highlightNodesInEditor([node])
    }}>

      <List.Content>
        <List.Header as="a">
          <span onClick={e => {
            e.stopPropagation()
            if (expanded) {
              // this.state.queryAstCollapsedNodes.push(node)
              this.setState({ currentEditorAstCollapsedNodes: [...this.state.currentEditorAstCollapsedNodes, node] })

            } else {
              this.setState({ currentEditorAstCollapsedNodes: this.state.currentEditorAstCollapsedNodes.filter(n => n !== node) })
              // this.state.queryAstCollapsedNodes.splice( this.state.queryAstCollapsedNodes.indexOf(node), 1)
            }

            // if(expanded){
            //   this.state.currentEditorAstCollapsedNodes.push(node)
            // }else {
            //   this.state.currentEditorAstCollapsedNodes.splice( this.state.currentEditorAstCollapsedNodes.indexOf(node), 1)
            // }
            // debugger;
            // setObjectProperty(node, 'treeNodeExpanded', !expanded)
            // this.setState({currentEditorAstCollapsedNodes:this.state.currentEditorAstCollapsedNodes}) 
          }}><List.Icon name={expanded ? 'minus' : 'plus'} />
            <List.Icon name={iconForNodeKind(node.getKindName())} />

          </span>
          {getASTNodeKindName(node)} {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''}
        </List.Header>
        <List.Description>
          {this.state.astShowText ?
            (<> <code>{shorter(getASTNodeText(node), 100)}</code>}</>) : ''}
        </List.Description>
        {expanded ? <List.List>{children.filter(tsMorph.TypeGuards.isNode).map(c => this.renderNode(c))}</List.List> : <></>}
      </List.Content>
    </List.Item>)
  }
}
