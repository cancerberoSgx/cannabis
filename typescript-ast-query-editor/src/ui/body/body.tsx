import * as React from 'react'
import { Container, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react'
import { getStore } from '../../app/store'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryEditor } from './queryEditor'
import { Results } from './results'

export const Body = () => (
<Segment basic>
    <Grid>
      <Grid.Column floated='left' width={8}>
        <Examples />
        <QueryEditor />
        <Results />
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        <CursorBreadcrumb />
        <div id="editor-container" style={{ height: '100vh', maxHeight: '60vh', marginTop: '1em' }}></div>
        <div className="trace-panel flex-item" >
          <pre className="trace-text">
            {getStore().getState().queryTraceText}
          </pre>
        </div>
      </Grid.Column>
    </Grid>
</Segment>)
