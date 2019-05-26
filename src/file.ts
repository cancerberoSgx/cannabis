import { tsMorph } from 'ts-simple-ast-extra'
import { unique } from './util'

let file: tsMorph.SourceFile | undefined
let project: tsMorph.Project | undefined
let reuseProject = true
// let reuseFile = false
export function getFile(code: string) {
  if (!reuseProject || !project) {
    project = new tsMorph.Project({})
  }
  // if (  !file) {
  // if(file){
  //   file.delete()
  // }
  file = project.createSourceFile(`${unique('cannabis_test_file_')}.ts`, code)
  // }
  // else  {
  //   file = file.replaceWithText(code) as tsMorph.SourceFile;
  // }
  return file!
}

export function getTsMorphFile(code: string = '') {
  return getFile(code)
}

// export function getTsFile(code: string = '') {
//   return getFile(code).compilerNode
// }
