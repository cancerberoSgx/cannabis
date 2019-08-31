import test from 'ava'
import { query, stringify, parse } from '../src'
import { readFileSync, writeFileSync } from 'fs';
import { removeWhites, notUndefined, notFalsy, notSameNotFalsy, repeat, objectKeys } from 'misc-utils-of-mine-generic';
import { mapDescendants } from '../src/parse';
import { QueryResult } from '../src/query';

// test('query', t => {
//   let result = query('*', `{"a": {"b": [1,2, {"b": 3, "c": {"g": 2222}}]}}`)
//   t.falsy(result.error);
//   // t.deepEqual(stringify(result), '[{"type":"object","childNodes":[{"type":"object","childNodes":[{"type":"array","childNodes":[{"type":"number","childNodes":[],"attributes":{"index":0,"type":"number"}},{"type":"number","childNodes":[],"attributes":{"index":1,"type":"number"}}],"attributes":{"length":3,"name":"b","type":"array"}}],"attributes":{"name":"a","type":"object"}}],"attributes":{"name":"/","type":"object"}}]')
// })

// test('query2', t => {
//   let result = query('// array', `{"a": {"b": [1,2, {"b": 3, "c": {"g": 2222}}]}}`)
//   t.falsy(result.error);
//   // t.deepEqual( stringify(result), '[{"type":"array","childNodes":[{"type":"number","childNodes":[],"attributes":{"index":0,"type":"number"}},{"type":"number","childNodes":[],"attributes":{"index":1,"type":"number"}}],"attributes":{"length":3,"name":"b","type":"array"}}]')
// })

// test('query3', t => {
//   let result = query(`//* [ @index==1 || @value==1 ] `, `{"a": {"b": [1,2, {"b": 3, "c": {"g": "2222"}}]}}`)
//   t.falsy(result.error);
//   // t.deepEqual(stringify(result, true),'[{"type":"number","childNodes":[],"attributes":{"index":0,"value":1,"type":"number"}},{"type":"number","childNodes":[],"attributes":{"index":1,"value":2,"type":"number"}}]')
// })

test('query4', t => {

  const parsed = parse({
    childrenPropertyName: 'children',
    alwaysIncludePropertiesAsChildren: true,
    // extraAttributes: {
    //   text: a=>a.text,
    //   text: a=>a.text,
    // }
    typeIsName: true,
    typePropertyName: 'type',
    addLevel: true,
    s: readFileSync('/Users/sebastiangurin/git/mirada/doxygen2typescript/assets/bindings.cpp.json').toString()
  })
  const functions = query(`//function_definition/compound_statement/expression_statement/call_expression [/identifier/text [@value=='function'] ]`, parsed)
  t.falsy(functions.error);
  const constants = query(`//call_expression [/identifier/text [@value=='constant'] ]`, parsed)
  // const functions = query(`//call_expression [/identifier/text [@value=='function'] ]`, parsed)
  t.falsy(constants.error);

const classes = query(`//call_expression [/template_function/scoped_identifier/text [@value=='emscripten::class_']]`, parsed)
  t.falsy(constants.error);

  console.log({functions: functions.result!.length, constants: constants.result!.length, classes: classes.result!.length });
  // console.log({classNames:classes.result!.map(n => query(`//template_argument_list/type_descriptor/scoped_type_identifier/type_identifier/text`, n).result!.map(r => r.attributes.value))})
  // console.log({classMethods:classes.result!.map(n => query(`//expression_statement/call_expression/identifier/text [@value!='asdafunction']`, n).result!.map(r => r.attributes.value))})

// expression_statement

// console.log(.result!.map(f=>f.attributes.value).filter(notSameNotFalsy));
// indexof(@foo, "bar", 0) >= 0
  // writeFileSync('tmp2.txt',  mapDescendants(parsed, p=>`${p.type}${['parameter_declaration', 'string_literal', 'identifier', 'primitive_type'].find(s=>p.type.includes(s))?` ( ${(p.attributes.value as any).text+''} )`:''}\n${repeat(p.attributes.level||0, ' ')}`).filter(notFalsy).join(''))

  // writeFileSync('tmp.json',  stringify({result: [parsed]}, true))

  // console.log(mapDescendants(parsed, p=>p.type).filter(notUndefined). join(', '));
  t.true(true)
  // console.log(result.result!.map(f=>f.childNodes.find(f=>f.type==='text')).filter(notFalsy))

  // t.falsy(result.error);
  // t.deepEqual(stringify(result, true),'[{"type":"number","childNodes":[],"attributes":{"index":0,"value":1}},{"type":"number","childNodes":[],"attributes":{"index":1,"value":2}}]')
})

