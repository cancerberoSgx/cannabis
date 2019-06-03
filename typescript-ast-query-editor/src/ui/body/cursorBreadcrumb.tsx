import { getASTNodeKindName } from 'cannabis'
import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon } from 'semantic-ui-react'
import { State } from "../../app/state"
import { highlightNodesInEditor } from '../../editor/ts/codeEditor'
import { getASTNodeAncestors, iconForNodeKind } from '../common/uiUtil'
import { AbstractComponent } from '../component'

export class CursorBreadcrumb extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.nodeAtPosition !== this.state.nodeAtPosition
      ||
      nextState.getChildren !== this.state.getChildren
  }
  render() {
    if (!this.state.nodeAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb size="small" className="CursorBreadcrumb">
          {getASTNodeAncestors(this.state.nodeAtPosition).reverse().map(a => <>
            <BreadcrumbDivider />
            <Breadcrumb.Section link onClick={e => highlightNodesInEditor([a as any])}>
              <Icon name={iconForNodeKind(getASTNodeKindName(a))} />{getASTNodeKindName(a)}
            </Breadcrumb.Section>
          </>
          )}
        </Breadcrumb>
      )
    }
  }
}
