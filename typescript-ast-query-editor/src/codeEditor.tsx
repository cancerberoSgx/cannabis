import { IPosition, ISelection } from 'monaco-editor'
import { getMonacoInstance, installEditor } from './monaco'
import { getSourceFile, setDirty } from './tsAstqAdapter'
import { monacoPositionToTsPosition, monacoSelectionToTsRange, tsRangeToMonacoSelection, findDescendantContainingRangeLight } from './tsUtil'
import { codeExamples } from './examples';
import { tsMorph } from 'ts-simple-ast-extra';

export function installCodeEditor(editorContainer: HTMLElement) {
  const code = codeExamples[0].content
  const editor = installEditor(code, editorContainer)
  editor.getModel()!.onDidChangeContent(e => setDirty)
}

export function highlightNodesInEditor(result: tsMorph.Node[]): any {
  const ed = getMonacoInstance()!
  const selections: ISelection[] = result.map(node => {
    return tsRangeToMonacoSelection(node.getSourceFile(), node.getFullStart(), node.getEnd())
  })
  ed.setSelections(selections)
}

export function getTsPosition(p: IPosition, sourceFile: tsMorph.SourceFile = getSourceFile()) {
  return monacoPositionToTsPosition(sourceFile, p)
}

export function getNodesAtPosition(pos: IPosition, sourceFile = getSourceFile()) {
  const p = getTsPosition(pos, sourceFile)
  return findDescendantContainingRangeLight(sourceFile, { pos: p, end: p })
}

export function getNodesInSelection(s: ISelection, sourceFile = getSourceFile()) {
  const r = monacoSelectionToTsRange(sourceFile, s)
  return findDescendantContainingRangeLight(sourceFile, r)
}
