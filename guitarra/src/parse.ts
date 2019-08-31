import { tryTo, visitJson, isArray, JSONValue, JSONArray, JSONObject, array, objectKeys, isObject, RemoveProperties } from 'misc-utils-of-mine-generic'
import { ASTNode } from './astNode'


interface ParseOptions {
  s:string
  truncValue?: number
  typeIsName?: boolean
  childrenPropertyName?: string
  typePropertyName?: string
  addLevel?: boolean
  alwaysIncludePropertiesAsChildren?: boolean
}
export function parse(options:ParseOptions) {
  const o = JSON.parse(options.s)
  const root = process({...options, o, nameOrIndex: '/'})
  return root
}

interface ProcessOptions extends RemoveProperties<ParseOptions, 's'> {
  o:JSONValue, 
  nameOrIndex: string|number, 
  parent?: ASTNode
}

function process(o:ProcessOptions, level=0): ASTNode{
const v = o.o as any
var p : ASTNode =  {
  type: o.typePropertyName && typeof v[o.typePropertyName]==='string' ? v[o.typePropertyName] :  o.typeIsName ? (o.nameOrIndex+'') : isArray(v) ? 'array' : typeof v ,
parent:o.parent,
childNodes: [],
  attributes: {
    ...isArray(v)?{length: v.length}: {}, 
  ...{
    [typeof o.nameOrIndex==='string'?'name':'index']: o.nameOrIndex, 
  value: (()=>{if(o.truncValue){
    var s = JSON.stringify(v)
    return s.length>=o.truncValue ? s.substring(0, o.truncValue) : v
  }else {
    return v
  }
  }
  )(),
  type: isArray(v) ? 'array' : typeof v as any,
  ...o.addLevel? {level}: {}
  }
  }
}

const hasChildrenPropertyName = o.childrenPropertyName && typeof v === 'object' && isArray(v[o.childrenPropertyName])
if(isArray(v)){
  p.childNodes = v.map((k, i)=>process({...o, o:k, nameOrIndex: i, parent: p }, level+1))
}
else if(hasChildrenPropertyName){
  p.childNodes = (v[o.childrenPropertyName!] as any[]).map((k, i)=>process({...o, o: k, nameOrIndex: i, parent: p}, level+1))
  // p.childNodes.concat((v[o.childrenPropertyName] as any[]).map((k, i)=>process({...o, o: k, nameOrIndex: i, parent: v})))
}

if(!isArray(v)&&typeof v==='object' && (!hasChildrenPropertyName ||o.alwaysIncludePropertiesAsChildren)){
  p.childNodes = [...p.childNodes, ...objectKeys(v||[]).filter(p=> o.childrenPropertyName !== p).map(k=>process({...o, o:v[k], nameOrIndex: k, parent: p }, level+1))]
}
  // else {
  //    p.childNodes = []
  // }
  // [... ? array(v.length-1) :  : []].map(k=>process({...o, o:(v as any)[k as any], nameOrIndex: k, parent: p as any}))
  //  () ?v[o.childrenPropertyName]  :
  return p
}

// export function visit<T extends ASTNode = any>(n: T, v: (n: T, parent: T | undefined, level: number) => boolean, childrenFirst = true, parent?: T, level = 0) {
//   if (!n) {
//     return
//   }
//   if (!childrenFirst && v(n, parent, level)) {
//     return true
//   }
//   if ( n.childNodes.some((c: any) => !!visit(c, v, childrenFirst, n, level + 1))) {
//     return true
//   } 
//   return childrenFirst && v(n, parent, level)
// }

export type Visitor<T extends ASTNode> = (n: T) => boolean

/**
 * settings for visitDescendants regarding visiting order and visit interruption modes.
 */
export interface VisitorOptions {
  childrenFirst?: boolean
  /**
   * if a descendant visitor returned true, we stop visiting and signal up
   */
  breakOnDescendantSignal?: boolean
  /**
   * no matter if visitor returns true for a node, it will still visit its descendants and then break the chain
   */
  visitDescendantsOnSelfSignalAnyway?: boolean
  andSelf?: boolean
}
/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first
 * different modes on which visiting the rest of descenda|nts or Ancestors are configurable through the
 * options. By default, first the parent is evaluated which is configurable configurable with
 * [[[VisitorOptions.childrenFirst]]
 * */
export function visitDescendants<T extends ASTNode>(n: T, v: Visitor<T>, o: VisitorOptions = {}, inRecursion = false): boolean {
  let r = false
  if (o.childrenFirst) {
    r = ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true))
    if (r) {
      if (!o.breakOnDescendantSignal && (o.andSelf || inRecursion)) {
        v(n)
      }
      return true
    } else if (o.andSelf || inRecursion) {
      r = v(n)
    }
    return r
  } else {
    if (o.andSelf || inRecursion) {
      r = v(n)
    }
    if (r) {
      if (!o.visitDescendantsOnSelfSignalAnyway) {
        return true
      } else {
          return ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true)) || true // true because self was signaled
      }
    } else {
        return ((n.childNodes || []) as T[]).some(c => visitDescendants(c, v, o, true))
    }
  }
}

// export function mapDescendants<T extends ASTNode = any, V=any>(n: T[], v: (n: T) => V): V[] {
//   const r: V[] = []
//    n.map(o=>visit(o, n=>!!r.push(v(n))&&false), true)
//    return r
// }


export type NodeSimplePredicate<T extends ASTNode> = (n: T, i?: number, a?: T[]) => boolean

export type NodeKindPredicate<T extends ASTNode> = (n: T, i?: number, a?: T[]) => n is T

export type NodePredicate<T extends ASTNode> = NodeSimplePredicate<T> | (NodeKindPredicate<T>)

export function filterDescendants<T extends ASTNode>(n: T, p: NodePredicate<T>, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitDescendants<T>(
    n,
    c => {
      if (p(c)) {
        a.push(c)
      }
      return false
    },
    o
  )
  return a
}

export function mapDescendants<T extends ASTNode, V = any>(n: T, p: (p: T) => V, o: VisitorOptions = {}): V[] {
  const a: V[] = []
  visitDescendants(
    n,
    c => {
      a.push(p(c as any))
      return false
    },
    o
  )
  return a
}

export function findDescendant<T extends ASTNode>(n: T, p: NodePredicate<T>, o: VisitorOptions = {}): T | undefined {
  let a: T | undefined
  visitDescendants(
    n,
    c => {
      if (p(c)) {
        a = c
        return true
      }
      return false
    },
    o
  )
  return a
}
// function addParent(n: any, parent?: any) {
//   visit(n, (n, parent) => {
//     n.parent = parent
//     if (n.value) {
//       n.nodes = n.nodes || []
//       // n.valueLiteral = n.value
//       const parsed = JSON.parse(JSON.stringify({ 
//         ...tryTo(() => parse(n.value)) || {}, 
//       parent: undefined,
//        type: 'value' 
//       }))
//       // n.value = 
//       n.nodes.push(parsed)
//       parsed.parent = n
//     }
//     if(n.type==='atrule'&&n.name==='media'){
//       n.nodes = n.nodes||[]
//       n.nodes.push(...n.params.split(/[\s()]/).map((w:string)=>parse(w).nodes).flat())
//     }
//     return false
//   })
// }
