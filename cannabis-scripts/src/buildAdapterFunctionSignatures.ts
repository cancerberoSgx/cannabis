import {Project} from 'ts-morph'
import { resolve } from 'path';

interface Options {
  tsConfigFilePath: string
  file: string
  // target
}
export function extractMethodSignatureDocs(o: Options){
  const p = new Project({tsConfigFilePath: o.tsConfigFilePath, addFilesFromTsConfig: true})
  const fr = resolve(o.file)
const f =   p.getSourceFiles().find(f=>resolve(f.getFilePath())==fr)

}