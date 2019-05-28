import { asArray, Emitter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Component } from 'react'
import 'semantic-ui-css/semantic.css'
import { Button, Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { AbstractComponent } from '../ui/component';

// interface P {
//   booleanEmitter: Emitter<boolean>
// }

// interface S { visible: boolean }

export class SidebarExampleMultiple extends AbstractComponent  {

  // constructor(p: P, s: S) {
    // // super(p, s)
    // this.state  = { visible: false }
    // this.setVisible = this.setVisible.bind(this)
    // p.booleanEmitter.add(this.setVisible)
    // this.props.addHSetVisibleListener(listener=>this.setVisible = this.setVisible)
  // }

  // setVisible(visible: boolean){
  //   console.log('setVisible');    
  //   this.setState({ visible})
  // }
  handleHideClick = () => this.setState({ sidebarVisibility: false })
  handleShowClick = () => this.setState({ sidebarVisibility: true })
  handleSidebarHide = () => this.setState({ sidebarVisibility: false })
  render() {
    // const { visiblse } = this.state
    return (
      <Container fluid >
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.sidebarVisibility}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
            vertical
            t
            visible={this.state.sidebarVisibility}
          >
            <Menu.Item as='a' header>
              File Permissions
            </Menu.Item>
            <Menu.Item as='a'>Share on Social</Menu.Item>
            <Menu.Item as='a'>Share by E-mail</Menu.Item>
            <Menu.Item as='a'>Edit Permissions</Menu.Item>
            <Menu.Item as='a'>Delete Permanently</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            {...asArray(this.props.children)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}
