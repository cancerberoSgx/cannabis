import * as git from 'isomorphic-git'
import { clone as cloneFn } from 'isomorphic-git'

type Options = Partial<Parameters<typeof cloneFn>[0]> & {
  removeExisting?: boolean
}

export async function clone(options: Options = {}) {
  const defaultOptions = {
    dir: '/project_' + Date.now(),
    removeExisting: false,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  }
  const allOptions = { ...defaultOptions, ...options }
  // const pfs = await initPsmDir(allOptions.dir)
  // await rm_rf(allOptions.dir)
  await git.clone(allOptions)
  // await git.log({ dir: allOptions.dir })
}

