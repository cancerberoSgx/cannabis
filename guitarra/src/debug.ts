import { indent } from 'misc-utils-of-mine-generic'
import { ASTNode, astNodeAttributeNames } from './astNode'
import { visit } from './parseCss'

export function printTypes(n: ASTNode) {
  const a = ['']
  visit(n, (c, p, l) => {
    a.push(indent(l) + c.type)
    return false
  })
  return a.reverse().join('\n')
}

export function printTypeAndAttrs(n: ASTNode) {
  const a = ['']
  visit(n, (c, p, l) => {
    a.push(`${indent(l)}<${c.type} ${getAttrs(c).map(a => `${a.name}="${a.value}"`).join(' ')}>`)
    return false
  })
  return a.reverse().join('\n')
}
function getAttrs(n: ASTNode) {
  return astNodeAttributeNames.map(a => ({ name: a, value: (n as any)[a] })).filter(a => a.value !== undefined)
}

export function toJson(n: ASTNode) {
  return JSON.stringify(n, (key, value) => ['source', 'parent', 'raws'].includes(key) ? undefined : value, 2)
}
