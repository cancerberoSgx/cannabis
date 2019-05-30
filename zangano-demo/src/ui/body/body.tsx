import * as React from 'react'
import { Grid, Header, Menu, Segment, Tab, Input, Label, Button, Modal } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { Ast } from './ast'
import { CursorBreadcrumb } from './cursorBreadcrumb'
import { importGitProject } from '../../app/importGitProject';
import { Space } from '../uiUtil';

export class Body extends AbstractComponent {
  render() {
    return (
      <Segment basic>
        <Grid>
          <Grid.Column floated='left' width={8}>
            <Tab panes={
              [
                {
                  menuItem: <Menu.Item key='import'>Import Git Project</Menu.Item>,
                  render: () => <Tab.Pane>
                    <Header>Import TypeScript Project
                      <Header.Subheader>From Git Repository</Header.Subheader>
                    </Header>
                    <Label>Enter git URL:</Label><br/>
                    <Input id="git-project-url" focus fluid 
                    onChange={(e)=>this.setState({gitUrlInput: e.currentTarget.value})}></Input>
                    <br/> 
                    <Button primary loading={!!this.state.status}
                    onClick={e=>importGitProject()}>Import</Button><Space/>

                    <Modal trigger={<Button>Details</Button>}>
              <Modal.Header>Details</Modal.Header>
              <Modal.Content>
                <p>
                  Git project will be imported using the browser 100%, then a TypeScript project will be creating using <code>tsconfig.json</code> top-level file.
                </p>
                <p>
                  An example working git url is <code>https://github.com/cancerberoSgx/yamat</code>. This is a small TypeScript node.js Application.
                </p>

              </Modal.Content>
            </Modal>
                  </Tab.Pane>,
                },
                {
                  menuItem: <Menu.Item key='ast'>Current Project</Menu.Item>,
                  render: () => <Tab.Pane>
                    <Ast />
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
            <div id="editor-container" style={{ height: '100vh', maxHeight: '70vh', margin: 0, padding: 0 }}></div>
            <br />
            <CursorBreadcrumb />
            <br />
          </Grid.Column>
        </Grid>
      </Segment>)
  }
}
