import { FileSystemHost, Project, ts } from 'ts-morph'
import { importProjectFromDirectory } from './importDirectory'
import { lib_es2015_core_d_ts } from './tsLibraries/lib_es2015_core_d_ts'
import { lib_es2015_iterable_d_ts } from './tsLibraries/lib_es2015_iterable_d_ts'
import { lib_es2015_symbol_d_ts } from './tsLibraries/lib_es2015_symbol_d_ts'
import { lib_es5_d_ts } from './tsLibraries/lib_es5_d_ts'
import { exists, initPsmDir } from '../fs/util';
import { dirname, pathJoin } from 'misc-utils-of-mine-generic';

export async function createBrowserProjectFromDirectory(options: { dir: string, compilerOptions?: Partial<ts.CompilerOptions> }) {
  const {project} = await  createBrowserProject()
  await importProjectFromDirectory(options.dir, project.getFileSystem())
  project.addSourceFilesFromTsConfig('/tsconfig.json')
  return {project}
}

export async function createBrowserProject(options: { compilerOptions?: Partial<ts.CompilerOptions>, fs?: FileSystemHost, tsconfigFilePath?: string } = {}) {

  let pj:any
  if(options.tsconfigFilePath){
    const pfs = await initPsmDir()
    const pjt= await pfs.readFile(pathJoin(dirname(options.tsconfigFilePath), 'package.json'))
    pj = JSON.parse(pjt)
  }
  
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
  const result :Result={project, packageJson: pj, tsconfigFilePath: options.tsconfigFilePath}
  if(result.packageJson&& result.tsconfigFilePath){
    registerProjectOnFs(result as any)
  }
  return result
}
interface Result{project:Project, packageJson?: any, tsconfigFilePath?: string}

function installDependencies(project: Project) {
  project.createSourceFile('/node_modules/typescript/lib/lib.es5.d.ts', lib_es5_d_ts)
  project.createSourceFile('/node_modules/typescript/lib/lib.es2015.core.d.ts', lib_es2015_core_d_ts)
  project.createSourceFile('/node_modules/typescript/lib/lib.es2015.iterable.d.ts', lib_es2015_iterable_d_ts)
  project.getFileSystem().writeFileSync(`/node_modules/typescript/lib/lib.es2015.symbol.d.ts`, lib_es2015_symbol_d_ts)
}

export const REGISTER_FILE = '.zangano_projects.json'
async function registerProjectOnFs(re: Required<Result>) {
  const pfs = await initPsmDir()
  if(!(await exists(REGISTER_FILE))){
  await  pfs.writeFile(REGISTER_FILE, '[]')
  }
  let r = JSON.parse(await pfs.readFile(REGISTER_FILE))
  r=r.filter((e: any)=>name!==re.packageJson.name)
r.push({name: re.packageJson.name, version: re.packageJson.version, tsconfigFilePath: re.tsconfigFilePath, }) 
await pfs.writeFile(REGISTER_FILE, JSON.stringify(r))
}
async function loadProjectFromFs(re: Required<Result>) {
  const pfs = await initPsmDir()
  if(!(await exists(REGISTER_FILE))){
    return
  }
  let r = JSON.parse(await pfs.readFile(REGISTER_FILE))
  const data=r.find((e: any)=>name!==re.packageJson.name)
r.push({name: re.packageJson.name, version: re.packageJson.version, tsconfigFilePath: re.tsconfigFilePath, }) 
await pfs.writeFile(REGISTER_FILE, JSON.stringify(r))
}
