import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon } from 'semantic-ui-react'
import { State } from '../../app/store'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'
import { iconForNodeKind } from '../uiUtil'

export class CursorBreadcrumb extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.nodeAtPosition !== this.state.nodeAtPosition
  }
  render() {
    if (!this.state.nodeAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb size="small" className="CursorBreadcrumb">
          {this.state.nodeAtPosition.getAncestors().reverse().map(a => <>
            <BreadcrumbDivider />
            <Breadcrumb.Section link onClick={e => highlightNodesInEditor([a])}>
              <Icon name={iconForNodeKind(a.getKindName())} />{a.getKindName()}
            </Breadcrumb.Section>
          </>
          )}
        </Breadcrumb>
      )
    }
  }
}
