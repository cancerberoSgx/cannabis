import * as React from 'react'
import { Menu, Modal } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { About } from './about';
export default class MenuExampleMenus extends AbstractComponent {

  render() {
    return (
      <Menu floated={"right"}>
        <Menu.Menu position='right'>
          <Menu.Item small name='ShowMenu'>
            <input type="checkbox"
              checked={this.state.sidebarVisibility}
              onChange={e => {
                this.setState({ sidebarVisibility: !this.state.sidebarVisibility })
              }}></input> Menu
          </Menu.Item>
          <Modal trigger={<Menu.Item as='a'>About</Menu.Item>}>
              <Modal.Header>About</Modal.Header>
              <Modal.Content>
                <About/>
              </Modal.Content>
            </Modal>
        </Menu.Menu>
      </Menu>
    )
  }
}
