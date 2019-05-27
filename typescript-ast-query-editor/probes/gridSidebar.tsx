import * as React from 'react'
import { render } from 'react-dom'
import { Grid, Image, Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

const GridExampleFloated = () => (
  <Container style={{ marginTop: '3em' }}>
  <Header as='h1'>Theming Examples</Header>

  <Header as='h2' dividing>
    Site
  </Header>

  <Grid>
    <Grid.Column floated='left' width={8}>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Grid.Column>
    <Grid.Column floated='right' width={8}>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Grid.Column>
  </Grid>
  </Container>
)

export default GridExampleFloated
render(<GridExampleFloated/>, document.getElementById('main'))