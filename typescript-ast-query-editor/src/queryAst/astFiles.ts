import { ASTFile, createSourceFile } from 'cannabis'
import { getEditorText } from '../editor/monaco'
import { debug } from '../app/dispatchers';

let sourceFile: ASTFile | undefined
let dirty = true
export function setDirty(d: boolean = true) {
  dirty = d
}

export function getSourceFile() {
  if (!sourceFile || dirty) {
    debug('createSourceFile()')
    sourceFile = createSourceFile(getEditorText())
    dirty = false
  }
  return sourceFile!
}
