import {Project} from 'ts-morph'
import { setProject, queryAst } from 'cannabis';

interface Options {
  tsConfigFilePath: string
  // file: string
  targetPattern: string
}
export function extractMethodSignatureDocs(o: Options){
  const p = new Project({tsConfigFilePath: o.tsConfigFilePath, addFilesFromTsConfig: true})
  const root = setProject(p).getRootDirectory()
  const i = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.targetPattern}')]`, root)
  // const i = 
  // queryAst('//InterfaceDeclaration []', root)

  // const fr = resolve(o.file)
// const f =   p.getSourceFiles().find(f=>resolve(f.getFilePath())==fr)

}