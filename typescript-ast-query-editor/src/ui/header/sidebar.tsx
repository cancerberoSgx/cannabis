import { asArray } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container, Icon, Menu, Segment, Sidebar, Modal, Button } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { SearchInput } from '../searchInput'
import { Logs } from '../body/logs';

export class SidebarExampleMultiple extends AbstractComponent {

  handleHideClick = () => this.setState({ sidebarVisibility: false })
  handleShowClick = () => this.setState({ sidebarVisibility: true })
  handleSidebarHide = () => this.setState({ sidebarVisibility: false })
  render() {
    return (
      <Container fluid >
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='top'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
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

            <Menu.Item>
              <SearchInput />
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


            <Modal trigger={<Menu.Item as='a'>Logs</Menu.Item>}>
              <Modal.Header>Logs</Modal.Header>
              <Modal.Content>
                <Logs />
              </Modal.Content>
            </Modal>

            {/* <Menu.Item as='a' onClick={e=>}>Logs</Menu.Item> */}
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