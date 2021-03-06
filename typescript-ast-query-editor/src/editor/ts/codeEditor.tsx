import { tsMorph } from 'cannabis'
import * as monaco from 'monaco-editor'
import { IPosition, ISelection } from 'monaco-editor'
import { codeExamples } from '../../app/examples'
import { getStore } from '../../app/store'
import { getSourceFile, setDirty } from '../../queryAst/astFiles'
import { findDescendantContainingRangeLight, monacoPositionToTsPosition, tsRangeToMonacoSelection } from './tsUtil'

let el: HTMLElement | undefined
export function installCodeEditor(editorContainer: HTMLElement) {
  const code = codeExamples[0].content
  const editor = installEditor(code, editorContainer)
  getCodeEditor()!.onDidChangeCursorPosition(e => {
    getStore().setState({
      nodeAtPosition: getNodeAtPosition(e.position)
    })
  })
  editor.getModel()!.onDidChangeContent(e => { setDirty() })
  el = editorContainer
}

export function getCodeEditorContainerEl() {
  return el
}

export function highlightNodesInEditor(result: tsMorph.Node[]): any {
  const selections: ISelection[] = result.map(node => {
    return tsRangeToMonacoSelection(node.getSourceFile(), node.getFullStart(), node.getEnd())
  })
  select(selections)
}

export function select(selections: monaco.ISelection[]) {
  const ed = getCodeEditor()!
  ed.setSelections(selections)
  ed.revealLines(selections[0].selectionStartLineNumber, selections[selections.length - 1].selectionStartLineNumber, monaco.editor.ScrollType.Smooth)
  window.scrollTo({ top: 0 })
}

export function getCodeEditorText() {
  return editor.getModel()!.getValue()
}

export function setCodeEditorText(s: string) {
  return editor.getModel()!.setValue(s)
}

let editor: monaco.editor.IStandaloneCodeEditor

function getCodeEditor() {
  if (!editor) {
    throw new Error('Editor not initialized, installEditor needs to be called first.')
  }
  return editor
}

function installEditor(code: string, containerEl: HTMLElement) {
  if (editor) {
    return editor
  }
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: monaco.languages.typescript.JsxEmit.React,
  })

  editor = monaco.editor.create(containerEl, {
    model: monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.tsx')),
    language: 'typescript',
    wordWrap: 'on',
    minimap: { enabled: false, }
  })

  return editor
}

function getNodeAtPosition(pos: IPosition, sourceFile?: tsMorph.SourceFile) {
  const p = monacoPositionToTsPosition(sourceFile || getSourceFile(), pos)
  if (typeof p === 'undefined') {
    return
  }
  return findDescendantContainingRangeLight(sourceFile || getSourceFile(), { pos: p, end: p + 1 })
}
 