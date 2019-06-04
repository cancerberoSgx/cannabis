import { asArray } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Container, Icon, Menu, Modal, Segment, Sidebar } from 'semantic-ui-react'
import { Logs } from '../common/logs'
import { SearchInput } from '../common/searchInput'
import { AbstractComponent } from '../component'

export class SidebarExampleMultiple extends AbstractComponent {

  render() {
    return (
      <Container fluid >
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='top'
            icon='labeled'
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
            vertical
            t
            onHide={() => this.setState({ sidebarVisibility: false })}
            visible={this.state.sidebarVisibility}
          >
            <Modal trigger={<Menu.Item as='a'>Logs</Menu.Item>}>
              <Modal.Header>Logs</Modal.Header>
              <Modal.Content>
                <Logs />
              </Modal.Content>
            </Modal>
            <Menu.Item as='a'>Create Shareable URL</Menu.Item>
            <Menu.Item as='a'>Help</Menu.Item>
            <Menu.Item as='a'>Github</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {...asArray(this.props.children)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}
