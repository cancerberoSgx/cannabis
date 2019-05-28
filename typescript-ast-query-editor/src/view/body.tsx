import * as React from 'react'
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { Examples } from '../ui/examples'
import { QueryEditor } from '../ui/queryEditor';
import { Results } from '../ui/results';
import { EditorCursorDetails } from '../ui/editorCursorDetails';
import { getStore } from '../app/store';

export const MyBody = () => (<Segment basic>
  <Header as='h3'>Application Content</Header>
  <Image src='/images/wireframe/paragraph.png' />
  <Container style={{ marginTop: '1em' }}>
    <Grid>
      <Grid.Column floated='left' width={8}>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
        <Examples />
        <QueryEditor />
        <Results />
      </Grid.Column>
      <Grid.Column floated='right' width={8}>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
        <EditorCursorDetails />>
        <div id="editor-container" style={{height: '100vh', maxHeight: '60vh' }} 
        // style={{height: '600px', width: '100%'}} className="flex-item"
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
