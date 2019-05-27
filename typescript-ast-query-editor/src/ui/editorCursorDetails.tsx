import { getGeneralNodeKindName } from 'ts-simple-ast-extra';
import { highlightNodesInEditor } from '../editor/codeEditor';
import { AbstractComponent } from './component';
import { printNode, getAscendants } from '../util';
import * as React from 'react'

export class EditorCursorDetails extends AbstractComponent {
  render() {
    return <div className="flex-item cursorDescription">
      Cursor: {this.state.nodesAtPosition && printNode(this.state.nodesAtPosition)} {this.state.nodesAtPosition && getAscendants(this.state.nodesAtPosition).reverse().map(a => <a onClick={e => highlightNodesInEditor([a])}>->{getGeneralNodeKindName(a)}</a>)}
    </div>;
  }
}
