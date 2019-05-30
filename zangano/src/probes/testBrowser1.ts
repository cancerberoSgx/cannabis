import * as git from 'isomorphic-git'
import { pathJoin, serial } from 'misc-utils-of-mine-generic'
import { VirtualFileSystemHostConstructor } from '../project/VirtualFileSystemHost';
import { importDirectoryFromBrowserDir } from '../project/importDirectory';
const FS = require('@isomorphic-git/lightning-fs')

async function testNode3() {
  const dir = '/tutorial'
  const pfs = await initPsmDir(dir)
  console.log(await git.clone({
    dir,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  }))
  console.log(await pfs.readdir(dir))
  console.log(await git.log({ dir }))
  console.log(await git.status({ dir, filepath: 'README.md' }))
}

async function initPsmDir(d: string) {
  const Window = window as any
  if (Window.fs && Window.pfs) { return Window.pfs }
  const fs = Window.fs = new FS('fs', { wipe: false })
  git.plugins.set('fs', Window.fs)
  const pfs = Window.pfs = Window.fs.promises
  const dir = Window.dir = d
  if (!(await (await pfs.stat(dir)).isDirectory())) {
    console.log(await pfs.mkdir(dir))
  }
  console.log(dir, await pfs.readdir(dir))
  return pfs
}


interface File {
  path: string, type: 'file' | 'directory', content?: string
}

async function visit(pfs: any, dir: string, visitor: (file: File) => boolean, parent: string = '') {
  const content = await pfs.readFile(dir)
  const stat = await pfs.stat(dir)
  const r = await visitor({
    path: dir, content, type: stat.isFile() ? 'file' : 'directory'
  })
  if (r) {
    return
  }
  const l = await git.listFiles({ dir })
  await serial(l.map(l => pathJoin(dir, l)).map(childPath => () => {
    return visit(pfs, childPath, visitor)
  }))
}
async function test4() {
  const dir = '/tutorial'
  const pfs = await initPsmDir(dir)
  console.log(await pfs.readdir(dir))
  await visit(pfs, dir, f => {
    console.log(f.path, f.type, f.content && f.content.length)
    return false
  })
}

async function testImportDirectory(){
  const fs = new VirtualFileSystemHostConstructor()
  console.log(fs.readDirSync('/'));
  await importDirectoryFromBrowserDir('/tutorial', fs)
  console.log(fs.readDirSync('/'));
}

testImportDirectory()