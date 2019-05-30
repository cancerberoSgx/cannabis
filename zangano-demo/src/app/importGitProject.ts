import { equal } from 'assert';
import { clone, createBrowserProjectFromDirectory, ts, tsMorph } from 'zangano';
import { getStore } from './store';

export async function importGitProject(){
  // const dir = '/project_' + Date.now()
  // const pfs = await initPsmDir()
  // equal(await exists(dir), false)
  // await pfs.mkdir(dir) 
  // equal(await exists(dir), true)
  // deepEqual(await pfs.readdir(dir), [])

  getStore().setState({status: 'git clone'})

  try {
    
 const {dir}  =await clone({
  // dir,
  // removeExisting: true,
  corsProxy: 'https://cors.isomorphic-git.org',
  url: getStore().getState().gitUrlInput,
  ref: 'master',
  singleBranch: true,
  depth: 10
})


const project = await createBrowserProjectFromDirectory({ dir })
console.log(project.getSourceFiles().map(f => f.getBaseName()), project.getDirectories().map(d => d.getPath()), project.getRootDirectories().map(d => d.getPath())) 

  } catch (error) {
  getStore().setState({error})
  }

  getStore().setState({status: undefined})
  // debugger
  // const f = project.getRootDirectories()[0].createSourceFile('test.ts', 'var a = [1,2]')
  // const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  // equal(getType(v), 'number[]')

//   const f2 = project.createSourceFile('src/test.ts', `
// import { newone} from './pack'
// import {link} from './link'
// var a: typeof link
// var b = newone({} as any, {} as any)
// `)
//   equal(getType(f2.getVariableDeclaration('a')!), 'typeof import("/src/link").link')
//   equal(getType(f2.getVariableDeclaration('b')!), 'String')
}