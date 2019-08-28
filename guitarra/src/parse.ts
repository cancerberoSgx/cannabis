import { tryTo, visitJson, isArray, JSONValue, JSONArray, JSONObject, array, objectKeys, isObject } from 'misc-utils-of-mine-generic'
import { ASTNode } from './astNode'


export function parse(s: string) {
  const o = JSON.parse(s)
  const root = process(o, '/')
  return root
}
function process(o:JSONValue, nameOrIndex: string|number, parent?: ASTNode): ASTNode{
var p : ASTNode =  {
  type: isArray(o) ? 'array' : typeof o as any,
parent,
childNodes: [],
  attributes: {...isArray(o)?{length: o.length}: {}, ...{[typeof nameOrIndex==='string'?'name':'index']: nameOrIndex}, ...{value: o}}
}
  p.childNodes= [...isArray(o) ? array(o.length-1) : typeof o==='object' ?objectKeys(o||[]) : []].map(k=>process((o as any)[k as any], k, p as any))
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
    return false
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
