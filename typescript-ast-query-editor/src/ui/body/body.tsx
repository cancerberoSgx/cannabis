import * as React from 'react'
import { Grid, Header, Menu, Segment, Tab } from 'semantic-ui-react'
import { showQueryEditorAtTheRight as setQueryEditorAtTheRight } from '../../app/dispatchers'
import { AbstractComponent } from '../component'
import TraceSearchTable from '../trace/traceTable'
import { Ast } from './ast'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Examples } from './examples'
import { QueryAst } from './queryAst'
import { QuerySearch } from './querySearch'
import { Results } from './results'

export class Body extends AbstractComponent<{ activeIndex: number }> {
  render() {
    return (
      <Segment basic className="appBody">
        <Grid>
          <Grid.Column floated='left' width={8}>
            <Tab
              activeIndex={this.state.currentTab}
              onTabChange={(e, props) => {
                this.setState({ currentTab: parseInt(props.activeIndex + '' || '0') || 0 })
                setTimeout(() => {
                  setQueryEditorAtTheRight(props.activeIndex === 2 || props.activeIndex === 3, props.activeIndex === 3)
                }, 200)
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
                    menuItem: <Menu.Item key='queryAnalysis'>Trace Execution</Menu.Item>,
                    render: () => <Tab.Pane>
                      <TraceSearchTable />
                    </Tab.Pane>,
                  },
                  // {
                  //   menuItem: <Menu.Item key='examples'>Examples</Menu.Item>,
                  //   render: () => <Tab.Pane>
                  //     <Header as="h3">Search Examples</Header>
                  //   </Tab.Pane>,
                  // },
                ]
              } />
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
            <Segment>
              <>
                <div id="editor-container" className="editor-container" style={{ height: '100vh', maxHeight: '70vh', margin: 0, padding: 0 }}></div>
                <br />
                <CursorBreadcrumb />
                <br />
                {this.state.currentTab === 2 ? <Segment className="queryDump" basic>
                  <Header as="h3">Textual Representation</Header>
                  <pre>
                    {this.state.queryDump}
                  </pre>
                </Segment> : ''}
              </>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>)
  }
}
