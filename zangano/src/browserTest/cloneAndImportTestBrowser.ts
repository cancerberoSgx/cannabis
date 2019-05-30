import { deepEqual, equal, notDeepEqual, ok } from 'assert'
import * as git from 'isomorphic-git'
import { ts } from 'ts-morph'
import { clone } from '../browser/clone'
import { exists, initPsmDir } from '../browser/util'
import { createBrowserProjectFromDirectory } from '../project/createProject'
import { getType } from '../project/util'
const FS = require('@isomorphic-git/lightning-fs')


async function cloneAndImportTest() {
  const dir = '/project_' + Date.now()
  const pfs = await initPsmDir()
  equal(await exists(dir), false)
  await pfs.mkdir(dir)
  equal(await exists(dir), true)
  deepEqual(await pfs.readdir(dir), [])

  await clone({
    dir,
    // removeExisting: true,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: 'https://github.com/cancerberoSgx/yamat',
    ref: 'master',
    singleBranch: true,
    depth: 10
  })

  equal(await exists(dir), true)
  notDeepEqual(await pfs.readdir(dir), [])
  console.log(await pfs.readdir(dir))
  ok((await git.log({ dir })).length > 0)
  ok((await git.status({ dir, filepath: 'README.md' })).length > 0)

  const project = await createBrowserProjectFromDirectory({ dir })
  console.log(project.getSourceFiles().map(f => f.getBaseName()), project.getDirectories().map(d => d.getPath()), project.getRootDirectories().map(d => d.getPath()))
  debugger
  const f = project.getRootDirectories()[0].createSourceFile('test.ts', 'var a = [1,2]')
  const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  equal(getType(v), 'number[]')

  const f2 = project.createSourceFile('src/test.ts', `
import { newone} from './pack'
import {link} from './link'
var a: typeof link
var b = newone({} as any, {} as any)
`)
  equal(getType(f2.getVariableDeclaration('a')!), 'typeof import("/src/link").link')
  equal(getType(f2.getVariableDeclaration('b')!), 'String')
}
cloneAndImportTest()
