import { equal } from 'assert'
import { ts } from 'ts-morph'
import { createProjectFromBrowserDir2, createVirtualFilesystemProject } from '../project/createProject'
import { getType } from '../project/util'

async function createProjectFromBrowserDir2Test() {
  const project = await createProjectFromBrowserDir2({
    dir: '/tutorial'
  })
  console.log(project.getSourceFiles().map(f => f.getBaseName()), project.getDirectories().map(d => d.getPath()), project.getRootDirectories().map(d => d.getPath()))
  debugger
  const f = project.getRootDirectories()[0].createSourceFile('test.ts', 'var a = [1,2]')
  const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  equal(getType(v), 'number[]')
}
createProjectFromBrowserDir2Test()


function createVirtualFilesystemProjectTest() {
  const project = createVirtualFilesystemProject()
  const f = project.createSourceFile('test.ts', 'var a = [1,2]')
  const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  equal(getType(v), 'number[]')
  console.log(getType(v))
}
