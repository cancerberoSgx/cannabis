import { ASTFile, createSourceFile, queryAst } from 'cannabis'
import { getEditorText } from './monaco'


export function executeQuery(q: string) {
  const result = queryAst(q, getSourceFile())
  if (result.error) {
    console.error(result.error)
  }
  return result
}

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
