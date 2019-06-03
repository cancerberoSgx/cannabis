import * as monaco from 'monaco-editor'
import * as React from 'react'
import { State } from "../../app/state"
import { getQueryEditorText, installQueryEditor, updateQueryEditorUI } from '../../editor/query/queryEditor'
import { AbstractComponent, AbstractProps } from '../component'

let el: HTMLDivElement | null = null

export class QueryEditor extends AbstractComponent {
  protected editorContainer: React.RefObject<HTMLDivElement> | undefined
  constructor(p: AbstractProps, s: State) {
    super(p, s)
    this.editorContainer = React.createRef<HTMLDivElement>()
    this.onEditorCursorPositionChange = this.onEditorCursorPositionChange.bind(this)
    this.onEditorContentChange = this.onEditorContentChange.bind(this)
  }
  protected onEditorCursorPositionChange(e: monaco.editor.ICursorPositionChangedEvent) {
    this.setState({
      queryNodeAtPosition: undefined
    })
  }
  protected onEditorContentChange(e: monaco.editor.IModelContentChangedEvent) {
    if (this.state.selectedExample) {
      this.setState({
        selectedExample: {
          ...this.state.selectedExample,
          query: getQueryEditorText()
        }
      })
    }
  }
  componentDidMount() {
    // HACK: we store a reference to the original element and on the next umount/mount we call
    // updateQueryEditorUI so it will hide react-created-empty container element and append the real one. Ugly
    // anti-react-pattern hack - but I don't want to use a library for monaco-react anna need this working
    // asap.
    if (!el && this.editorContainer && this.editorContainer.current) {
      el = this.editorContainer.current!
      installQueryEditor({
        code: this.state.selectedExample.query,
        containerEl: el,
        onContentChange: this.onEditorContentChange,
        onCursorPositionChange: this.onEditorCursorPositionChange
      })
    }
    else if (el && this.editorContainer && this.editorContainer.current! !== el) {
      updateQueryEditorUI(this.editorContainer.current!)
    }
  }
  componentWillUnmount() {
    // HEADS UP: related to mentioned hack, we need to remove the real element from parent, if not react will
    // throw when it realizes we appended an extraneous child
    if (el && this.editorContainer && this.editorContainer.current !== el) {
      el.remove()
    }
  }
  render() {
    return (
      < >
        <div
          id="editor-query-browser"
          ref={this.editorContainer}
          style={{ height: '100vh', maxHeight: '140px', margin: 0, padding: 0, width: '100%' }}></div>
      </>
    )
  }
}
