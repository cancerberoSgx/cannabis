import test from 'ava'
import { queryAst } from '../src'
import { getTsMorphFile } from "../src/file";
import { ts, tsMorph, getExtendsRecursively, getExtendsRecursivelyNames } from 'ts-simple-ast-extra'

test('query', t => {
  const result = queryAst(`// Identifier`, 'class C {}')
  t.is(result.error, undefined)
  t.is(result.result!.length, 1)
  t.is(result.result![0].getText(), 'C')
});

test('should return error on invalid queries', t => {
  const result = queryAst('/ fo invalid / Identifier', 'class C {}')
  t.truthy(result.error)
  t.true((result.error + '').includes('query parsing failed'))
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
  const query = `//* [ //ForInStatement &&  (type()=="MethodDeclaration" || type()=="FunctionDeclaration" || type()=="Constructor" || type()=="ArrowFunction") ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.is(result.result!.length, 3)
  t.true(result.result![0].getText().includes('function f'))
  t.true(result.result![1].getText().includes('private method1()'))
  t.true(result.result![2].getText().includes('f=>{'))
});


test('statement inside several kind 2', t => {
  // matches function-like nodes containing a for-in statement (`for (let i in foo){}`)
  const query = `//Block [ //ForInStatement ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.is(result.result!.length, 3)
  t.true(result.result![0].getParent()!.getText().includes('function f'))
  t.true(result.result![1].getParent()!.getText().includes('private method1()'))
  t.true(result.result![2].getParent()!.getText().includes('f=>{'))
});


test('isFunctionLike', t => {
  const query = `//* [ isFunctionLike() ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['FunctionDeclaration', 'FunctionDeclaration', 'Constructor', 'MethodDeclaration', 'MethodDeclaration', 'ArrowFunction'])
});


test('attribute name', t => {
  const query = `//* [ @name == "method1" ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['MethodDeclaration'])
});


test('extendsNamed', t => {

  const f = getTsMorphFile(`
class A {}
class B extends A {}
class C<T> extends B{}
class D<T> extends C<T> implements I{} 
interface I{}
interface I1 extends I{}
interface I2<T> extends I1{}
interface J{}
interface I3<T> extends I2<T>, J{} 
`)
  let result = queryAst(`//* [ extendsNamed('C') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['D'])

  result = queryAst(`//* [ extendsNamed(\'A\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['B', 'C', 'D'])

  result = queryAst(`//* [ extendsNamed(\'I2\') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['I3'])

  result = queryAst(`//* [ extendsNamed('I') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['I1', 'I2', 'I3'])
});

test('implementsNamed', t => {

  const f = getTsMorphFile(`
class A implements I1, J{}
class B extends A {}
class C<T> extends B implements I2<T>, I3<T>{}
interface I{}
interface I1 extends I{}
interface I2<T> extends I1{}
interface J{}
interface I3<T> extends I2<T>, J{} 
`)
  let result = queryAst(`//ClassDeclaration [ implementsNamed('I3') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['C'])

  result = queryAst(`//ClassDeclaration [ implementsNamed('I') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getFirstChildByKind(ts.SyntaxKind.Identifier)!.getText()), ['A', 'B', 'C'])
});
