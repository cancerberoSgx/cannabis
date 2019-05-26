import { IPosition, ISelection } from 'monaco-editor'
import * as ts from 'typescript'
import { findChildContainingRangeLight } from 'typescript-ast-util'
import { getMonacoInstance, installEditor } from './monaco'
import { getSourceFile, setDirty } from './tsAstqAdapter'
import { monacoPositionToTsPosition, monacoSelectionToTsRange, tsRangeToMonacoSelection } from './tsUtil'

export function installCodeEditor(editorContainer: HTMLElement) {
  const code = `
import {Foo, bar, zok, puff} from './aux'
export class C {
  private attribute1: number
  constructor(public id: string = bar()){
    this.attribute1 = 2
  }
  method1(a: number){
    return new Foo(a).value();
  }
  secondMethod(...args: any[]){
    const a = []
    function f (){
      for(let i in puff){
        a.push(i)
      }
    }
    f()
    zok(a, ...args)
  }
}   
  `
  const editor = installEditor(code, editorContainer)
  editor.getModel()!.onDidChangeContent(e => setDirty)
}

export function highlightNodesInEditor(result: ts.Node[]): any {
  const ed = getMonacoInstance()!
  const selections: ISelection[] = result.map(node => {
    return tsRangeToMonacoSelection(node.getSourceFile(), node.getFullStart(), node.getEnd())
  })
  ed.setSelections(selections)
}

export function getTsPosition(p: IPosition, sourceFile: ts.SourceFile = getSourceFile()) {
  return monacoPositionToTsPosition(sourceFile, p)
}

export function getNodesAtPosition(pos: IPosition, sourceFile = getSourceFile()) {
  const p = getTsPosition(pos, sourceFile)
  return findChildContainingRangeLight(sourceFile, { pos: p, end: p })
}

export function getNodesInSelection(s: ISelection, sourceFile = getSourceFile()) {
  const r = monacoSelectionToTsRange(sourceFile, s)
  return findChildContainingRangeLight(sourceFile, r)
}
