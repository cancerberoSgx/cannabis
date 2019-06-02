import { ASTYNode, QueryExpressions } from 'cannabis'
import { ISelection } from 'monaco-editor'
import * as React from 'react'
import { Button, Checkbox, Header, Label, List, Segment } from 'semantic-ui-react'
import { select, setCodeEditorText } from '../../editor/ts/codeEditor'
import { AbstractComponent } from '../component'
import { Space } from '../common/uiUtil'

export class QueryAst extends AbstractComponent {
  componentWillMount() {
    setCodeEditorText(this.state.selectedExample.query)
    this.forceUpdate()
  }
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
      <Segment className="queryDump" basic>
        <Header as="h3">Textual Representation</Header>
        <pre>
          {this.state.queryDump}
        </pre>
      </Segment>
    </Segment>
  }
  renderNode(node: ASTYNode) {
    return (<List.Item onClick={e => {
      e.stopPropagation()
      const selection: ISelection = { selectionStartColumn: node.pos().column, selectionStartLineNumber: node.pos().line, positionColumn: node.pos().column + (node.pos().offset || 1), positionLineNumber: node.pos().line }
      select([selection])
    }}>
      {/* <List.Icon icon="leaf" /> */}
      <List.Icon name={iconForQueryNodeKind(node.type())} />
      <List.Content>
        <List.Header as="a" >
          {node.type()}
        </List.Header>
        {node.attrs().length ? <List.Description>
          {node.attrs().map(a => <><Label>{a}</Label>: <code>{node.get(a)}</code></>)}
        </List.Description> : <></>}
        {node.childs().length ? <List.List>{node.childs().map(c => this.renderNode(c))}</List.List> : <></>}
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
