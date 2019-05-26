import { installEditor, initMonacoWorkers } from './monaco';
import * as React from 'react'
import {render} from 'react-dom'
import { App } from './app';
import { examples } from './examples';

function start(){
  initMonacoWorkers()

  const d2 = document.createElement('div')
  d2.setAttribute('id', 'app-root')
  document.body.appendChild(d2)

  const app = <App examples={examples}/>
  render(app, d2) 
}

start()



