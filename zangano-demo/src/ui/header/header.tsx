import * as React from 'react'
import { Grid, Header as H, Segment } from 'semantic-ui-react'
import { Space } from '../uiUtil'
import './header.css'
import MenuExampleMenus from './menu'

export const Header = () => (
  <Segment raised className="headerContainer">
    <Grid>
      <Grid.Column floated='left' width={12}>
        <H as='h1' style={{ display: 'inline', margin: 0, padding: 0 }}>
          Zángano: 
        </H>
        <Space />
        <H.Subheader as="h3" style={{ display: 'inline', margin: 0, padding: 0 }} >
          Load TypeScript projects from Git 100% in the Browser
       </H.Subheader>
      </Grid.Column>
      <Grid.Column floated='right' width={4}>
        <MenuExampleMenus />
      </Grid.Column>
    </Grid>
  </Segment>)

