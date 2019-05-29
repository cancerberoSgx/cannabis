import * as React from 'react'
import { Header, Segment, Select, Dropdown } from 'semantic-ui-react'
import { codeExamples, examples } from "../../app/examples"
import { setEditorText } from '../../editor/monaco'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from "../component"


export class Examples extends AbstractComponent {
  render() {
    return (<Segment basic>
      <Header as="h4">Example Gallery</Header>
      <Dropdown
    placeholder='Select an Example'
    fluid
    search
    selection
    closeOnChange
    selectOnNavigation={false}
    onChange={(e, props)=>{ 
      const selectedExample = this.state.examples.find(ex => ex.query === props.value)!
      debugger
      if (selectedExample.code) {
        const code = codeExamples.find(c => c.name === selectedExample.code)
        code && setEditorText(code.content)
      }
      executeQuery(selectedExample)
    }}
    options={examples.map(e=>({
      key: e.name, value: e.query, text: e.name
    }))}
  />
     
      <p><strong>Example description</strong>: {this.state.selectedExample.description}</p>
    </Segment>)
  }
}
