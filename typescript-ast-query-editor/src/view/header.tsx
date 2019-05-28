import * as React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import MenuExampleMenus from './menu'
import { SideBarPusher } from './sidebarPusher';

export const MyHeader = () => (<Segment compact>
  <Grid>
    <Grid.Column floated='left' width={8}>
      <Header as='h2' floated='right' attached>
        Cannabis
        <Header.Subheader attached >
          TypeScript AST viewer and Advance Query editor
       </Header.Subheader>
      </Header>

    </Grid.Column>
    <Grid.Column floated='right' width={8}>
      <MenuExampleMenus />
<SideBarPusher/>
    </Grid.Column>
  </Grid>
</Segment>)
