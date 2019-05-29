import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Icon, List, Label } from 'semantic-ui-react'
import { getGeneralNodeKindName, tsMorph, isNode } from 'ts-simple-ast-extra'
import { getASTNodeKindName, ASTNode, getASTNodeName, getASTNodeChildren, createSourceFile, getASTNodeText } from 'cannabis'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent, AbstractProps } from '../component'
import { getAscendants, iconForNodeKind, Space } from '../uiUtil'
import './cursorBreadcrumb.css'
import { getEditorText } from '../../editor/monaco';
import { shorter } from 'misc-utils-of-mine-generic';
import './logs.css'


export class Logs extends AbstractComponent {
  render() {
    return <List className="logsList">
   {this.state.logs.map(l=><List.Item>{l}</List.Item>)}
    </List>

}
}
