import { tryTo } from 'misc-utils-of-mine-generic'
import { ASTNode } from './astNode'

const postcss = require('postcss')
const { parse, nodeToString } = require('postcss-values-parser')

export function parseCss(s: string) {
  let root = postcss.parse(s)
  root = JSON.parse(JSON.stringify(root))
  addParent(root)
  return root
}
function addParent(n: any, parent?: any) {
  visit(n, (n, parent) => {
    n.parent = parent
    if (n.value) {
      n.nodes = n.nodes || []
      // n.valueLiteral = n.value
      const parsed = JSON.parse(JSON.stringify({ 
        ...tryTo(() => parse(n.value)) || {}, 
      parent: undefined,
       type: 'value' 
      }))
      // n.value = 
      n.nodes.push(parsed)
      parsed.parent = n
    }
    if(n.type==='atrule'&&n.name==='media'){
      n.nodes = n.nodes||[]
      n.nodes.push(...n.params.split(/[\s()]/).map((w:string)=>parse(w).nodes).flat())
    }
    return false
  })
}

export function visit<T extends ASTNode = any>(n: T, v: (n: T, parent: T | undefined, level: number) => boolean, childrenFirst = true, parent?: T, level = 0) {
  if (!n) {
    return
  }
  if (!childrenFirst && v(n, parent, level)) {
    return true
  }
  // if (Array.isArray(n.nodes) && n.nodes.some((c: any) => !!visit(c, v, childrenFirst, n, level + 1))) {
  //   return true
  // }
  if (Array.isArray(n.nodes)) {
    n.nodes.forEach((c: any) => { visit(c, v, childrenFirst, n, level + 1) })
    // return true
  }
  return childrenFirst && v(n, parent, level)
}
