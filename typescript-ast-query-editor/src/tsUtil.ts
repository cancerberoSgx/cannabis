import { IPosition, ISelection } from 'monaco-editor'
import * as ts from 'typescript'

export function tsRangeToMonacoSelection(sourceFile: ts.SourceFile, tsStart: number, tsEnd: number) {
  const start = ts.getLineAndCharacterOfPosition(sourceFile, tsStart)
  const end = ts.getLineAndCharacterOfPosition(sourceFile, tsEnd)
  return {
    selectionStartColumn: start.character + 1,
    selectionStartLineNumber: start.line + 1,
    positionColumn: end.character + 1,
    positionLineNumber: end.line + 1
  } as ISelection
}

export function monacoSelectionToTsRange(sourceFile: ts.SourceFile, sel: ISelection) {
  const pos = ts.getPositionOfLineAndCharacter(sourceFile, sel.selectionStartLineNumber - 1, sel.selectionStartColumn - 1)
  const end = ts.getPositionOfLineAndCharacter(sourceFile, sel.positionLineNumber - 1, sel.positionColumn - 1)
  return {
    pos, end
  } as ts.TextRange
}

export function monacoPositionToTsPosition(sourceFile: ts.SourceFile, p: IPosition) {
  return ts.getPositionOfLineAndCharacter(sourceFile, p.lineNumber - 1, p.column - 1)
}
