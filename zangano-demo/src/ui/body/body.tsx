import * as React from 'react'
import { Grid, Label, Menu, Ref, Segment, Sticky, Tab } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { Error } from './error'
import { ImportProject } from './importProject'
import { Project } from './project'
import { Projects } from './projects'

export class Body extends AbstractComponent {
  protected contextRef = React.createRef()
  render() {
    return (
      <Segment basic>
        <Error />
        <Grid>
          <Grid.Column floated='left' width={8}>
            <Tab onTabChange={(e, props) => this.setState({ currentTab: props.activeIndex as number })} panes={
              [
                {
                  menuItem: <Menu.Item key='import'>Import Git Project</Menu.Item>,
                  render: () => <Tab.Pane>
                    <ImportProject />
                  </Tab.Pane>,
                },
                {
                  menuItem: <Menu.Item key='ast'>Projects Loaded
                  <Label circular >{this.state.projects.length + ''}</Label>
                  </Menu.Item>,
                  render: () => <Tab.Pane>
                    <Projects />
                  </Tab.Pane>
                },
                {
                  menuItem: <Menu.Item key='ast'>Current Project</Menu.Item>,
                  render: () => <Tab.Pane>
                    <Project />
                  </Tab.Pane>,
                },
                {
                  menuItem: <Menu.Item key='ast'>AST Explorer</Menu.Item>,
                  render: () => <Tab.Pane>
                    query ast
                  </Tab.Pane>,
                },
              ]
            } />
          </Grid.Column>
          <Grid.Column floated='right' width={8}>

            <Ref innerRef={this.contextRef}>
              <Sticky context={this.contextRef}>
                <div id="editor-container" style={{ height: '100vh', maxHeight: '70vh', margin: 0, padding: 0 }}></div>
                <br />
                <CursorBreadcrumb />
                <br />
              </Sticky>
            </Ref>
          </Grid.Column>
        </Grid>
      </Segment>)
  }
}
