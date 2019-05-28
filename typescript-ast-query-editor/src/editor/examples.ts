export interface Example {
  query: string;
  name: string
  description: string;
  code?: string,
  difficulty: 'easy' | 'medium' | 'hard'
}


export const examples: Example[] = [


  {
    name: 'functions that contains variables, classes or parameters',
    query: `// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`,
    description: 'Matches function like nodes that contains variables or classes or parameters named "id"',
    difficulty: 'medium',
    code: 'code1'
  },
  {
    name: 'Filtering by @modifiers and @type',
    query: `// * [ @modifiers=~'private' && @modifiers=~'static' || @type=='number[]' ]`,
    description: 'Matches those nodes with private and static modifiers or type number[]. Note about @type: the string representation of node\'s type is what is matched, if the node declare explicitly a type then that type is used, otherwise the type is inferred from usage.',
    difficulty: 'easy',
    code: 'code1'
  },
  {
    name: 'implements and extends, recursively',
    query: `// ClassDeclaration [ @modifiers=~'export' && extendsNamed('B') && !implementsNamed('I2') ]`,
    description: `Gets exported class declarations that extends class B but doesn't implements interface I2`,
    difficulty: 'easy',
    code: 'inheritance1'
  },
  {
    name: 'All nodes',
    query: '// *',
    description: 'All nodes',
    difficulty: 'easy'
  },
  {
    name: 'Class identifier',
    query: '// Identifier [../ClassDeclaration] ',
    description: 'Identifiers direct children of a class declaration',
    difficulty: 'easy'
  },
  {
    name: 'Methods and properties identifiers',
    query: '// Identifier [ ../MethodDeclaration || ../PropertyDeclaration ] ',
    description: 'Identifiers that are direct children of method or properties declarations (their names)',
    difficulty: 'easy'
  },
  {
    name: 'Functions with for-in statements',
    query: '//* [ //ForInStatement && isFunctionLike() ] ',
    description: 'Functions methods or constructors that contain a ForInStatement (for(var i in obj){})',
    difficulty: 'easy',
    code: 'code1'
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
      `.trim()
  },

  {
    name: 'inheritance1',
    content: `
class A implements I1, J{}
class B extends A {}
class C<T> extends B implements I2<T>, I3<T>{}
export class D<T> extends C<T> implements I{} 
export class F extends B implements J{}
interface I{}
interface I1 extends I{}
interface I2<T> extends I1{}
interface J{}
interface I3<T> extends I2<T>, J{} 
    `.trim()
  }
]
