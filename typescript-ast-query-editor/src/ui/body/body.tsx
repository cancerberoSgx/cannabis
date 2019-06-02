import * as React from 'react'
import { Grid, Header, Menu, Segment, Tab } from 'semantic-ui-react'
import { State } from '../../app/store'
import { AbstractComponent } from '../component'
import { Ast } from './ast'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryAst } from './queryAst'
import { QueryEditor } from './queryEditor'
import { Results } from './results'

export class Body extends AbstractComponent {
  // shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
  //   return false//nextState.getChildren !== this.state.getChildren
  // }
  render() {
    return (
      <Segment basic className="appBody">
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
                  menuItem: <Menu.Item key='ast'>TypeScript AST</Menu.Item>,
                  render: () => <Tab.Pane>
                    <Ast />
                  </Tab.Pane>,
                },
                {
                  menuItem: <Menu.Item key='ast'>Query AST</Menu.Item>,
                  render: () => <Tab.Pane>
                    <QueryAst />
                  </Tab.Pane>,
                },
                {
                  menuItem: <Menu.Item key='queryAnalysis'>Search Trace</Menu.Item>,
                  render: () => <Tab.Pane>
                    Trace of last Search
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
            <Segment>
              <>
                <div id="editor-container" style={{ height: '100vh', maxHeight: '70vh', margin: 0, padding: 0 }}></div>
                <br />
                <CursorBreadcrumb />
                <br />
              </>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>)
  }
}
