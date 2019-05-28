import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import { AbstractComponent } from './component';

export class SearchInput extends AbstractComponent {
  render(){
    const options = [
      { key: 'page', text: 'This Page', value: 'page' },
      { key: 'org', text: 'This Organization', value: 'org' },
      { key: 'site', text: 'Entire Site', value: 'site' },
    ]    
      return <Input
        action={<Dropdown button basic options={options} defaultValue='page' />}
        icon='search'
        size="mini"
        iconPosition='left'
        placeholder='Search...'
      />    
  }
}


// import _ from 'lodash'
// import faker from 'faker'
// import React, { Component } from 'react'
// import { Search, Grid, Header, Segment } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))

// const initialState = { isLoading: false, results: [], value: '' }

// export default class SearchExampleStandard extends Component {
//   state = initialState

//   handleResultSelect = (e, { result }) => this.setState({ value: result.title })

//   handleSearchChange = (e, { value }) => {
//     this.setState({ isLoading: true, value })

//     setTimeout(() => {
//       if (this.state.value.length < 1) return this.setState(initialState)

//       const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
//       const isMatch = result => re.test(result.title)

//       this.setState({
//         isLoading: false,
//         results: _.filter(source, isMatch),
//       })
//     }, 300)
//   }

//   render() {
//     const { isLoading, value, results } = this.state

//     return (
//       <Grid>
//         <Grid.Column width={6}>
//           <Search
//             fluid
//             loading={isLoading}
//             onResultSelect={this.handleResultSelect}
//             onSearchChange={_.debounce(this.handleSearchChange, 500, {
//               leading: true,
//             })}
//             results={results}
//             value={value}
//             {...this.props}
//           />
//         </Grid.Column>
//         <Grid.Column width={10}>
//           <Segment>
//             <Header>State</Header>
//             <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(this.state, null, 2)}
//             </pre>
//             <Header>Options</Header>
//             <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(source, null, 2)}
//             </pre>
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     )
//   }
// }
