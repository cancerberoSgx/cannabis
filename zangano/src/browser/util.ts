import * as git from 'isomorphic-git'
const FS = require('@isomorphic-git/lightning-fs')
import {serial, basename, pathJoin} from 'misc-utils-of-mine-generic'

export async function initPsmDir(d: string) {
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
