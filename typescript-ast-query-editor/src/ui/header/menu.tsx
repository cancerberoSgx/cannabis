import * as React from 'react';
import 'semantic-ui-css/semantic.css';
import { Button, Menu } from 'semantic-ui-react';
import { State } from '../../app/store';
import { AbstractComponent, AbstractProps } from '../component';
interface S extends State {
  activeItem?: string
}
export default class MenuExampleMenus extends AbstractComponent<AbstractProps, S>  {
  constructor(p: any, s: any) {
    super(p, s)
    this.state = { ...this.state, activeItem: undefined }
  }

  render() { 
    return (
      <Menu floated={"right"}>
        <Menu.Menu position='right'>
          <Button small toggle active={this.state.activeItem === 'signup-active'}  onClick={e => this.setState({ sidebarVisibility: this.state.activeItem === 'signup-active' ? false:  true , activeItem:  this.state.activeItem === 'signup-active' ? 'signup-inactive' :  'signup-active' })}>Menu
      </Button>
          <Menu.Item small name='help' active={this.state.activeItem === 'help'} onClick={e => this.setState({ activeItem: name })}>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
