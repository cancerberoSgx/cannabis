import * as React from 'react'
import { Header, List, Segment, Checkbox } from 'semantic-ui-react'
import { tsMorph } from 'zangano'
import { AbstractComponent } from '../component'
import { isSourceFile } from '../../editor/tsUtil';
import { selectFile } from '../../app/editorDispatcher';
import { State } from '../../app/store';

export class Project extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentTab==2
  }
  render() {
    const p = this.state.currentProject.project
    return <Segment>
      <Header>{this.state.currentProject.packageJson.name}@{this.state.currentProject.packageJson.version || ''}
        <Header.Subheader>{this.state.currentProject.packageJson.description || ''}</Header.Subheader>
      </Header>
      <Checkbox checked={this.state.showAllFiles} label="Show all files" onChange={e=>{alert('Not implemented')}}></Checkbox>
      <List >
        {  (p.getRootDirectories().length===1 ?  [...p.getRootDirectories()[0].getDirectories(), ...p.getRootDirectories()[0].getSourceFiles()] : p.getRootDirectories()).map(d => isSourceFile(d) ? this.file(d) : this.directory(d))}
      </List>
    </Segment>
  }
  directory(d: tsMorph.Directory) {
    return <List.Item as="a" onClick={e => {
      e.stopPropagation()
    }}>
      <List.Icon name="folder" />
      <List.Content>
      <List.Header   >{d.getBaseName()}</List.Header  >
        <List.Description></List.Description>
        <List.List>
          <>{d.getDirectories().map(cd => this.directory(cd))}
          {d.getSourceFiles().map(f => this.file(f))}</>
        </List.List>
      </List.Content>
    </List.Item>
  }
  file(f: tsMorph.SourceFile): any {
    return <List.Item onClick={e => {
      e.stopPropagation()
      selectFile(f)
    }}>
      <List.Icon className="fileIcon" name="file" /> 
      <List.Content>
      <List.Header  as="a">{f.getBaseName()}</List.Header >
      </List.Content>
    </List.Item>
  }
}
