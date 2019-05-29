import { ASTNode, astNodeAttributeNames } from './astNode'
import { visit, parseCss } from './parseCss'
import { indent } from 'misc-utils-of-mine-generic';
import { notUndefined } from 'misc-utils-of-mine-typescript';

export function printTypes(n: ASTNode ){
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const a = ['']
  visit(p, (c,p,l)=>{
    a.push(indent(l)+c.type)
    return false
  })
  return a.reverse().join('\n')
}

export function printTypeAndAttrs(n: ASTNode ){
  const p = parseCss(`a{border: 1px solid #ededed}`)
  const a = ['']
  visit(p, (c,p,l)=>{
    // console.log({...n, parent: undefined}, getAttrs(n));
    
    a.push(`${indent(l)}<${c.type} ${getAttrs(c).map(a=>`${a.name}="${a.value}"`).join(' ')}>`)
    return false
  })
  return a.reverse().join('\n')
}
function getAttrs(n: ASTNode) {
  return astNodeAttributeNames.map(a=>({name: a, value: (n as any)[a]})).filter(a=>a.value!==undefined)
}