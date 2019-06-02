import { tsMorph } from 'cannabis'
import { IPosition, ISelection } from 'monaco-editor'
import { codeExamples } from '../../app/examples'
import { getSourceFile, setDirty } from '../../queryAst/astFiles'
import { findDescendantContainingRangeLight, monacoPositionToTsPosition, monacoSelectionToTsRange, tsRangeToMonacoSelection } from './tsUtil'

export function installCodeEditor(editorContainer: HTMLElement) {
  const code = codeExamples[0].content
  const editor = installEditor(code, editorContainer)
  getCodeEditor()!.onDidChangeCursorPosition(e => {
    getStore().setState({
      nodeAtPosition: getNodeAtPosition(e.position)
    })
  })
  editor.getModel()!.onDidChangeContent(e => { setDirty() })
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

import * as monaco from 'monaco-editor'
import { getStore } from '../../app/store';

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

// function getNodesInSelection(s: ISelection, sourceFile: tsMorph.SourceFile) {
//   const r = monacoSelectionToTsRange(sourceFile || getSourceFile(), s)
//   return findDescendantContainingRangeLight(sourceFile || getSourceFile(), r)
// }
