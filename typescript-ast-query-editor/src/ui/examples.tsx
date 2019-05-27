import * as React from 'react'
import { codeExamples } from "../editor/examples"
import { setEditorText } from '../editor/monaco'
import { executeQuery } from "../queryAst/executeQuery"
import { AbstractComponent } from "./component"


export class Examples extends AbstractComponent {
  render() {
    return (<div>
      <select onChange={e => {
        const selectedExample = this.state.examples.find(ex => ex.query === e.currentTarget.value)!
        if (selectedExample.code) {
          const code = codeExamples.find(c => c.name === selectedExample.code)
          code && setEditorText(code.content)
        }
        executeQuery(selectedExample)
      }}>{this.state.examples.map(example => <option value={example.query} key={example.query}>{example.name}</option>)}
      </select>
      <blockquote><strong>Example description</strong>: {this.state.selectedExample.description}</blockquote>
    </div>)
  }
}
