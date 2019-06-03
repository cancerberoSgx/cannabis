import test from 'ava'
import { queryAst } from '../../src'
import { queryAstSimpleTest } from '../testUtil'

test('@modifiers protected static async', queryAstSimpleTest, queryAst(`// * [ @modifiers=~'protected' && @modifiers=~'static' && @modifiers=~'async' ]`,
  `class C { 
    protected static async m(foo: number){}
  }
`), { result: { kind: ['MethodDeclaration'] } })

test('@modifiers private readonly', queryAstSimpleTest, queryAst(`// * [ @modifiers=~'private' && @modifiers=~'readonly' ]`,
  `class C { 
    private readonly bar=1 
  }
`), { result: { kind: ['PropertyDeclaration'] } })

test('@modifiers export default abstract', queryAstSimpleTest, queryAst(`// * [ @modifiers=~'export' && @modifiers=~'default' && @modifiers=~'abstract' ]`,
  `export default abstract class C { 
    private readonly bar=1 
  }
`), { result: { kind: ['ClassDeclaration'] } })

test('@name && @modifiers', queryAstSimpleTest, queryAst(`// * [ @name=='f' && @modifiers=~'export' ]`,
  `export function f(){
    function f(){}
  }
`), { result: { kind: ['FunctionDeclaration'] } })

