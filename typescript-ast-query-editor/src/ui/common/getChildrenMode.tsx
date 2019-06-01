import * as React from 'react';
import { Checkbox, Icon, Button, Modal, Menu, List, ListHeader } from 'semantic-ui-react';
import { AbstractComponent } from '../component';
import { listenerCount } from 'cluster';

export class GetChildrenMode extends AbstractComponent {
  render() {
    return <><Checkbox checked={this.state.getChildren} label="getChildren mode" onChange={(e, props) => {
      this.setState({ getChildren: !!props.checked })
    }}></Checkbox>
      <Modal trigger={<Button icon="help" circular basic size="mini"></Button>}>
              <Modal.Header>Children Mode</Modal.Header>
              <Modal.Content>
                <p>There are two different modalities for listing a Node's children in TypeScript:</p>
                <List                >
                  <List.Item><ListHeader>forEachChild()</ListHeader><List.Description>Using this method to iterate a node's children it will return only those nodes which kind are relevant semantically, skipping nodes like tokens, comments, spaces (trivia) and similar things that don't have an impact on the  semantics of the program.</List.Description></List.Item>
                  <List.Item><ListHeader>getChildren()</ListHeader><List.Description>On the other hand, this method will return all kind of children, even those not relevant to the program's semantics, like tokens, trivia, comments, etc.</List.Description> </List.Item>
                </List>
                <p>Notice that some examples needs a particular modality, for example, those selecting comments will need <code>getChildren</code> mode on.</p>
                <p>You can try to switch between them in the TypeScript AST view and observe how the tree of nodes changes.</p>
              </Modal.Content>
            </Modal>
            </>
            
  }
}
