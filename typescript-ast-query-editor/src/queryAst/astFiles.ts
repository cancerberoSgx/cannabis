import { ASTFile, createSourceFile } from 'cannabis'
import { getEditorText } from '../editor/monaco'

let sourceFile: ASTFile | undefined
let dirty = true
export function setDirty(d: boolean = true) {
  dirty = d
}

export function getSourceFile() {
  if (!sourceFile || dirty) {
    sourceFile = createSourceFile(getEditorText())
    dirty = false
  }
  return sourceFile!
}
