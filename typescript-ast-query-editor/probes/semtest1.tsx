// import React from 'react'
import { List } from 'semantic-ui-react'
import * as React from 'react'
import { render } from 'react-dom'

const ListExampleBasic = () => (
  <List>
    <List.Item>Apples</List.Item>
    <List.Item>Pears</List.Item>
    <List.Item>Oranges</List. Item>
  </List>
)

render(<ListExampleBasic/>, document.getElementById('main'))