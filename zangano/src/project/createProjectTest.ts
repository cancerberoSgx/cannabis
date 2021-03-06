import test from 'ava'
import { ts } from 'ts-morph'
import { createBrowserProject } from './createProject'
import { getType } from './util'

test('variable declaration getType', async  t => {
  const {project} = await createBrowserProject()
  const f = project.createSourceFile('test.ts', 'var a = [1,2]')
  const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  t.deepEqual(getType(v), 'number[]')
  console.log(getType(v))
})

