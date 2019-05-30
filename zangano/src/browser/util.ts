import * as git from 'isomorphic-git'
const FS = require('@isomorphic-git/lightning-fs')

export async function initPsmDir(dir?: string) {
  const Window = window as any
  if (!Window.fs || !Window.pfs) {
    Window.fs = new FS('fs', { wipe: false })
    git.plugins.set('fs', Window.fs)
    Window.pfs = Window.fs.promises
  }
  if (dir && !(await exists(dir))) {
    await Window.mkdir(dir)
  }
  return Window.pfs
}

export async function exists(dir: string) {
  try {
    const pfs = await initPsmDir()
    const s = await pfs.stat(dir)
    const d = await s.isDirectory()
    const f = await s.isFile()
    return f || d
  } catch (error) {
    return false
  }
}

// export async function rm_rf(dir: string) {
//   const pfs = await initPsmDir()
//   if(await exists(dir)) {
//     await pfs.rmdir(dir)
//   }
// }
