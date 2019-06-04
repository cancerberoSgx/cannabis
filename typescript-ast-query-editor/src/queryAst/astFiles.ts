import { tsMorph } from 'cannabis'
import { getFile } from 'cannabis/dist/src/file'
import { getStore } from '../app/store'
import { getCodeEditorText } from '../editor/ts/codeEditor'

let sourceFile: tsMorph.SourceFile | undefined
let text: string | undefined
let dirty = true
let firstTime = true

export function setDirty(d: boolean = true) {
  dirty = d
}

export function getSourceFile() {
  if (firstTime) {
    const project = createProject()
    firstTime = false
  }
  if (!sourceFile || dirty) {
    dirty = false
    const newText = getCodeEditorText()
    if (newText !== text) {
      text = newText
      sourceFile = getFile(text) as tsMorph.SourceFile
      getStore().setState({ currentEditorAst: sourceFile })
    }
  }
  return sourceFile!
}

function createProject() {

}
