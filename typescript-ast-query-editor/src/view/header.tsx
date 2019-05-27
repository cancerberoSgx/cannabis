import { Grid, Header, Segment } from 'semantic-ui-react';
import * as React from 'react'
import MenuExampleMenus from './menu';
let header;
export const MyHeader = () => (<Segment compact>
  <Grid>
    <Grid.Column floated='left' width={8}>
      <Header as='h2' floated='right' attached>
        Cannabis
        <Header.Subheader attached>
          TypeScript AST viewer and Advance Query editor
       </Header.Subheader>
      </Header>

    </Grid.Column>
    <Grid.Column floated='right' width={8}>
      <MenuExampleMenus />

    </Grid.Column>
  </Grid>
</Segment>);
