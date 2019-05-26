import { tsMorph } from 'ts-simple-ast-extra';

let file: tsMorph.SourceFile | undefined;
let project: tsMorph.Project | undefined;

export function getFile(code?: string) {
  if (!file) {
    project = new tsMorph.Project({});
    file = project.createSourceFile('foo.ts', code);
  }
  else if (code) {
    file = file.replaceWithText(code) as tsMorph.SourceFile;
  }
  return file!;
}

export function getTsMorphFile(code?: string) {
  return getFile(code);
}

export function getTsFile(code?: string) {
  return getFile(code).compilerNode;
}
