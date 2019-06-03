import * as React from 'react'
import { Grid, Header, Menu, Segment, Tab } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { Ast } from './ast'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryAst } from './queryAst'
import { QuerySearch } from './querySearch'
import { Results } from './results'
import { showQueryEditorAtTheRight as setQueryEditorAtTheRight } from '../../app/dispatchers';

export class Body extends AbstractComponent {
  render() {
    return (
      <Segment basic className="appBody">
        <Grid>
          <Grid.Column floated='left' width={8}>
            <Tab
              onTabChange={(e, props)=>{
                  setTimeout(() => {
                    setQueryEditorAtTheRight(props.activeIndex===2)
                  }, 200);
              }}
              panes={
                [
                  {
                    menuItem: <Menu.Item key='all'>All</Menu.Item>,
                    render: () => <Tab.Pane active  >
                      <Examples />
                      <QuerySearch />
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
