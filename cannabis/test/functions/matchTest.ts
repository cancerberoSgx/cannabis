import test from 'ava'
import { getASTNodeName, queryAst } from '../../src'
import { getFile } from '../../src/file'
import { code2, code3 } from '../assets/code'
import { notUndefined, notSameNotFalsy } from 'misc-utils-of-mine-generic';

test('matchEvery', t => {
  const f = getFile(code2)
  let result = queryAst(`//* [ matchEvery(array(@name, @text), '**I**,**2**') ]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeName), ['I2', 'I2', 'I2', 'I2', 'I2', 'I2'])
})

test.skip('queryAst', t => {
  // const f = 
  // let result = queryAst(`//* [ matchEvery(stringArray(map(children(),'getKindName')), '**a**,**A**') ]`, f)
  // 
  const context = {logs: ['1']}
  let result = queryAst(`//*  [ debug(  stringArray( map(children(), 'getKindName' ) )) ||children() ]`, getFile(code3), {context})
  console.log(context);
  
  t.falsy(result.error)
  // console.log(result.result!.map(getASTNodeName).filter(notSameNotFalsy))
  t.deepEqual(result.result!.map(getASTNodeName).filter(notSameNotFalsy), [])
})
//  [ matchEvery(stringArray( map(children(),'getKindName') ) , '**a**,**A**') ]`, f)

//  [ debug(stringArray( map(children(),'getKindName') ) ||children() ]