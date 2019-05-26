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

  {
    name: 'Filtering by @modifiers and @type',
    query: `// * [ @modifiers=~'private' && @modifiers=~'static' || @type=='number[]' ]`,
    description: 'Matches those nodes with private and static modifiers or which type matches number[]. Note about @type: the string representation of node\'s type is what is matched, if the node declare explicitly a type that is used, if not, the type is inferred from usage.'
  },
  

]


export const codeExamples = [
  {
    name: 'code1',
    content: `
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
  }
]
