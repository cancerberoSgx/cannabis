import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { getAscendants, iconForNodeKind } from '../uiUtil'
import { AbstractComponent } from '../component'
import './cursorBreadcrumb.css'
import { getASTNodeKindName } from '../../../../dist/src';

export class CursorBreadcrumb extends AbstractComponent {
  render() {
    if (!this.state.nodesAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb size="small" className="CursorBreadcrumb">
          {getAscendants(this.state.nodesAtPosition).reverse().map(a => <><BreadcrumbDivider /><Breadcrumb.Section link onClick={e => highlightNodesInEditor([a])}><Icon name={iconForNodeKind(getASTNodeKindName(a))}/>{getGeneralNodeKindName(a)}</Breadcrumb.Section></>)}
        </Breadcrumb>
      )
    }
  }
}
