import test from 'ava'
import { queryByPath } from '.'
import { getFile } from '../src/file'
import { code1, code2 } from './assets/code'

test('queryByPath1', t => {
  const { result } = queryByPath({
    root: getFile(code1, 'queryByPath1.ts'),
    include: ['**/n']
  })
  t.deepEqual(result.map(r => r.path), [
    'queryByPath1/g/n/n',
    'queryByPath1/g/n',
    'queryByPath1/g/Block/ReturnStatement/A/n',
    'queryByPath1/A/Constructor/n/n',
    'queryByPath1/A/Constructor/n',
    'queryByPath1/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/n/n',
    'queryByPath1/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/n',])
})

test('queryByPath2', t => {
  const { result } = queryByPath({
    root: getFile(code1, 'queryByPath2.ts'),
    include: ['**/*Statement*/**/n']
  })
  t.deepEqual(result.map(r => r.path), [
    'queryByPath2/g/Block/ReturnStatement/A/n',
    'queryByPath2/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/n/n',
    'queryByPath2/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/n',])
})


test('matchEvery', t => {
  const { result } = queryByPath({
    root: getFile(code2),
    include: ['(*a*A)|(A*a)*', '**/*A*/**']
  })
  result.map(r => r.path).forEach(r => t.true((r.includes('a') && r.includes('A'))))
})

