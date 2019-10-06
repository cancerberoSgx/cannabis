import { tsMorph, getDiagnosticMessage } from 'ts-simple-ast-extra'

export function getDiagnosticMessages(project: tsMorph.Project) {
  return project
    .getPreEmitDiagnostics()
    .map(d => getDiagnosticMessage(d))
}
