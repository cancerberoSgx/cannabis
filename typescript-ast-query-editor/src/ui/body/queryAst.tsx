import { ASTYNode, QueryExpressions } from 'cannabis'
import { ISelection } from 'monaco-editor'
import * as React from 'react'
import { Button, Checkbox, Label, List, Segment } from 'semantic-ui-react'
import { select } from '../../editor/query/queryEditor'
import { Space } from '../common/uiUtil'
import { AbstractComponent } from '../component'

export class QueryAst extends AbstractComponent {
  render() {
    return <Segment basic>
      <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props) => {
        this.setState({ astAutoUpdate: !!props.checked })
      }} />
      <Space />
      {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e => this.forceUpdate()}>Update</Button>}
      <List>
        {this.renderNode(this.state.queryAst)}
      </List>

    </Segment>
  }
  renderNode(node: ASTYNode) {
    const expanded = node.childs().length === 0 || !this.state.queryAstCollapsedNodes.includes(node)
    return (<List.Item onClick={e => {
      e.stopPropagation()
      const selection: ISelection = {
        selectionStartColumn: node.pos().column,
        selectionStartLineNumber: node.pos().line,
        positionColumn: node.pos().column + (node.pos().offset || 1),
        positionLineNumber: node.pos().line
      }
      select([selection])
    }}>

      <List.Content>
        <List.Header as="a" >
          <span onClick={e => {
            e.stopPropagation()
            if (expanded) {
              // this.state.queryAstCollapsedNodes.push(node)
              this.setState({ queryAstCollapsedNodes: [...this.state.queryAstCollapsedNodes, node] })

            } else {
              this.setState({ queryAstCollapsedNodes: this.state.queryAstCollapsedNodes.filter(n => n !== node) })
              // this.state.queryAstCollapsedNodes.splice( this.state.queryAstCollapsedNodes.indexOf(node), 1)
            }
            // debugger;
            // setObjectProperty(node, 'treeNodeExpanded', !expanded)

          }}><List.Icon name={expanded ? 'minus' : 'plus'} />
            <List.Icon name={iconForQueryNodeKind(node.type())} />
          </span>
          {node.type()}
        </List.Header>

        {node.attrs().length ? <List.Description>
          {node.attrs().map(a => <><Label>{a}</Label>: <code>{node.get(a)}</code></>)}
        </List.Description> : <></>}
        {expanded ? <List.List>{node.childs().map(c => this.renderNode(c))}</List.List> : <></>}
      </List.Content>
    </List.Item>)
  }
}
export function iconForQueryNodeKind(k: QueryExpressions) {
  if (['Axis'].includes(k)) {
    return 'chart line'
  }
  else if (['Step'].includes(k)) {
    return 'puzzle piece'
  }
  else if (['Filter'].includes(k)) {
    return 'filter'
  }
  else if (['Path'].includes(k)) {
    return 'fork'
  }
  else if (['Match'].includes(k)) {
    return 'magic'
  }
  else if (['Logical', 'Relational'].includes(k)) {
    return 'cog'
  }
  else if (['Attribute'].includes(k)) {
    return 'cube'
  }
  else if (['LiteralString', 'LiteralRegExp', 'LiteralNumber', 'LiteralValue'].includes(k)) {
    return 'leaf'
  }
  else if (['FuncCall'].includes(k)) {
    return 'bolt'
  }
  else if (['Query'].includes(k)) {
    return 'search'
  }
  else {
    return 'arrow alternate circle up outline'
  }
}
