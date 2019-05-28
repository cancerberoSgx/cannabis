import * as React from 'react'
import { Button } from 'semantic-ui-react'
import { AbstractComponent } from '../component'

export class SideBarPusher extends AbstractComponent {
  render() {
    return (<Button.Group>
      <Button disabled={this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: true })}>
        Show sidebars
      </Button>
      <Button disabled={!this.state.sidebarVisibility} onClick={e => this.setState({ sidebarVisibility: false })}>
        Hide sidebars
      </Button>
    </Button.Group>)
  }
}
