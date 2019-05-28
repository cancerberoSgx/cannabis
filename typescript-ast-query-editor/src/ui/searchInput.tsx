import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import { AbstractComponent } from './component'

export class SearchInput extends AbstractComponent {
  render() {
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
