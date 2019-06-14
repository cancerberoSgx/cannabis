// import { getASTNodeKindName, getASTNodeName, getASTNodeText } from 'cannabis'
// import { shorter } from 'misc-utils-of-mine-generic'
// import * as React from 'react'
// import { Icon, Label, List, Segment } from 'semantic-ui-react'
// import { State } from "../../app/state"
// import { highlightNodesInEditor } from '../../editor/ts/codeEditor'
// import { iconForNodeKind, Space } from '../common/uiUtil'
// import { AbstractComponent } from '../component'

// export class Results extends AbstractComponent {
//   // shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
//   //   return nextState.result !== this.state.result
//   // }

//   render() {
//     if (this.state.error) {
//       return <Segment>
//         <strong>Error! </strong><br />
//         <pre>
//           {this.state.error + ''}
//           {this.state.error.stack || + ''}
//         </pre>
//       </Segment>
//     }
//     if (!this.state.result || !this.state.result.length) {
//       return <Segment>
//         <strong>No results.</strong>
//       </Segment>
//     }
//     return <Segment className="results">
//       <h3>Results</h3>
//       <List>
//         {this.state.result.map((node, i) =>
//           <List.Item as='a' key={i} onClick={e => highlightNodesInEditor([node])}>
//             <List.Content>
//               <List.Header>
//                 <Icon name={iconForNodeKind(getASTNodeKindName(node) || '')} />
//                 {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''} <Space />
//                 {getASTNodeKindName(node)}
//               </List.Header>
//               <List.Description >
//                 <code>{shorter(getASTNodeText(node), 100)}</code>
//               </List.Description>
//             </List.Content>
//           </List.Item>
//         )}
//       </List>
//     </Segment>
//   }

// }
