import test from 'ava'
import { query } from '../src'
import { mapDescendants, visitDescendants } from '../src/parse';
import { ASTNode } from '../src/astNode';

test('query', t => {
  let result = query('*', `{"a": {"b": [1,2, {"b": 3, "c": {"g": 2222}}]}}`)
  t.falsy(result.error);
  // const n = result.result![0]!
  result.result!.forEach(n=>visitDescendants(n, n=>{ delete n.parent; delete n.attributes.value; return false}, {childrenFirst: true}))
  // console.log(JSON.stringify(result.result!))
  t.deepEqual( JSON.stringify(result.result!), '[{"type":"object","childNodes":[{"type":"object","childNodes":[{"type":"array","childNodes":[{"type":"number","childNodes":[],"attributes":{"index":0}},{"type":"number","childNodes":[],"attributes":{"index":1}}],"attributes":{"length":3,"name":"b"}}],"attributes":{"name":"a"}}],"attributes":{"name":"/","value":{"a":{"b":[1,2,{"b":3,"c":{"g":2222}}]}}}}]')
})

test('query2', t => {
  let result = query('// array', `{"a": {"b": [1,2, {"b": 3, "c": {"g": 2222}}]}}`)
  t.falsy(result.error);
  // const n = result.result![0]!
  const f =  (n: ASTNode)=>{ delete n.parent; n.attributes && delete n.attributes.value; return false}
  result.result!.forEach(n=>f(n) || visitDescendants(n,f, {childrenFirst: true}))
  console.log(result.result!)
  t.deepEqual( JSON.stringify(result.result!), '[{"type":"array","childNodes":[{"type":"number","childNodes":[],"attributes":{"index":0}},{"type":"number","childNodes":[],"attributes":{"index":1}}],"attributes":{"length":3,"name":"b"}}]')
})
