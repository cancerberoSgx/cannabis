import { ASTFile, createSourceFile } from 'cannabis'
import { getEditorText } from '../editor/monaco'
import { debug } from '../app/dispatchers';
import { getStore } from '../app/store';

let sourceFile: ASTFile | undefined
let text: string|undefined
let dirty = true

export function setDirty(d: boolean = true) {
  dirty = d
}

export function getSourceFile() {
  if (!sourceFile || dirty) {
    dirty = false
    const newText = getEditorText()
    if(newText!==text){
      text = newText
      sourceFile = createSourceFile(text)
      getStore().setState({currentEditorAst: sourceFile })
    }
  }
  return sourceFile!
}
