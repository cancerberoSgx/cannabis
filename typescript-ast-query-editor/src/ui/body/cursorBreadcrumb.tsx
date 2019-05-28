import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { getAscendants } from '../../util'
import { AbstractComponent } from '../component'
import './cursorBreadcrumb.css'

export class CursorBreadcrumb extends AbstractComponent {
  render() {
    if (!this.state.nodesAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb className="CursorBreadcrumb">
          {getAscendants(this.state.nodesAtPosition).reverse().map(a => <><BreadcrumbDivider /><Breadcrumb.Section link onClick={e => highlightNodesInEditor([a])}>{getGeneralNodeKindName(a)}</Breadcrumb.Section></>)}
        </Breadcrumb>
      )
    }
  }
}
