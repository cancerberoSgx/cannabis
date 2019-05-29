import { ts } from 'ts-morph'
import { equal } from 'assert';
import { createProject } from './createProject';
import { getType } from './util';

function test() {
  const project = createProject()
  const f = project.createSourceFile('test.ts', 'var a = [1,2]')
  const v = f.getFirstDescendantByKind(ts.SyntaxKind.VariableDeclaration)!
  equal(getType(v), 'number[]')
  console.log(getType(v));
}
test()

