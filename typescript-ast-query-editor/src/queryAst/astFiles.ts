import { ASTFile, createSourceFile } from 'cannabis'
import { getStore } from '../app/store'
import { getEditorText } from '../editor/monaco'

let sourceFile: ASTFile | undefined
let text: string | undefined
let dirty = true

export function setDirty(d: boolean = true) {
  dirty = d
}

export function getSourceFile() {
  if (!sourceFile || dirty) {
    dirty = false
    const newText = getEditorText()
    if (newText !== text) {
      text = newText
      sourceFile = createSourceFile(text)
      getStore().setState({ currentEditorAst: sourceFile })
    }
  }
  return sourceFile!
}
