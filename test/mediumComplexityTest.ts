import test from 'ava';
import { queryAst } from '../src';
import { getGeneralNodeKindName } from '../src/astNode';
import { code3 } from './assets/code';

test('functions that contains variables, classes or parameters', t => {
  const f = queryAst(`// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`, code3)
  t.falsy(f.error)
  t.deepEqual(f.result!.map(getGeneralNodeKindName), ['Constructor','MethodDeclaration','FunctionDeclaration','MethodDeclaration'])
})

