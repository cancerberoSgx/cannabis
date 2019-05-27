import * as React from 'react'
import { render } from 'react-dom'
import { Grid, Image, Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import { Component } from 'react'
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { asArray } from 'misc-utils-of-mine-generic';

interface P  {
}
interface S { visible: boolean }
export class SidebarExampleMultiple extends Component<P, S> {
  state: S = { visible: false }
  constructor(p: P, s: S){
    super(p, s)
  }
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const { visible } = this.state
    return (
      <Container fluid >
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebars
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebars
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
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
            visible={visible}
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