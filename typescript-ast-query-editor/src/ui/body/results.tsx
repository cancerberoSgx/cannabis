import { getASTNodeName, getASTNodeText } from 'cannabis'
import { shorter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Icon, Label, List, Segment } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'
import { iconForNodeKind, Space } from '../uiUtil'

interface I { }
export class Results extends AbstractComponent {
  render() {
    if (this.state.error) {
      <Segment>
        <strong>Error! </strong><br />
        <pre>
          {this.state.error + ''}
        </pre>
      </Segment>
    }
    if (!this.state.result || !this.state.result.length) {
      return <Segment>
        <strong>No results.</strong>
      </Segment>
    }
    return <Segment className="results">
      <h3>Results</h3>
      <List>
        {this.state.result.map((node, i) =>
          <List.Item as='a' key={i} onClick={e => highlightNodesInEditor([node])}>
            <List.Content>
              <List.Header>
                <Icon name={iconForNodeKind(getGeneralNodeKindName(node) || '')} />
                {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''} <Space />
                {getGeneralNodeKindName(node)}
              </List.Header>
              <List.Description >
                <code>{shorter(getASTNodeText(node), 100)}</code>
              </List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  }
}
