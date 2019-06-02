import * as React from 'react'
import { Button, TextArea } from 'semantic-ui-react'
import { debug } from '../../app/dispatchers'
import { State } from '../../app/store'
import { executeQuery } from "../../queryAst/executeQuery"
import { AbstractComponent, AbstractProps } from '../component'
import { getQueryEditorText, updateQueryEditorUI, installQueryEditor } from '../../editor/query/queryEditor';

let  el: HTMLDivElement | null = null
export class QueryEditor extends AbstractComponent {
  // el: HTMLDivElement | null = null
  editorContainer: React.RefObject<HTMLDivElement>;
  // editor: any;
  // shouldComponentUpdate() {
  //   return false
  // }
  // w
  // static counter = 0
  // containerDidMount(el: HTMLDivElement|null){
  //   this.el = el
  //   // debugger
  //   // if(this.el) {

  //     const id = this.el && this.el.getAttribute('id')
  //     const id2 = this.editorContainer.current && this.editorContainer.current.getAttribute('id')
  //     console.log(id);

  //     // const queryEditorContainer = document.getElementById("query-editor-container")!
  //     // }else {

  //       // }


  //     }
  componentDidMount() {
    // const id2 = this.editorContainer.current && this.editorContainer.current.getAttribute('id')
    // debugger
    if (!el && this.editorContainer.current) {
      el = this.editorContainer.current!
       installQueryEditor('// Identifier [@text ≠~ "Cool"]', el)
    }
    else if (el&& this.editorContainer.current!!==el) {
      // this.editorContainer.current!.replaceWith(this.el)
      updateQueryEditorUI(this.editorContainer.current!)
    }
    // this.editorContainer.c
    // document.body.a
  }

  componentWillUnmount() {
    // debugger
    if(el && this.editorContainer.current!==el){
      el.remove()
    }
    // if(this.el){
    // this.el.remove()
    // }
  }
  constructor(p: AbstractProps, s: State) {
    super(p, s)
    this.editorContainer = React.createRef<HTMLDivElement>()
  }
  render() {
    debug('QueryEditor render')
    return (
      < >
        <div
        id="editor-query-browser"
          // id={'ii'+QueryEditor.counter++} 
          // ref={ref=>this.containerDidMount(ref)}
          ref={this.editorContainer}

          style={{ height: '100vh', maxHeight: '180px', margin: 0, padding: 0, width: '100%' }}></div>
      </>
    )
  }
}
