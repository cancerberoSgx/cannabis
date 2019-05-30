import * as git from 'isomorphic-git'
const FS = require('@isomorphic-git/lightning-fs')
import {serial, basename, pathJoin} from 'misc-utils-of-mine-generic'
import { fstat } from 'fs-extra';
import { stat } from 'fs';
async function testNode2() {

  function promisify(cb: (...args: any[]) => any) {
    return function(...args: any[]) {
      return new Promise(resolve => {
        cb(...args, resolve)
      })
    }
  }
  function promiseMethod(o: any, member: string) {
    return promisify(o[member].bind(o))
  }

  const fs = new FS('my-app')
  await git.plugins.set('fs', fs)
  console.log(await promiseMethod(fs, 'readdir')('/'))
  console.log(await git.listFiles({ dir: '/' }))
  // await promiseMethod(fs, 'writeFile')('/foo.txt', 'hello')
  // console.log(await promiseMethod(fs, 'readFile')('/foo.txt' ))
  // console.log(await await promiseMethod(fs, 'readdir')( '/' ))
  console.log(
    await git.clone({
      dir: '/',
      corsProxy: 'https://cors.isomorphic-git.org',
      url: 'https://github.com/isomorphic-git/isomorphic-git',
      singleBranch: true,
      depth: 1
    }))

  console.log(await await promiseMethod(fs, 'readdir')('/'))
  // console.log(await git.listFiles({ dir: '/' }));

  console.log('done')
  // fs.writeFile(filepath, data, opts?, cb)

  await git.add({ filepath: 'foo.txt', dir: '/' })
  console.log(await git.listFiles({ dir: '/', }))

}
// testNode2()



async function testNode3() {
  const dir = '/tutorial'
  const pfs = await initPsmDir(dir);
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
  const Window = window as any;
  if(Window.fs && Window.pfs){return Window.pfs}
  const fs = Window.fs = new FS('fs', { wipe: false });
  git.plugins.set('fs', Window.fs);
  const pfs = Window.pfs = Window.fs.promises;
  const dir = Window.dir = d;
  if(!(await (await pfs.stat(dir)).isDirectory())){
    console.log(await pfs.mkdir(dir))
  }
  console.log(dir, await pfs.readdir(dir))
  return pfs
}


interface File{
  path: string, type: 'file'|'directory', content?: string
}

async function visit(pfs:any, dir: string, visitor: (file: File)=>boolean, parent: string=''){  
  // const { pfs } = await initPsmDir(dir);
const content = await pfs.readFile(dir)
const stat = await pfs.stat(dir)
const r = await visitor( {
  path: dir, content, type: stat.isFile() ? 'file' : 'directory'
})
if(r){
  return
}
const l = await git.listFiles({ dir})
// console.log(l, l.map(l=>pathJoin(dir, l)));

await serial(l.map(l=>pathJoin(dir, l)).map(childPath=>()=>{
  // await Promise.all(
// console.log('recursing', childPath)

 return  visit(pfs, childPath, visitor)

}))
}

test4()
async function test4(){
  // await testNode3()
  // debugger;
  const dir = '/tutorial'
  const pfs = await initPsmDir(dir);
  console.log(await pfs.readdir(dir))
  // debugger
  await visit(pfs, dir, f=>{
    // debugger
    console.log(f.path, f.type, f.content && f.content.length);
    return false
  })
}