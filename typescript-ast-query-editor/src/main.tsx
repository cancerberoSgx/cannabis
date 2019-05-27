import * as React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { examples } from './examples'
import { initMonacoWorkers } from './monaco'

function start() {
  initMonacoWorkers()

  const d2 = document.createElement('div')
  d2.setAttribute('id', 'app-root')
  document.body.appendChild(d2)

  const app = <App examples={examples} />
  render(app, d2)
}

start()

window.addEventListener('load', e=>{
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vw', `${vw}px`);
})

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
})