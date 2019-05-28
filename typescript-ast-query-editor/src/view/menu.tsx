import * as React from 'react'
import { Component } from 'react'
import 'semantic-ui-css/semantic.css'
import { Menu } from 'semantic-ui-react'
interface S { activeItem?: string }


export default class MenuExampleMenus extends Component<{}, S> {
  state: S = {}

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu floated={"right"}>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={e => this.setState({ activeItem: name })}>
          Browse
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={e => this.setState({ activeItem: name })}>
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='signup' active={activeItem === 'signup'} onClick={e => this.setState({ activeItem: name })}>
            Sign Up
          </Menu.Item>

          <Menu.Item name='help' active={activeItem === 'help'} onClick={e => this.setState({ activeItem: name })}>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
