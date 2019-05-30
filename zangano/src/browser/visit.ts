import * as git from 'isomorphic-git'
import { pathJoin, serial } from 'misc-utils-of-mine-generic'

interface File {
  path: string, type: 'file' | 'directory', content?: string
}

export async function visit(pfs: any, dir: string, visitor: (file: File) => boolean, parent: string = '') {
  const content = await pfs.readFile(dir)
  const stat = await pfs.stat(dir)
  const r = await visitor({
    path: dir, content, type: stat.isFile() ? 'file' : 'directory'
  })
  if (r) {
    return
  }
  const l = await git.listFiles({ dir })
  await serial(l.map(l => pathJoin(dir, l)).map(childPath => () => visit(pfs, childPath, visitor)))
}
