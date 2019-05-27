import * as React from 'react'
import { render } from 'react-dom'
import { Container, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import { SidebarExampleMultiple } from './sidebar';
import { MyHeader } from './header';
import { MyBody } from './body';
import App from './app';
import { initMonacoWorkers } from '../editor/monaco';




function main() {
  initMonacoWorkers();
  render(<App />, document.getElementById('main'));
}


main();