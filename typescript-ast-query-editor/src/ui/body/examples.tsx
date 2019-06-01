import * as React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'
import { codeExamples, examples } from "../../app/examples"
import { State } from '../../app/store'
import { setEditorText } from '../../editor/monaco'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent } from "../component"
import { selectExample } from '../../app/dispatchers';
import { GetChildrenMode } from '../common/getChildrenMode';

export class Examples extends AbstractComponent {
  render() {
    return (<>
      <Header as="h4">Example Gallery</Header>
      <Dropdown
        placeholder='Select an Example'
        fluid
        search
        selection
        closeOnChange
        selectOnNavigation={false}
        onChange={(e, props) => {
          selectExample(props.value+'');
        }}
        value={this.state.selectedExample.query}
        options={examples.map(e => ({
          key: e.name, value: e.query, text: e.name
        }))}
      />
      {this.state.selectedExample ? <p><strong>Example description</strong>: {this.state.selectedExample.description}</p> : ''}
        <GetChildrenMode/>
    </>)
  }
  shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
    return nextState.getChildren !== this.state.getChildren ||nextState.selectedExample.query !== this.state.selectedExample.query 
  }
}
