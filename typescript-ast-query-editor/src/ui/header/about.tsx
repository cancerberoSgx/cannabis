import * as React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
export class About extends AbstractComponent {

  render() {
    return (
      <Segment>
        <h3>About</h3>
        <p>Welcome to This TypeScript / JavaScript Abstract Syntax Tree Query application.</p>

        <p>Currently a research project experimenting with these technologies:</p>
          
        <ul>
          <li>ASTQ: A promising agnostic AST parser and query library with its own syntax, powerful query language, execution trace support. In general I made this project because I wanted to master this.</li>
          <li>monaco-editor: I'm presenting not only TypeScript code but also a custom language for ASTQ Query syntax. Not only supports syntax highlight but also, snippets, and tooltip helps when hovering elements (like jsdocs). Snippets:
            
            <ul>
              <li>Press "pa</li>
              </ul> </li>
        <li>ts-morph</li>
        </ul>
      </Segment>
    )
  }
}
