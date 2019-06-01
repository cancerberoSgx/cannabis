export interface Example {
  query: string;
  name: string
  description: string;
  code?: string,
  difficulty: 'easy' | 'medium' | 'hard'
}


export const examples: Example[] = [


  {
    name: 'Functions that contains variables, classes or parameters',
    query: `
// * [ 
  isFunctionLike() == true && 
  ( // VariableDeclaration || 
    // ClassDeclaration ||
    // Parameter [@name=='id'] 
  ) 
]
`.trim(),
    description: 'Matches function-like nodes (arrow functions, methods, etc.) that contains variables, classes or parameters named "id".',
    difficulty: 'medium',
    code: 'code1'
  },

  {
    name: 'Filtering by @modifiers and @type',
    query: `
// * [ 
  @modifiers=~'private' && 
  @modifiers=~'static' || 
  @type=='number[]' 
]`.trim(),
    description: 'Matches those nodes with private and static modifiers or type number[]. Note about @type: the string representation of node\'s type is what is matched, if the node declare explicitly a type then that type is used, otherwise the type is inferred from usage.',
    difficulty: 'easy',
    code: 'code1'
  },

  {
    name: 'Implements and extends',
    query: `
// ClassDeclaration [ 
  @modifiers=~'export' && 
  extendsAnyNamed('B') && 
  !implementsAnyNamed('I2') 
]`.trim(),
    description: `Gets exported class declarations that extends class B but doesn't implements interface I2.`,
    difficulty: 'easy',
    code: 'inheritance1'
  },

  {
    name: 'JsxText containing text',
    query: `
// JsxElement [
  ./ JsxOpeningElement [
    ./ Identifier  [ @text == 'h3' ]
  ] && 
  ./ JsxText [ @text =~ 'Query Analysis' ]
]`.trim(),
    description: `Returns those JSX Elements which tag is 'h3' and contains the text 'Query Analysis'.`,
    difficulty: 'easy',
    code: 'jsxCode1'
  },

  {
    name: 'All nodes',
    query: '// *',
    description: 'All nodes.',
    difficulty: 'easy'
  },

  {
    name: 'Class identifier',
    query: `
// Identifier [
  ../ClassDeclaration
] `.trim(),
    description: 'Returns identifiers that are direct children of a class declaration.',
    difficulty: 'easy'
  },

  {
    name: 'Methods and properties identifiers',
    query: `
// Identifier [ 
  ../MethodDeclaration || 
  ../PropertyDeclaration 
] `.trim(),
    description: 'Returns identifiers that are direct children of method or properties declarations (their names).',
    difficulty: 'easy'
  },

  {
    name: 'Functions with for-in statements',
    query: `
// * [ 
  //ForInStatement && 
  isFunctionLike() 
] `.trim(),
    description: 'Returns functions, methods or constructors that contain a ForInStatement (for(var i in obj)...)',
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
  },

  {
    name: 'jsxCode1',
    content: `
import './queryDump.css'
import * as React from 'react'

export class QueryDump extends React.Component {
  render() {
    return <article className="queryDump">
      <h3>Query Analysis</h3>
      <p>Officia cillum amet est ipsum excepteur occaecat nulla in quis. Id esse exercitation reprehenderit ipsum commodo sunt sunt quis laboris eu commodo do. </p>
      <p>Consectetur veniam ullamco fugiat dolor proident commodo velit veniam adipisicing ex enim ut. Duis nulla incididunt labore ad aliqua aliquip adipisicing ea ullamco magna.</p>
    </article>
  }
}
    
    `.trim()
  }
]
