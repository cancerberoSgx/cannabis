import { FileSystemHost, Project, ts } from 'ts-morph'
import { importProjectFromDirectory } from './importDirectory'
import { lib_es2015_core_d_ts } from './tsLibraries/lib_es2015_core_d_ts'
import { lib_es2015_iterable_d_ts } from './tsLibraries/lib_es2015_iterable_d_ts'
import { lib_es2015_symbol_d_ts } from './tsLibraries/lib_es2015_symbol_d_ts'
import { lib_es5_d_ts } from './tsLibraries/lib_es5_d_ts'

export async function createBrowserProjectFromDirectory(options: { dir: string, compilerOptions?: Partial<ts.CompilerOptions> }) {
  const project = createBrowserProject()
  await importProjectFromDirectory(options.dir, project.getFileSystem())
  project.addSourceFilesFromTsConfig('/tsconfig.json')
  return project
}

export function createBrowserProject(options: { compilerOptions?: Partial<ts.CompilerOptions>, fs?: FileSystemHost, tsconfigFilePath?: string } = {}) {
  const projectOptions = {
    useVirtualFileSystem: true,
    ...{
      ...options.tsconfigFilePath ? {
        tsconfigFilePath: options.tsconfigFilePath,
        addFilesFromTsConfig: true
      } : {}
    },
    compilerOptions: {
      ...options.compilerOptions || {},
      target: ts.ScriptTarget.ES2016,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.React,
      libs: ['es2015'],
    }
  }
  const project = new Project(projectOptions)
  installDependencies(project)
  return project
}

function installDependencies(project: Project) {
  project.getFileSystem().writeFileSync(`node_modules/typescript/lib/lib.es2015.symbol.d.ts`, lib_es2015_symbol_d_ts)
  project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts)
  project.createSourceFile('lib.es2015.core.d.ts', lib_es2015_core_d_ts)
  project.createSourceFile('lib.es2015.iterable.d.ts', lib_es2015_iterable_d_ts)
}

