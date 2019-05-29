import { Project, ts } from 'ts-morph';
import { lib_es2015_symbol_d_ts } from './tsLibraries/lib_es2015_symbol_d_ts';
import { lib_es5_d_ts } from './tsLibraries/lib_es5_d_ts';
import { lib_es2015_core_d_ts } from './tsLibraries/lib_es2015_core_d_ts';
import { lib_es2015_iterable_d_ts } from './tsLibraries/lib_es2015_iterable_d_ts';
export function createProject(options?: Partial<ts.CompilerOptions>) {
  const project = new Project({
    useVirtualFileSystem: true,
    compilerOptions: {
      ...options || {},
      target: ts.ScriptTarget.ES2016,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.React,
      libs: ['es2015'],
    }
  });
  const fs = project.getFileSystem();
  fs.writeFileSync(`node_modules/typescript/lib/lib.es2015.symbol.d.ts`, lib_es2015_symbol_d_ts);
  project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts);
  project.createSourceFile('lib.es2015.core.d.ts', lib_es2015_core_d_ts);
  project.createSourceFile('lib.es2015.iterable.d.ts', lib_es2015_iterable_d_ts);
  return project;
}
