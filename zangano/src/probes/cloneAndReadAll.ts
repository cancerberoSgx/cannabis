import * as git from 'isomorphic-git'
import {clone as cloneFn} from 'isomorphic-git'
const FS = require('@isomorphic-git/lightning-fs')

type Options = Partial<Parameters<typeof cloneFn>[0]>

async function clone(options: Options={}) {

  const defaultOptions = {
    dir:   '/tutorial',
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  } 

  const allOptions = {...defaultOptions, ...options}

  const Window = window as any
  // Initialize isomorphic-git with a file system
  const fs = Window.fs = new FS('fs', { wipe: true })
  git.plugins.set('fs', Window.fs)
  // I prefer using the Promisified version honestly
  const pfs = Window.pfs = Window.fs.promises

  const dir = Window.dir = allOptions.dir
  // console.log(dir)
  console.log(await pfs.mkdir(dir))
  // Behold - it is empty!
  // console.log(await pfs.readdir(dir))

  console.log(await git.clone(allOptions))

  // Now it should not be empty...
  // console.log(await pfs.readdir(dir))

  console.log(await git.log({ dir }))

  // console.log(await git.status({ dir, filepath: 'README.md' }))


}

function readAllFiles(dir:string, visitor: (fileName:string, contents: string)=>boolean){

}

