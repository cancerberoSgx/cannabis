import test from 'ava'
import { removeWhites } from 'misc-utils-of-mine-generic'
import { queryAll, queryAllOrThrow, queryOne, queryOneOrThrow } from '.'
import { code1 } from './assets/code'

test('queryOne success match several returns 1', t => {
  t.is(queryOne(`//* [@name=='i']`, code1)!.getParent()!.getText(), 'let i')
})

test('queryOne negative dont throw', t => {
  t.is(queryOne(`//* [@name=='nonExistent']`, code1), undefined)
})

test('queryOne syntax error dont throw', t => {
  t.is(queryOne(`/ error in ()%& query]`, code1), undefined)
})

test('queryAll success match several returns all', t => {
  t.deepEqual(queryAll(`//* [@name=='i' && type()!='Identifier']`, code1)!
    .map(c => c.getParent()!.getParent()!.getText()).map(a => removeWhites(a)),
    [`for(let i in o) console.log(i)`, `for(let i in o) console.log(i)`].map(a => removeWhites(a))
  )
})

test('queryAll negative dont throw', t => {
  t.deepEqual(queryAll(`//* [@name=='nonExistent']`, code1), [])
})

test('queryAll syntax error dont throw', t => {
  t.deepEqual(queryAll(`/ error in ()%& query]`, code1), [])
})

test('queryOneOrThrow dont throws if positive', t => {
  t.truthy(queryOneOrThrow(`//* [@name=='f']`, code1))
})

test('queryOneOrThrow throws if negative', t => {
  t.throws(() => queryOneOrThrow(`//* [@name=='nonExistent'`, code1))
})

test('queryOneOrThrow throws if syntax error', t => {
  t.throws(() => queryOneOrThrow(`/ /* [@  name = =' nonExist ent'`, code1))
})

test('queryAllOrThrow success match several returns all and dont throw', t => {
  t.deepEqual(queryAllOrThrow(`//* [@name=='i' && type()!='Identifier']`, code1)!
    .map(c => c.getParent()!.getParent()!.getText()).map(a => removeWhites(a)),
    [`for(let i in o) console.log(i)`, `for(let i in o) console.log(i)`].map(a => removeWhites(a)))
})

test('queryAllOrThrow negative throws', t => {
  t.throws(() => queryAllOrThrow(`//* [@name=='nonExistent']`, code1))
})

test('queryAllOrThrow syntax error  throws', t => {
  t.throws(() => queryAllOrThrow(`/ error in ()%& query]`, code1))
})
