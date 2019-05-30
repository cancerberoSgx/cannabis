import * as React from 'react'
import { Checkbox, Header, List, Segment, Button } from 'semantic-ui-react'
import { tsMorph } from 'zangano'
import { selectFile, addNewFile } from '../../app/editorDispatcher'
import { State, getStore } from '../../app/store'
import { isSourceFile } from '../../editor/tsUtil'
import { AbstractComponent } from '../component'
import { unique } from 'misc-utils-of-mine-generic';

export class Project extends AbstractComponent {
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.currentTab == 2
  }
  render() {
    const p = this.state.currentProject.project
    return <Segment>
      <Header>{this.state.currentProject.packageJson.name}@{this.state.currentProject.packageJson.version || ''}
        <Header.Subheader>{this.state.currentProject.packageJson.description || ''}</Header.Subheader>
      </Header>
      <Checkbox checked={this.state.showAllFiles} label="Show all files" onChange={e => { alert('Not implemented') }}></Checkbox>
      <Button  onClick={addNewFile} >Add new File</Button>
      <List >
        {(p.getRootDirectories().length === 1 ? [...p.getRootDirectories()[0].getDirectories(), ...p.getRootDirectories()[0].getSourceFiles()] : p.getRootDirectories()).map(d => isSourceFile(d) ? this.file(d) : this.directory(d))}
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
        <List.Header as="a">{f.getBaseName()}</List.Header >
      </List.Content>
    </List.Item>
  }
}


