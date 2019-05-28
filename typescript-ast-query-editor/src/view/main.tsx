import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { initMonacoWorkers } from '../editor/monaco'
import {App} from './app'




function main() {
  initMonacoWorkers()
  render(<App />, document.getElementById('main'))
}


main()
