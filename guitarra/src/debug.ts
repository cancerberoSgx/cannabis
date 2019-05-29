import { ASTNode } from './astNode'
import { visit, parseCss } from './parseCss'
import { indent } from 'misc-utils-of-mine-generic';

export function printTypes(n: ASTNode ){
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const a = ['']
  visit(p, (c,p,l)=>{
    a.push(indent(l)+c.type)
    return false
  })
  return a.reverse().join('\n')
}