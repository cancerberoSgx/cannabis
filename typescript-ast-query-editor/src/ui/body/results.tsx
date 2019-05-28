import * as React from 'react'
import { Segment, List, Icon, Label } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'
import { getASTNodeKindName, getASTNodeText, getASTNodeName } from 'cannabis';
import { shorter } from 'misc-utils-of-mine-generic';
import { iconForNodeKind, Space } from '../uiUtil';

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
                {getASTNodeName(node) ?  <Label size="small"><strong>{getASTNodeName(node)}</strong></Label>: ''} <Space/>
                {getGeneralNodeKindName(node)}
                </List.Header>
              <List.Description >
                "<code><FixedHeight>{shorter(getASTNodeText(node), 100)}</FixedHeight></code>"
              </List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  }
}

const FixedHeight = (props: {height?: string, children: string} = {height:'0.7em', children: ''}) => (
  <span style={{ maxHeight: props.height||'0.7em', overflow: 'hidden' }}>{ props.children}</span>
)