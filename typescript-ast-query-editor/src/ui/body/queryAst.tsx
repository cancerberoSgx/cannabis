import { ASTYNode } from 'astq'
import * as React from 'react'
import { Button, Checkbox, Header, Label, List, Segment } from 'semantic-ui-react'
import { setEditorText } from '../../editor/monaco'
import { AbstractComponent } from '../component'
import { Space } from '../uiUtil'

export class QueryAst extends AbstractComponent {
  componentWillMount() {
    setEditorText(this.state.selectedExample.query)
    this.forceUpdate()
  }
  render() {
    return <Segment basic>
      <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props) => {
        this.setState({ astAutoUpdate: props.checked })
      }} />
      <Space />
      {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e => this.forceUpdate()}>Update</Button>}
      <List>
        {this.renderNode(this.state.queryAst)}
      </List>
      <Segment className="queryDump" basic>
        <Header as="h3">Query Analysis</Header>
        <pre>
          {this.state.queryDump}
        </pre>
      </Segment>
    </Segment>
  }
  renderNode(node: ASTYNode) {
    return (<List.Item onClick={e => { }}>
      <List.Icon icon="home" />
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
