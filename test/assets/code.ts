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
