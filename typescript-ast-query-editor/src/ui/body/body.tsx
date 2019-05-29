import * as React from 'react'
import { Grid, Segment, Tab, Menu, Label, Header } from 'semantic-ui-react'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryDump } from './queryDump'
import { QueryEditor } from './queryEditor'
import { Results } from './results'

export const Body = () => (
  <Segment basic>
    <Grid>
      <Grid.Column floated='left' width={8}>
        <Tab panes={
          [
            {
              menuItem: <Menu.Item key='all'>All</Menu.Item>,
              render: () => <Tab.Pane>
                <Examples />
                <QueryEditor />
                <Results />
              </Tab.Pane>,
            },
            {
              menuItem: <Menu.Item key='queryAnalysis'>Query Analysis</Menu.Item>,
              render: () => <Tab.Pane>
                <QueryDump/>
              </Tab.Pane>,
            },
            {
              menuItem: <Menu.Item key='examples'>Examples</Menu.Item>,
              render: () => <Tab.Pane>
                <Header as="h3">Search Examples</Header>
              </Tab.Pane>,
            },
          ]
        } />
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        <div id="editor-container" style={{ height: '100vh', maxHeight: '60vh', marginTop: '1em' }}></div>
        <br />
        <CursorBreadcrumb />
        <br />
        <QueryDump />
      </Grid.Column>
    </Grid>
  </Segment>)
