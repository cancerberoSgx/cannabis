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
    for(let i in {})
      console.log(i)
  }
} 