import { tsMorph } from 'ts-simple-ast-extra';

export function getDiagnosticMessages(project: tsMorph.Project) {
  return project
    .getPreEmitDiagnostics()
    .map(d => getDiagnosticMessage(d));
}

function getDiagnosticMessage(d: tsMorph.Diagnostic) {
  const s = d.getMessageText();
  return `${d.getSourceFile() && d.getSourceFile()!.getBaseName()}: ${typeof s === 'string' ? s : print(s.getNext())}`;
}

function print(s: tsMorph.DiagnosticMessageChain | undefined): string {
  if (!s) {
    return '';
  }
  else {
    return `${s.getMessageText()} - ${print(s.getNext())}`;
  }
}
