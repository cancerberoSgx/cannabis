export const code2 = `
class A implements I1, J{}
class B extends A {}
class C<T> extends B implements I2<T>, I3<T>{}
class D<T> extends C<T> implements I{} 
interface I{}
interface I1 extends I{}
interface I2<T> extends I1{}
interface J{}
interface I3<T> extends I2<T>, J{} 
`

export const code1 = `
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
}  `


export const code3 = `
import {Foo, bar, zok, puff} from './aux'
    
export class C {
  private attribute1: number
  private instanceAttr: = [1,2,3]
  constructor(public id: string = bar()){
    this.attribute1 = 2
  }
  method1(a: number){
    return new Foo(a).value();
  }
  secondMethod(...args: any[]){
    const a = []
    function f (){
      for(let i in puff)
        a.push(i)      
    }
    f() && zok(a, ...args)
  }
  private static inferred = C.sttMethod().map(c=>parseFloat(c)||Math.random())
  private static sttMethod(){
    class D {
      private static explicit: number[]
    }
    return new Array(Math.round(Math.random())).fill(0).map(String)
  }
  private static inferredSimple = [4,5,6]
}   
`
