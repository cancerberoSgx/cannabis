import * as git from 'isomorphic-git'
const FS = require('@isomorphic-git/lightning-fs')

async function testNode2() {

  function promisify(cb: (...args: any[]) => any) {
    return function (...args: any[]) {
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
  console.log(await git.listFiles({ dir: '/' }));
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
    }));

  console.log(await await promiseMethod(fs, 'readdir')('/'))
  // console.log(await git.listFiles({ dir: '/' }));

  console.log('done')
  // fs.writeFile(filepath, data, opts?, cb)

  await git.add({ filepath: 'foo.txt', dir: '/' })
  console.log(await git.listFiles({ dir: '/' }));

}
// testNode2()





async function testNode3() {
  console.log('hello')
  const Window = window as any
  // Initialize isomorphic-git with a file system
  const fs = Window.fs = new FS('fs', { wipe: true })
  git.plugins.set('fs', Window.fs)
  // I prefer using the Promisified version honestly
  const pfs = Window.pfs = Window.fs.promises

  const dir = Window.dir = '/tutorial'
  console.log(dir);
  console.log(await pfs.mkdir(dir))
  // Behold - it is empty!
  console.log(await pfs.readdir(dir))

  console.log(await git.clone({
    dir,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  }))

  // Now it should not be empty...
  console.log(await pfs.readdir(dir))

  console.log(await git.log({ dir }))

  console.log(await git.status({ dir, filepath: 'README.md' }))
}
testNode3()