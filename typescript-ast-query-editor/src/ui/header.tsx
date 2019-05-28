import * as React from 'react'
import { AbstractComponent } from './component'
import './header.css'

export class Header extends AbstractComponent {

  render() {
    return (
      <div className="flex-item header">
        {/* <h3><a href="">Typescript AST Queries playground</a></h3> */}
        <ul>
          <li><a href="default.asp">Home</a></li>
          <li><a href="news.asp">News</a></li>
          <li><a href="contact.asp">Contact</a></li>
          <li><a href="about.asp">About</a></li>
        </ul>
      </div>
    )
  }
}


