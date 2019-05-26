import test from 'ava';
import { query } from '../src';

test('query', t => {
  const result = query('// Identifier', 'class C {}')
  t.is(result.error, undefined)
  t.is(result.result!.length, 1)
  t.is(result.result![0].getText(), 'C')
});

test('should return error on invalid queries', t => {
  const result = query('/ fo invalid / Identifier', 'class C {}')
  t.truthy(result.error )
  t.true((result.error+'').includes('query parsing failed') )
});


// test('bar2', async t => {
// 	t.is(1, 2);
// });

// test('bar', async t => {
// 	const bar = Promise.resolve('bar');
// 	t.is(await bar, 'bar');
// });


// test('bar3', async t => {
// 	const bar = Promise.resolve('bar');
//   t.is(await bar, 'bar');
//   function f (){
//     function g(){
//       throw new Error('hi')
//     }
//     g()
//   }
//   f()
// });
