import { IPosition, ISelection } from 'monaco-editor'
import * as ts from 'typescript'
import { tsMorph, isSourceFile } from 'ts-simple-ast-extra';

/** 
 * Same as [[findSmallestDescendantContainingRange]] but nto so strict r.pos <= n.start <=  r.end <= n.end.
 */
export function findDescendantContainingRangeLight(sourceFile: tsMorph.SourceFile, r: ts.TextRange): tsMorph.Node | undefined {
  function find(node: tsMorph.Node): tsMorph.Node | undefined {
    if (r.pos >= node.getStart() && r.end <= node.getEnd()) {
      return node.forEachChild(find) || node
    }
  }
  return find(sourceFile)
}

export function tsRangeToMonacoSelection(sourceFile: ts.SourceFile|tsMorph.SourceFile, tsStart: number, tsEnd: number) {
  sourceFile = isSourceFile(sourceFile) ? sourceFile.compilerNode : sourceFile
  const start = ts.getLineAndCharacterOfPosition(sourceFile, tsStart)
  const end = ts.getLineAndCharacterOfPosition(sourceFile, tsEnd)
  return {
    selectionStartColumn: start.character + 1,
    selectionStartLineNumber: start.line + 1,
    positionColumn: end.character + 1,
    positionLineNumber: end.line + 1
  } as ISelection
}

export function monacoSelectionToTsRange(sourceFile: ts.SourceFile|tsMorph.SourceFile, sel: ISelection) {
  sourceFile = isSourceFile(sourceFile) ? sourceFile.compilerNode : sourceFile
  const pos = ts.getPositionOfLineAndCharacter(sourceFile, sel.selectionStartLineNumber - 1, sel.selectionStartColumn - 1)
  const end = ts.getPositionOfLineAndCharacter(sourceFile, sel.positionLineNumber - 1, sel.positionColumn - 1)
  return {
    pos, end
  } as ts.TextRange
}

export function monacoPositionToTsPosition(sourceFile: tsMorph.SourceFile, p: IPosition) {
  return ts.getPositionOfLineAndCharacter(sourceFile.compilerNode, p.lineNumber - 1, p.column - 1)
}
