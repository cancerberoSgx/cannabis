import * as monaco from 'monaco-editor'
import * as React from 'react'
import { debug } from '../../app/dispatchers'
import { State } from '../../app/store'
import { getQueryEditorText, installQueryEditor, updateQueryEditorUI } from '../../editor/query/queryEditor'
import { AbstractComponent, AbstractProps } from '../component'

let el: HTMLDivElement | null = null
export class QueryEditor extends AbstractComponent {
  // el: HTMLDivElement | null = null
  editorContainer: React.RefObject<HTMLDivElement> | undefined
  onEditorCursorPositionChange(e: monaco.editor.ICursorPositionChangedEvent) {
    // editor!.onDidChangeCursorPosition(e => {
    this.setState({
      queryNodeAtPosition: undefined
    })
    // })
  }
  onEditorContentChange(e: monaco.editor.IModelContentChangedEvent) {
    // editor.getModel()!.onDidChangeContent(e => { 
    if (this.state.selectedExample) {
      this.setState({
        selectedExample: {
          ...this.state.selectedExample,
          query: getQueryEditorText()
        }
      })
    }
    // })
  }
  // editor: IStandaloneCodeEditor;
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
    if (!el && this.editorContainer && this.editorContainer.current) {
      el = this.editorContainer.current!
      installQueryEditor({
        code: '//  Identifier [@text ≠~ "Cool"]',
        containerEl: el,
        onContentChange: this.onEditorContentChange,
        onCursorPositionChange: this.onEditorCursorPositionChange
      })
    }
    else if (el && this.editorContainer && this.editorContainer.current! !== el) {
      // this.editorContainer.current!.replaceWith(this.el)
      updateQueryEditorUI(this.editorContainer.current!)
    }
    // this.editorContainer.c
    // document.body.a
  }

  componentWillUnmount() {
    // debugger
    if (el && this.editorContainer && this.editorContainer.current !== el) {
      el.remove()
    }
    // if(this.el){
    // this.el.remove()
    // }
  }
  constructor(p: AbstractProps, s: State) {
    super(p, s)
    this.editorContainer = React.createRef<HTMLDivElement>()
    this.onEditorCursorPositionChange = this.onEditorCursorPositionChange.bind(this)
    this.onEditorContentChange = this.onEditorContentChange.bind(this)
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
