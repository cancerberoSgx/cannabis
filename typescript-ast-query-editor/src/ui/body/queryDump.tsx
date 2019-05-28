import * as React from 'react'
import { Breadcrumb, BreadcrumbDivider, Segment } from 'semantic-ui-react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { getAscendants } from '../uiUtil'
import { AbstractComponent } from '../component'
import './queryDump.css'

export class QueryDump extends AbstractComponent {
  render() {
   return <Segment className="queryDump" >
   <h3>Query Analysis</h3>
   <pre>
     {this.state.queryDump}
   </pre>
 </Segment>
  }
}
