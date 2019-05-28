import * as React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import { Space } from '../uiUtil'
import './header.css'
import MenuExampleMenus from './menu'

export const MyHeader = () => (
  <Segment raised className="headerContainer">
    <Grid>
      <Grid.Column floated='left' width={12}>
        <Header as='h1' style={{ display: 'inline', margin: 0, padding: 0 }}>
          Cannabis:
        </Header>
        <Space />
        <Header.Subheader as="h3" style={{ display: 'inline', margin: 0, padding: 0 }} >
          TypeScript AST viewer and Advance Query editor
       </Header.Subheader>
      </Grid.Column>
      <Grid.Column floated='right' width={4}>
        <MenuExampleMenus />
      </Grid.Column>
    </Grid>
  </Segment>)

