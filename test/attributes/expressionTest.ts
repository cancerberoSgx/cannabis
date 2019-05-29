import test from 'ava'
import { queryAst, queryOne } from '../../src'
import { code1 } from '../assets/code'
import { queryAstSimpleTest } from '../testUtil'
  
test('@expression 1', queryAstSimpleTest, queryAst(`// * [ @expression != null]`, 'if(true){}'),
  { result: {   kind:     [   'IfStatement'] } })

  test('@expression 2', queryAstSimpleTest, queryAst(`// * [ @expression == null]`, 'if(true){}'),
  { result: {   kind:     [    'TrueKeyword',  'Block',  'EndOfFileToken',] } })

  test.skip('type(@expression) ', queryAstSimpleTest, queryAst(`// * [ @expression [type()!=null]]`, 'if(true){}'),
  { result: {   kind:     [   'IfStatement'] } })
