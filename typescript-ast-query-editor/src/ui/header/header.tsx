import * as React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import MenuExampleMenus from './menu'

export const MyHeader = () => (
  <Segment raised>
    <Grid>
      <Grid.Column floated='left' width={8}>
        <Header as='h1' style={{ display: 'inline', margin: 0, padding: 0 }}>
          Cannabis: <Space />
          <Header.Subheader as="h3" style={{ display: 'inline', margin: 0, padding: 0 }} >
            TypeScript AST viewer and Advance Query editor
       </Header.Subheader>
        </Header>
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        <MenuExampleMenus />
      </Grid.Column>
    </Grid>
  </Segment>)

const Space = () => (
  <span style={{ marginRight: '0.5em' }}></span>
)
