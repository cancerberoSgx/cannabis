import { IPosition, ISelection } from 'monaco-editor'
import { tsMorph } from 'ts-simple-ast-extra'
import { codeExamples } from './examples'
import { getMonacoInstance, installEditor } from './monaco'
import { getSourceFile, setDirty } from './tsAstqAdapter'
import { findDescendantContainingRangeLight, monacoPositionToTsPosition, monacoSelectionToTsRange, tsRangeToMonacoSelection } from './tsUtil'

export function installCodeEditor(editorContainer: HTMLElement) {
  const code = codeExamples[0].content
  const editor = installEditor(code, editorContainer)
  debugger
  editor.getModel()!.onDidChangeContent(e => { setDirty() })
}

export function highlightNodesInEditor(result: tsMorph.Node[]): any {
  const ed = getMonacoInstance()!
  const selections: ISelection[] = result.map(node => {
    return tsRangeToMonacoSelection(node.getSourceFile(), node.getFullStart(), node.getEnd())
  })
  ed.setSelections(selections)
}

export function getTsPosition(p: IPosition, sourceFile?: tsMorph.SourceFile) {
  return monacoPositionToTsPosition(sourceFile || getSourceFile(), p)
}

export function getNodesAtPosition(pos: IPosition, sourceFile?: tsMorph.SourceFile) {
  const p = getTsPosition(pos, sourceFile || getSourceFile())
  if (typeof p === 'undefined') {
    return
  }
  return findDescendantContainingRangeLight(sourceFile || getSourceFile(), { pos: p, end: p })
}

export function getNodesInSelection(s: ISelection, sourceFile: tsMorph.SourceFile) {
  const r = monacoSelectionToTsRange(sourceFile || getSourceFile(), s)
  return findDescendantContainingRangeLight(sourceFile || getSourceFile(), r)
}
