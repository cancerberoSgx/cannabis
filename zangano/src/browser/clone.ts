import * as git from 'isomorphic-git'
import { clone as cloneFn } from 'isomorphic-git'
import { initPsmDir } from './util'

type Options = Partial<Parameters<typeof cloneFn>[0]>

async function clone(options: Options = {}) {

  const defaultOptions = {
    dir: '/tutorial',
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/isomorphic-git/isomorphic-git',
    ref: 'master',
    singleBranch: true,
    depth: 10
  }

  const allOptions = { ...defaultOptions, ...options }

  await initPsmDir(allOptions.dir)
  console.log(await git.clone(allOptions))
  console.log(await git.log({ dir: allOptions.dir }))
}

