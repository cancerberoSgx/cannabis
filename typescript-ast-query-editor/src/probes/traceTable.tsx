// import React, { Component } from 'react'
// import { Icon, Table, Segment, Button, Popup } from 'semantic-ui-react'
// import { render } from 'react-dom';
// import 'semantic-ui-css/semantic.css'
// import { test, TraceNode , } from './trace';
// import { getASTNodeKindName, ASTNode, StepTraceEvent, getASTNodeNamePath } from 'cannabis';
// import { printNode, printNode2 } from '../ui/common/uiUtil';

// interface Row  {
//   time:number
//   queryNodeDepth: number
//   nodeDepth: number
//   nodeKind:string
//   queryNodeType: string
//   event: StepTraceEvent<ASTNode>
// }
// const tableData: Row[] = [
//   // { name: 'John', age: 15, gender: 'Male' },
//   // { name: 'Amber', age: 40, gender: 'Female' },
//   // { name: 'Leslie', age: 25, gender: 'Other' },
//   // { name: 'Ben', age: 70, gender: 'Male' },
// ]

// export default class TableExampleSortable extends Component {
//   sortBy(data:Row[], col:string): any {
//     return data.sort((a,b)=>((a as any)[col]+'').localeCompare(((b as any)[col]+''))*-1)  
//     }

//   state = {
//     column: undefined,
//     data: tableData,
//     direction: undefined,
//   }

//   handleSort = (clickedColumn: string) => () => {
//     const { column, data, direction } = this.state

//     if (column !== clickedColumn) {
//       this.setState({
//         column: clickedColumn,
//         data: this.sortBy(data, clickedColumn),
//         direction: 'ascending',
//       })

//       return
//     }

//     this.setState({
//       data: data.reverse(),
//       direction: direction === 'ascending' ? 'descending' : 'ascending',
//     })
//   }

//   render() {
//     const { column, data, direction } = this.state    
//     return (
//       <Segment>
//         <Button onClick={e=>this.trace()}>Trace</Button>
//         <Table sortable celled fixed>
//       <Table.Header>
//       <Table.Row>
//       <Table.HeaderCell
//       sorted={column === 'time' ? direction : undefined}
//       onClick={this.handleSort('time')}
//       >
//       Time
//       </Table.HeaderCell>
//       <Table.HeaderCell
//       sorted={column === 'nodeDepth' ? direction : undefined}
//       onClick={this.handleSort('nodeDepth')}
//       >
//       nodeDepth
//       </Table.HeaderCell>
//       <Table.HeaderCell
//       sorted={column === 'queryNodeDepth' ? direction : undefined}
//       onClick={this.handleSort('queryNodeDepth')}
//       >
//       queryNodeDepth
//       </Table.HeaderCell>
//       </Table.Row>
//       </Table.Header>
//       <Table.Body>
//       {data.map( (r, i) => (
//       <Table.Row key={i}>
//       <Table.Cell>{r.time}</Table.Cell>
//       <Table.Cell>{r.nodeDepth}</Table.Cell>
//       <Table.Cell>{r.queryNodeDepth}</Table.Cell>
//       <Table.Cell selectable>
//       <Popup
//         trigger={
//          <a>{r.nodeKind}</a>
//         }
//         content={<pre>{printNode2(r.event.node, {name: true, text: true, other:getASTNodeNamePath})}</pre>}
//         position='top right'
//       />
//       </Table.Cell>
//       <Table.Cell selectable>
//        <Popup
//         trigger={
//          <a>{r.queryNodeType}</a>
//         }
//         content={<pre>{r.event.queryNode.dump()}</pre>}
//         position='top right'
//       />
//       </Table.Cell>
//       </Table.Row>
//       ))}
//       </Table.Body>
//       </Table></Segment>
//     )
//   }

//   trace(): void {    
//     const result = test()
//     console.log(result);
//     this.setState({data: result.tracer.getEvents()
//       .filter(e=>e.event.event==='endStep').map(r=>({
//       time: (r.time+'').padStart(4,'0'),
//       nodeDepth: r.event.nodeDepth,
//        queryNodeDepth: r.event.queryNodeDepth,
// nodeKind: getASTNodeKindName(r.event.node),
// queryNodeType: r.event.queryNode.type(),
// event: r.event
//     }))})
//       }
// }

// render(<TableExampleSortable />, document.getElementById('main'))
// // export default TableExampleStructured
