import * as monaco from 'monaco-editor'
import { IPosition, ISelection } from 'monaco-editor'
import { getMonacoInstance, installEditor } from './monaco'
import { findDescendantContainingRangeLight, monacoPositionToTsPosition, monacoSelectionToTsRange, tsRangeToMonacoSelection } from './tsUtil'
import { Node } from 'ts-morph';
import {createBrowserProject, tsMorph, ts} from 'zangano'
import { getStore } from '../app/store';

export function installCodeEditor(editorContainer: HTMLElement) {
  const editor = installEditor('code', editorContainer)
  editor.getModel()!.onDidChangeContent(e => { alert('not implemented'); 
  //setDirty() 
})
}

export function highlightNodesInEditor(result: tsMorph.Node[]): any {
  const selections: ISelection[] = result.map(node => {
    return tsRangeToMonacoSelection(node.getSourceFile(), node.getFullStart(), node.getEnd())
  })
  select(selections)
}

export function select(selections: monaco.ISelection[]) {
  const ed = getMonacoInstance()!
  ed.setSelections(selections)
  ed.revealLines(selections[0].selectionStartLineNumber, selections[selections.length - 1].selectionStartLineNumber, monaco.editor.ScrollType.Smooth)
  window.scrollTo({ top: 0 })
}

export function getNodeAtPosition(pos: IPosition, sourceFile?: tsMorph.SourceFile) {
  const p = monacoPositionToTsPosition(sourceFile || getStore().getState().currentSourceFile, pos)
  if (typeof p === 'undefined') {
    return
  }
  return findDescendantContainingRangeLight(sourceFile ||  getStore().getState().currentSourceFile, { pos: p, end: p + 1 })
}

export function getNodesInSelection(s: ISelection, sourceFile: tsMorph.SourceFile) {
  const r = monacoSelectionToTsRange(sourceFile ||  getStore().getState().currentSourceFile, s)
  return findDescendantContainingRangeLight(sourceFile ||  getStore().getState().currentSourceFile, r)
}
