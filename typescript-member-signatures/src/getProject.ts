import { setProject } from 'cannabis'
import { readFileSync } from 'fs'
import { sync } from 'glob'
import { basename } from 'path'
import { Directory, Project } from 'ts-morph'
import { Options } from './types'


export function getProject(o: Options) {
  let p: Project
  if (o.project) {
    p = new Project({ tsConfigFilePath: o.project, addFilesFromTsConfig: true })
  }
  else {
    p = new Project()
    p.createDirectory('src')
  }
  const root = setProject(p).getRootDirectory() as Directory
  if (o.files) {
    sync(o.files).forEach(f => {
      root.createSourceFile(basename(f), readFileSync(f).toString())
    })
  }
  return root
}
