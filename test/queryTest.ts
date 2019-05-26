import test from 'ava';
import { queryAst } from '../src';

test('query', t => {
  const result = queryAst('// Identifier', 'class C {}')
  t.is(result.error, undefined)
  t.is(result.result!.length, 1)
  t.is(result.result![0].getText(), 'C')
});

test('should return error on invalid queries', t => {
  const result = queryAst('/ fo invalid / Identifier', 'class C {}')
  t.truthy(result.error )
  t.true((result.error+'').includes('query parsing failed') )
});
const code1 = `
export function f(o: any){
  for(let i in o)
    console.log(i)
}
export function g(n: number[]){
  return new A(n)
}
class A{
  constructor(private n: any[]){}
  private method1(){
    for(var name in this)
      this.n.push(name)    
  }
  protected method2(){
    return true
  }
}
class B extends A{
  foo=f=>{
    for(let i in o)
      console.log(i)
  }
}
  `
test('statement inside several kind', t => {
  
  // matches function-like nodes containing a for-in statement (`for (let i in foo){}`)
  const query = '//* [ //ForInStatement &&  (type()=="MethodDeclaration" || type()=="FunctionDeclaration" || type()=="Constructor" || type()=="ArrowFunction") ]'
  const result = queryAst(query, code1)
  t.falsy(result.error )
  t.is(result.result!.length, 3)
  t.true(result.result![0].getText().includes('function f') )
  t.true(result.result![1].getText().includes('private method1()') )
  t.true(result.result![2].getText().includes('f=>{') )
});


test('statement inside several kind 2', t => {
  // matches function-like nodes containing a for-in statement (`for (let i in foo){}`)
  const query = '//Block [ //ForInStatement ]'
  const result = queryAst(query, code1)
  t.falsy(result.error )
  t.is(result.result!.length, 3)
  t.true(result.result![0].parent.getText().includes('function f') )
  t.true(result.result![1].parent.getText().includes('private method1()') )
  t.true(result.result![2].parent.getText().includes('f=>{') )
});

