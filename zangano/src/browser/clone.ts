import { deepEqual, equal, notDeepEqual, ok } from 'assert'
import * as git from 'isomorphic-git'
import { clone as cloneFn } from 'isomorphic-git'
import { exists, initPsmDir } from './util'

type Options = Partial<Parameters<typeof cloneFn>[0]> & {
  // removeExisting?: boolean
}

export async function clone(options: Options = {}) {

  const defaultOptions = {
    dir: options.dir || '/project_' + Date.now(),
    removeExisting: false,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  }
  const allOptions = { ...defaultOptions, ...options }
  const pfs = await initPsmDir()
  equal(await exists(allOptions.dir), false)
  await pfs.mkdir(allOptions.dir)
  equal(await exists(allOptions.dir), true)
  deepEqual(await pfs.readdir(allOptions.dir), [])
  // const pfs = await initPsmDir(allOptions.dir)
  // await rm_rf(allOptions.dir)
  await git.clone(allOptions)

  equal(await exists(allOptions.dir), true)
  notDeepEqual(await pfs.readdir(allOptions.dir), [])
  console.log(await pfs.readdir(allOptions.dir))
  ok((await git.log({ dir: allOptions.dir })).length > 0)
  ok((await git.status({ dir: allOptions.dir, filepath: 'tsconfig.json' })).length > 0)
  return allOptions
  // await git.log({ dir: allOptions.dir })
}

