import * as React from 'react'
import { Component } from 'react'
import 'semantic-ui-css/semantic.css'
import { Menu, Button } from 'semantic-ui-react'
import { AbstractComponent, AbstractProps } from '../component';
import { State } from '../../app/store';
// interface S { activeItem?: string }

interface S extends State {
  activeItem?: string
}

export default class MenuExampleMenus extends AbstractComponent<AbstractProps, S>  {
  // state: S = {}

  constructor(p: any, s: any) {
    super(p, s)
    this.state = { ...this.state, activeItem: undefined }
  }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state
 
    return (
      <Menu floated={"right"}>
        {/* <Button.Group>
      <Button disabled={this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: true })}>
        Show sidebars
      </Button>
      <Button disabled={!this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: false })}>
        Hide sidebars
      </Button>
    </Button.Group> */}

        {/* <Menu.Item 
         name='hide' active={this.state.activeItem === 'hide'} 
         disabled={this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: true, activeItem: name })}>
          Show
        </Menu.Item>

        <Menu.Item 
        name='hide' active={this.state.activeItem === 'hide'} 
        disabled={!this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: false , activeItem: name})}
        >
          Submit
        </Menu.Item> */}

        <Menu.Menu position='right'>
          {/* <Menu.Item name='hide' active={this.state.activeItem === 'signup'} onClick={e => this.setState({ activeItem: name })}> */}
            {/* Sign Up */}
          {/* </Menu.Item> */}
          <Button toggle active={this.state.activeItem === 'signup-active'}  onClick={e => this.setState({ sidebarVisibility: this.state.activeItem === 'signup-active' ? false:  true , activeItem:  this.state.activeItem === 'signup-active' ? 'signup-inactive' :  'signup-active' })}>Menu
      </Button>

          <Menu.Item name='help' active={this.state.activeItem === 'help'} onClick={e => this.setState({ activeItem: name })}>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
