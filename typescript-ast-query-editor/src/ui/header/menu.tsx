import * as React from 'react'
import { Menu } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
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
          <Menu.Item small name='help'>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
