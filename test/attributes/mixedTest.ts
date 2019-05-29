import test from 'ava'
import { queryAst, queryOne } from '../../src'
import { code1 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'

test('incorrect attribute should not throw error and much 0', queryAstSimpleTest, queryAst(`// * [ @nonExistent == 1]`, 'class C {}'), { result: { kind: [] } })

test('attrs()', queryAstSimpleTest, queryAst(`// Identifier [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: ['C'] } })

test('attrs() on empty node', queryAstSimpleTest, queryAst(`// NonExistent [ attrs(', ')=~'text, name, type, modifiers' ]`, 'class C {}'),
  { result: { text: [], kind: [] } })

test('@name && @modifiers', queryAstSimpleTest, queryAst(`// * [ @name=='f' && @modifiers=~'export' ]`,
  `export function f(){
    function f(){}
  }
`), { result: { kind: ['FunctionDeclaration'] } })
 
 