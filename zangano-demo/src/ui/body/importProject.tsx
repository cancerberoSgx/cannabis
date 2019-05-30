import * as React from 'react'
import { Button, Header, Input, Label, Modal } from 'semantic-ui-react'
import { importGitProject } from '../../app/projectDispatcher'
import { AbstractComponent } from '../component'
import { Space } from '../uiUtil'
import { State } from '../../app/store';

export class ImportProject extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentTab==0
  }
  render() {
    return <>
      <Header>Import TypeScript Project
    <Header.Subheader>From Git Repository</Header.Subheader>
      </Header>
      <Label>Enter git URL:</Label><br />
      <Input id="git-project-url" focus fluid primary loading={!!this.state.status}
        icon='search' placeholder='Search...'
        value={this.state.gitUrlInput}
        onChange={(e) => this.setState({ gitUrlInput: e.currentTarget.value })} />
      <br />
      <Button loading={!!this.state.status}
        onClick={e => importGitProject()}>Import</Button><Space />
      <Modal trigger={<Button>Details</Button>}>
        <Modal.Header>Details</Modal.Header>
        <Modal.Content>
          <p>
            Git project will be imported using the browser 100%, then a TypeScript project will be creating using <code>tsconfig.json</code> top-level file.
          </p>
          <p>
            An example working git url is <code>https://github.com/cancerberoSgx/yamat</code>. This is a small TypeScript node.js Application.
            </p>

          <p>Try loading several projects and switching between then, even edit the files and test the typechecking in the editor to have an idea how viable is to use 100% the browser for this. </p>

          <p>Hope you enjoin</p>
          <Label floating ribbon>--Sebas</Label>
        </Modal.Content>
      </Modal>
    </>

  }
}
