import test from 'ava'
import { queryAst } from './queryAst'
import { toJson } from './debug';
import { parseCss } from './parseCss';
import { notUndefined } from 'misc-utils-of-mine-typescript';

test('typest', t => {
  let result = queryAst('// *', `@media (min-width: 1023px) {
    border: 1 px solid pink;
  }`)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(r => r.type), [
    'atrule', 'decl', 'value', 'numeric', 'word', 'word', 'word',    'word',    'punctuation',    'numeric',  ])
})

test('media values', t => {
  let result = queryAst('// *', `
  @media only screen and (min-width: 1200px) {
    .example {background: pink;}
  }
  `)
  t.falsy(result.error)
  t.deepEqual(result.result![0].nodes.map(n=>n.value).filter(notUndefined), [  
     'only',    'screen',   'and',   'min-width',   ':',   '1200'
    ])
})

test('media values 2', t => {
  let result = queryAst('// atrule [* && @name=="media"] ', `
  @media only screen and (min-width: 1200px) {
    .example {background: pink;}
  }
  @media only screen and (max-width: 1200px) {
    .example {background: blue;}
  }
  `)

  t.falsy(result.error)
t.is(result.result!.length, 1)
  // t.deepEqual(result.result!, [  
  //    {} as any
  //   ])
  // console.log(toJson(parseCss(`
  // @media only screen and (min-width: 1200px) {
  //   .example {background: pink;}
  // }
  // @media only screen and (max-width: 1200px) {
  //   .example {background: blue;}
  // }
  // `)))
})