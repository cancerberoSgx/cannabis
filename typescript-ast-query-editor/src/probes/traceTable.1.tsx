// import React, { Component } from 'react'
// import { Icon, Table, Segment, Button } from 'semantic-ui-react'
// import { render } from 'react-dom';
// import 'semantic-ui-css/semantic.css'
// import { test } from './trace';

// interface Row  { name: string, age: number, gender: string }
// const tableData: Row[] = [
//   { name: 'John', age: 15, gender: 'Male' },
//   { name: 'Amber', age: 40, gender: 'Female' },
//   { name: 'Leslie', age: 25, gender: 'Other' },
//   { name: 'Ben', age: 70, gender: 'Male' },
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
//       sorted={column === 'name' ? direction : undefined}
//       onClick={this.handleSort('name')}
//       >
//       Name
//       </Table.HeaderCell>
//       <Table.HeaderCell
//       sorted={column === 'age' ? direction : undefined}
//       onClick={this.handleSort('age')}
//       >
//       Age
//       </Table.HeaderCell>
//       <Table.HeaderCell
//       sorted={column === 'gender' ? direction : undefined}
//       onClick={this.handleSort('gender')}
//       >
//       Gender
//       </Table.HeaderCell>
//       </Table.Row>
//       </Table.Header>
//       <Table.Body>
//       {data.map (({ age, gender, name }) => (
//       <Table.Row key={name}>
//       <Table.Cell>{name}</Table.Cell>
//       <Table.Cell>{age}</Table.Cell>
//       <Table.Cell>{gender}</Table.Cell>
//       </Table.Row>
//       ))}
//       </Table.Body>
//       </Table></Segment>
//     )
//   }

//   trace(): void {

//     const result = test()
//     console.log(result);


//   }
// }

// render(<TableExampleSortable />, document.getElementById('main'))
// // export default TableExampleStructured
