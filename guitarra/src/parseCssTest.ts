import test from 'ava'
import { parseCss, visit } from './parseCss'
import { printTypes } from './debug'

test('one kind descendant', t => {
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const types: string[] = []
  visit(p, (n, p, level) => {
    types.push('__  ' + n.type + ', level: ' + level + ', value: ' + (n.value || '') + '  __')
    return false
  }, undefined, false)
  t.deepEqual(types, [
     '__  numeric, level: 4, value: 1  __',
     '__  word, level: 4, value: solid  __',
     '__  word, level: 4, value: #ededed  __',
     '__  value, level: 3, value:   __',
     '__  decl, level: 2, value: 1px solid #ededed  __',
     '__  rule, level: 1, value:   __',
     '__  root, level: 0, value:   __',
  ])
  t.is( printTypes(p).trim(), `root
  rule
    decl
      value
        word
        word
        numeric`.trim());
  
})
