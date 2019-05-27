import * as React from 'react'
import { render } from 'react-dom'
import { Container, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import { SidebarExampleMultiple } from './sidebar';
import { MyHeader } from './header';
import { MyBody } from './body';

const App = () => (
  <Container fluid textAlign="left">
    <MyHeader></MyHeader>
    <SidebarExampleMultiple>
<MyBody/>
    </SidebarExampleMultiple>
  </Container>
)

export default App
render(<App />, document.getElementById('main'))


