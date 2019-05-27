import test from 'ava'
import { queryAst } from '../src'
import { code1 } from './assets/code'
import { queryAstSimpleTest } from './testUtil'

test('incorrect attribute should not throw error and much 0', queryAstSimpleTest, queryAst(`// * [ @nonExistent == 1]`, 'class C {}'), { result: { kind: [] } })

test('attrs()', queryAstSimpleTest, queryAst(`// Identifier [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: ['C'] } })

test('attrs() on empty node', queryAstSimpleTest, queryAst(`// NonExistent [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: [], kind: [] } })

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

test('attribute name', t => {
  const query = `//* [ @name == "method1" && type()!='Identifier' ]`
  const result = queryAst(query, code1)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(c => c.getKindName()), ['MethodDeclaration'])
})

test('@name', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @name=='a' ]`,
  `export function f(){
    var a = 1
  }
  export const a = 2
`), { result: { text: ['a = 1', 'a = 2'] } })

test('@name && @modifiers', queryAstSimpleTest, queryAst(`// * [ @name=='f' && @modifiers=~'export' ]`,
  `export function f(){
    function f(){}
  }
`), { result: { kind: ['FunctionDeclaration'] } })

test('@text', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @text!~'2' ]`, `const a = 1, b = 2`), { result: { text: ['a = 1'] } })

test('@type explicit', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='Date[]']`, `export const a: Date[] = []`), { result: { text: ['a: Date[] = []'] } })

test('@type infer from usage', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='number']`, `
function f(){return 1}
export const b = 'foo'
export const a = f() + 2
`), { result: { text: ['a = f() + 2'] } })

test('@type infer from usage negative', queryAstSimpleTest, queryAst(`// VariableDeclaration [ @type=='boolean']`, `
export const b = 'foo'
`), { result: { text: [] } })

test('@type infer from usage several parameters', queryAstSimpleTest, queryAst(`// Parameter [ @type=='boolean' || @type=='number']`, `
function f(a=1, b='s', c=false, d={})
`), { result: { text: ['a=1', 'c=false'] } })
