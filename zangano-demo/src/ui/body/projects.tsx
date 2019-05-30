import * as React from 'react';
import { Header, Icon, Label, List } from 'semantic-ui-react';
import { AbstractComponent } from '../component';
import { selectProject } from '../../app/projectDispatcher';
import { State } from '../../app/store';

export class Projects extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentTab==1
  }
  render() {
    return (

      <List>
        {this.state.projects.map(p => (<List.Item as="a" onClick={e=>{
           e.stopPropagation()
           selectProject(p)
         }}>
          <List.Icon name="archive"></List.Icon>
         <List.Content>
         <List.Header >
         {p.packageJson.name}@{p.packageJson.version || ''}
            <Header.Subheader>{p.packageJson.description || ''}</Header.Subheader>
          </List.Header>
         </List.Content>
          <List.Description>
            <Label as='a' href={p.gitUrl}>
              <Icon name='linkify' />
              Git Repository URL
              </Label>
          </List.Description>
        </List.Item>))}
      </List>
    )
  }
}
