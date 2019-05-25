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

  const editorContainer = document.getElementById("editor-container")!

  const code = `
import {Foo, bar} from './aux'
export class C {
  private attribute1: number
  constructor(public id: string = bar()){
    this.attribute1 = 2
  }
  method1(a: number){
    return new Foo(a).value();
  }
}
`
  installEditor(code, editorContainer)

}

start()
