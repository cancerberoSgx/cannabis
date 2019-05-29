import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { getASTNodeKindName } from 'cannabis'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'
import { getAscendants, iconForNodeKind } from '../uiUtil'
import './cursorBreadcrumb.css'
import { State } from '../../app/store';

export class CursorBreadcrumb extends AbstractComponent {
  shouldComponentUpdate(nextProps:any, nextState: Readonly<State>, nextContext: any){
    return nextState.nodeAtPosition!==this.state.nodeAtPosition
  }
  render() {
    if (!this.state.nodeAtPosition) {
      return <></>
    }
    else {
      return (
        <Breadcrumb size="small" className="CursorBreadcrumb">
          {getAscendants(this.state.nodeAtPosition).reverse().map(a => <>
          <BreadcrumbDivider />
          <Breadcrumb.Section link onClick={e => highlightNodesInEditor([a])}><Icon name={iconForNodeKind(getASTNodeKindName(a))} />{getGeneralNodeKindName(a)}</Breadcrumb.Section>
          </>
          )}
        </Breadcrumb>
      )
    }
  }
}
