import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { getASTNodeKindName } from 'cannabis'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'
import { getAscendants, iconForNodeKind } from '../uiUtil'
import './cursorBreadcrumb.css'

export class CursorBreadcrumb extends AbstractComponent {
  render() {
    if (!this.state.nodesAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb size="small" className="CursorBreadcrumb">
          {getAscendants(this.state.nodesAtPosition).reverse().map(a => <>
          <BreadcrumbDivider />
          <Breadcrumb.Section link onClick={e => highlightNodesInEditor([a])}><Icon name={iconForNodeKind(getASTNodeKindName(a))} />{getGeneralNodeKindName(a)}</Breadcrumb.Section>
          </>
          )}
        </Breadcrumb>
      )
    }
  }
}
