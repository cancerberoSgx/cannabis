import * as React from 'react'
import { getGeneralNodeKindName } from 'ts-simple-ast-extra'
import { highlightNodesInEditor } from '../../editor/codeEditor'
import { AbstractComponent } from '../component'

export class Results extends AbstractComponent {
  render() {
    return <div className="results">
      {this.state.result.length ? <div>
        <h3>Results</h3>
        <ul>
          {this.state.result.map((node, i) => <li key={i}><a onClick={e => highlightNodesInEditor([node])}>{getGeneralNodeKindName(node)}</a>
          </li>)}
        </ul>
      </div> :
        'No results'}
      {this.state.error && <div><strong>Error: </strong><br /><pre>
        {this.state.error + ''}
      </pre></div>}
    </div>
  }
}
