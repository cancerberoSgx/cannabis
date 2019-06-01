export interface Example {
  query: string;
  name: string
  description: string;
  code?: string
}
export const examples: Example[] = [
  {
    name: 'All nodes',
    query: '// *',
    description: 'All nodes'
  },
  {
    name: 'Class identifier',
    query: '// Identifier [../ClassDeclaration] ',
    description: 'Identifiers direct children of a class declaration'
  },
  {
    name: 'Methods and properties identifiers',
    query: '// Identifier [ ../MethodDeclaration || ../PropertyDeclaration ] ',
    description: 'Identifiers that are direct children of method or properties declaration.'
  },
  {
    name: 'Function-like containing for-in statements',
    query: '//* [ //ForInStatement &&  (type()=="MethodDeclaration" || type()=="FunctionDeclaration" || type()=="Constructor") ] ',
    description: 'Functions methods or constructors that contain a ForInStatement (for(var i in obj){})'
  },

]


export const codeExamples = [
  {
    name: 'code1',
    content: `
    import {Foo, bar, zok, puff} from './aux'
    export class C {
      private attribute1: number
      constructor(public id: string = bar()){
        this.attribute1 = 2
      }
      method1(a: number){
        return new Foo(a).value();
      }
      secondMethod(...args: any[]){
        const a = []
        function f (){
          for(let i in puff){
            a.push(i)
          }
        }
        f()
        zok(a, ...args)
      }
    }   
      `
  }
]