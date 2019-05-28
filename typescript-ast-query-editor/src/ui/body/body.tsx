import * as React from 'react'
import { Container, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react'
import { getStore } from '../../app/store'
import { EditorCursorDetails } from './editorCursorDetails'
import { Examples } from './examples'
import { QueryEditor } from './queryEditor'
import { Results } from './results'
import { AbstractComponent } from '../component';

export const MyBody = () => (<Segment basic>
  <Header as='h3'>Application Content</Header>
  <Image src='/images/wireframe/paragraph.png' />
  <Container style={{ marginTop: '1em' }}>
    <Grid>
      <Grid.Column floated='left' width={8}>
        <Examples />
        <QueryEditor />
        <Results />
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        <EditorCursorDetails />>
        <div id="editor-container" style={{ height: '100vh', maxHeight: '60vh' }}
        ></div>
        <div className="trace-panel flex-item" >
          <pre className="trace-text">
            {getStore().getState().queryTraceText}
          </pre>
        </div>
      </Grid.Column>
    </Grid>
  </Container>
</Segment>)


// class TabPanel extends AbstractComponent {
// render(){
//   const panes = [
//     { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
//     { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
//     { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
//   ]  
//   return <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
// }
// }
