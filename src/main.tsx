import { installEditor, initMonacoWorkers } from './monaco';
import * as React from 'react'
import { App } from './app';

function start(){
  initMonacoWorkers()
  const d = document.createElement('div')
  d.setAttribute('id', 'app-root')
  document.body.appendChild(d)
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
  installEditor(code, d)

  const d2 = document.createElement('div')
  d2.setAttribute('id', 'app-root')
  document.body.appendChild(d2)

  const app = <App examples={examples}/>
}

export interface Example{
  query: string,
  description: string
}
export const examples: Example[] = [
  {
    query: '// *',
    description: 'all nodes'
  },
  {
    query:'// Identifier [../ClassDeclaration] ',
    description: 'identifiers direct children of a class declaration. Result: Identifier "C"'
  },
  {
    query:'// Identifier [ ../ClassDeclaration || ../MethodDeclaration || ../PropertyDeclaration ] ',
    description: ' identifiers direct children of a class declaration. Result: Identifier "C" , Identifier "attribute1", Identifier "method1"'
  },
]

start()
