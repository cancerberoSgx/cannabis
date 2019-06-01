import { getStore } from '../app/store'
import { getEditorText } from '../editor/monaco'
import { getFile } from 'cannabis/dist/src/file';
import { ASTNode, tsMorph } from 'cannabis';

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
    const newText = getEditorText()
    if (newText !== text) {
      text = newText
      sourceFile = getFile(text) as  tsMorph.SourceFile
      getStore().setState({ currentEditorAst: sourceFile })
    }
  }
  return sourceFile!
}

function createProject() {
  // const project = new tsMorph.Project({
  //   useVirtualFileSystem: true,
  //   compilerOptions: {
  //     target: ts.ScriptTarget.ES2016,
  //     moduleResolution: ts.ModuleResolutionKind.NodeJs,
  //     jsx: ts.JsxEmit.React,
  //     libs: ['es2015', 'dom'],
  //   },
  // })
  // const fs: tsMorph.FileSystemHost = project.getFileSystem()
}
