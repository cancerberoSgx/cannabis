import * as React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { getStore } from '../../app/store'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryEditor } from './queryEditor'
import { Results } from './results'
import { QueryDump } from './queryDump';

export const Body = () => (
  <Segment basic>
    <Grid>
      <Grid.Column floated='left' width={8}>
        <Examples />
        <QueryEditor />
        <Results />
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        <div id="editor-container" style={{ height: '100vh', maxHeight: '60vh', marginTop: '1em' }}></div>
        <br/>
        <CursorBreadcrumb />
        <br/>
        <QueryDump/>
      </Grid.Column>
    </Grid>
  </Segment>)
