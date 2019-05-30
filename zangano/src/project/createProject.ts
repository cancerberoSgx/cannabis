import { Project, ts, FileSystemHost } from 'ts-morph'
import { lib_es2015_core_d_ts } from './tsLibraries/lib_es2015_core_d_ts'
import { lib_es2015_iterable_d_ts } from './tsLibraries/lib_es2015_iterable_d_ts'
import { lib_es2015_symbol_d_ts } from './tsLibraries/lib_es2015_symbol_d_ts'
import { lib_es5_d_ts } from './tsLibraries/lib_es5_d_ts'
import { VirtualFileSystemHostConstructor } from './VirtualFileSystemHost';
import { importDirectoryFromBrowserDir } from './importDirectory';
import { pathJoin } from 'misc-utils-of-mine-generic';
import { ok } from 'assert';

// export async function createProjectFromBrowserDir(options: {dir: string, compilerOptions?: Partial<ts.CompilerOptions>}) {
//   const fs = new VirtualFileSystemHostConstructor()
//   await importDirectoryFromBrowserDir(options.dir, fs)
//   const f1 = fs.readFileSync(pathJoin(options.dir,'tsconfig.json'))
//   ok  (f1.includes(`"compilerOptions":`))
//   const project = createVirtualFilesystemProject({fs, tsconfigFilePath: pathJoin(options.dir, 'tsconfig.json')})
//   return project
// } 

export async function createProjectFromBrowserDir2(options: {dir: string, compilerOptions?: Partial<ts.CompilerOptions>}) {
  const project = createVirtualFilesystemProject()
  await importDirectoryFromBrowserDir(options.dir, project.getFileSystem())
  // const f1 = project.getFileSystem().readFileSync(pathJoin('/tsconfig.json'))
  // ok  (f1.includes(`"compilerOptions":`))
  project.addSourceFilesFromTsConfig('/tsconfig.json')
  return project
}
export function createVirtualFilesystemProject(options: {compilerOptions?: Partial<ts.CompilerOptions>, fs?: FileSystemHost, tsconfigFilePath?: string}={}) {
  const projectOptions = {
    useVirtualFileSystem: true,
    ...{...options.tsconfigFilePath ? {
      tsconfigFilePath: options.tsconfigFilePath, 
      addFilesFromTsConfig: true
    } : {}},
    compilerOptions: {
      ...options.compilerOptions || {},
      target: ts.ScriptTarget.ES2016,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.React,
      libs: ['es2015'],
    }
  }
  const project = new Project(projectOptions)
  installDependencies( project);
  return project
}

function installDependencies( project: Project) {
  project.getFileSystem().writeFileSync(`node_modules/typescript/lib/lib.es2015.symbol.d.ts`, lib_es2015_symbol_d_ts);
  project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts);
  project.createSourceFile('lib.es2015.core.d.ts', lib_es2015_core_d_ts);
  project.createSourceFile('lib.es2015.iterable.d.ts', lib_es2015_iterable_d_ts);
}

