// import { deepEqual, equal, notDeepEqual, ok } from 'assert'
// import * as git from 'isomorphic-git'
// import { clone } from '../browser/clone'
// import { exists, initPsmDir } from '../browser/util'
// const FS = require('@isomorphic-git/lightning-fs')

// async function cloneTest() {
//   const dir = '/project_' + Date.now()
//   const pfs = await initPsmDir()
//   equal(await exists(dir), false)
//   await pfs.mkdir(dir)
//   equal(await exists(dir), true)
//   deepEqual(await pfs.readdir(dir), [])

//   await clone({
//     dir,
//     removeExisting: true,
//     corsProxy: 'https://cors.isomorphic-git.org',
//     url: 'https://github.com/cancerberoSgx/yamat',
//     ref: 'master',
//     singleBranch: true,
//     depth: 10
//   })

//   equal(await exists(dir), true)
//   notDeepEqual(await pfs.readdir(dir), [])
//   console.log(await pfs.readdir(dir))

//   ok((await git.log({ dir })).length > 0)
//   ok((await git.status({ dir, filepath: 'README.md' })).length > 0)
// }
// cloneTest()
