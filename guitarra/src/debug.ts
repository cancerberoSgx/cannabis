import { indent } from 'misc-utils-of-mine-generic'
import { ASTNode, astNodeAttributeNames } from './astNode'
import { parseCss, visit } from './parseCss'

export function printTypes(n: ASTNode) {
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const a = ['']
  visit(p, (c, p, l) => {
    a.push(indent(l) + c.type)
    return false
  })
  return a.reverse().join('\n')
}

export function printTypeAndAttrs(n: ASTNode) {
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const a = ['']
  visit(p, (c, p, l) => {
    // console.log({...n, parent: undefined}, getAttrs(n));

    a.push(`${indent(l)}<${c.type} ${getAttrs(c).map(a => `${a.name}="${a.value}"`).join(' ')}>`)
    return false
  })
  return a.reverse().join('\n')
}
function getAttrs(n: ASTNode) {
  return astNodeAttributeNames.map(a => ({ name: a, value: (n as any)[a] })).filter(a => a.value !== undefined)
}
