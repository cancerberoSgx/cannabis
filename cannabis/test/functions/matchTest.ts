import test from 'ava'
import { getASTNodeName, queryAst } from '../'
import { getASTNodeKindName } from '../../src'
import { getFile } from '../../src/file'
import { code2 } from '../assets/code'

test('matchEvery', t => {
  let result = queryAst(`//* [ matchEvery(array(@name, @text), '**I**,**2**') ]`, getFile(code2))
  t.falsy(result.error && result.error + result.error.stack!)
  t.deepEqual(result.result!.map(x => getASTNodeName(x) + ' - ' + getASTNodeKindName(x)), [
    'I2 - ExpressionWithTypeArguments', 'I2 - Identifier', 'I2 - InterfaceDeclaration', 'I2 - Identifier',
    'I2 - ExpressionWithTypeArguments', 'I2 - Identifier'])
})

