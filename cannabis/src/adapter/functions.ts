import ASTQ from 'astq'
import { all, every } from 'micromatch'
import { asArray, compareTexts, isArray, isString, notUndefined, stringToObject } from 'misc-utils-of-mine-generic'
import { isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, ASTNodeType, getASTNodeAncestors, getASTNodeChildren, getASTNodeKindName, getASTNodeName, getASTNodeParent, getASTNodeSiblings, getASTNodeText } from '../node/astNode'
import { findReferences, getASTNodeType, getASTNodeTypeAsString, getDerivedClasses, getExtended, getExtendedNames, getImplementations, getImplemented, getImplementedNames, getReturnType, localNames } from '../node/astNodeType'
import { getASTNodeNamePath } from '../node/path'
import { getConfig } from '../query/config'
// import { ExecutionContext } from '../queryAst'
import { getSourceFile, print, propertyValue, splitString } from './util'

export function installFunctions(astq: ASTQ) {

  astq.func('isFunctionLike', (adapter, node, arg?) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })

  astq.func('getExtended', (adapter, node, arg?) => {
    return getExtended(arg || node)
  })

  astq.func('derivedClasses', (adapter, node, arg?) => {
    return getDerivedClasses(arg || node)
  })

  astq.func('matchEvery', (adapter, node, input: string | string[], patterns: string | string[]): boolean => {
    const s = splitString(input)
    if (s.find(s => typeof s !== 'string') !== undefined) {
      return false
    }
    const p = splitString(patterns)
    if (p.find(s => typeof s !== 'string') !== undefined) {
      return false
    }
    return every(s, p)
  })

  astq.func('matchAll', (adapter, node, input: string | string[], patterns: string | string[]): boolean => {
    const s = splitString(input)
    if (s.find(s => typeof s !== 'string') !== undefined) {
      return false
    }
    const p = splitString(patterns)
    if (p.find(s => typeof s !== 'string') !== undefined) {
      return false
    }
    return all(s, p)
  })

  astq.func('getExtendedNames', (adapter, node, arg?) => {
    return getExtendedNames(arg || node) || []
  })

  astq.func('text', (adapter, node, arg?) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeText) : getASTNodeText(n)
  })

  astq.func('name', (adapter, node, arg?) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeName) : getASTNodeName(n)
  })

  astq.func('extendsAllNamed', (adapter, node, nameOrNode: ASTNode | string | string[], name?: string | string[]) => {
    if (typeof name === 'string') {
      node = nameOrNode
      nameOrNode = name
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(splitString(nameOrNode as string | string[]), getExtendedNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false
  })

  astq.func('extendsAnyNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(splitString(name), getExtendedNames(node), { verb: 'equals' }) || false
  })

  astq.func('getImplemented', (adapter, node, arg?) => {
    return getImplemented(arg || node)
  })

  astq.func('getImplementations', (adapter, node, arg?) => {
    return getImplementations(arg || node)
  })

  astq.func('getImplementedNames', (adapter, node, arg?) => {
    return getImplementedNames(arg || node)
  })

  astq.func('implementsAnyNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && compareTexts(name.split(','), getImplementedNames(node), { verb: 'equals', multiplicity: 'anyOf' }) || false
  })

  astq.func('implementsAllNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && compareTexts(name.split(','), getImplementedNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false
  })

  astq.func('findReferences', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = arg || node
    return isArray(n) ? n.map(findReferences) : findReferences(n)
  })

  astq.func('sourceFile', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getSourceFile) : getSourceFile(n)
  })

  astq.func('debug', (adapter, node, ...args: any[]) => {
    // const context = getNodeProperty<ExecutionContext>(astq as any, 'context')
    // if (!context || !context.logs) {
    //   return true
    // }
    const logs = getConfig('logs')
    if (!logs) {
      return true
    }
    if (!args || args.length === 0) {
      args = [node]
    }
    args = asArray(args)
    if (typeof logs === 'function') {
      logs(...args.map(print))
    }
    else if (isArray(logs)) {
      logs.push(args.map(print).join(', '))
    }
    return args[args.length - 1] // return tue so users can write AND expressions and keep the query.
  })

  astq.func('array', (adapter, node, ...args: any[]) => {
    return args && isArray(args) ? args : []
  })

  astq.func('stringArray', (adapter, node, ...args: any[]) => {
    return (args && isArray(args) ? args : []).map(e => e + '')
  })

  astq.func('join', (adapter, node, arr: string[], joinChar?: string) => {
    return isArray(arr) && arr.join(joinChar || ' ') || ''
  })

  astq.func('map', (adapter, node, arr: any[], propertyName: string) => {
    return propertyName && arr && isArray(arr) && isString(propertyName) ? arr.filter(notUndefined).map(e => propertyValue(e, propertyName)).filter(notUndefined) : []
  })

  astq.func('compareText', (adapter, node, actual: string, expected: string, options?: string) => {
    const a = splitString(actual || []).filter(notUndefined)
    const e = splitString(expected || []).filter(notUndefined)
    const o = stringToObject(options || '') || {}
    if (!a || !e.length || !a.length || !e.length) {
      return false
    }
    return compareTexts(a, e, o)
  })

  astq.func('flat', (adapter, node, arr: any[]) => {
    return arr && isArray(arr) && arr.length ? isArray(arr[0]) ? arr.flat() : arr : []
  })

  astq.func('declarations', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = asArray((arg || node) as tsMorph.Node)
    return n.map(n => {
      if (isNode(n)) {
        const s = n.getSymbol()
        return s && s.getDeclarations() || []
      } else {
        return []
      }
    }).flat()
  })

  astq.func('namePath', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    return getASTNodeNamePath(arg || node)
  })

  astq.func('ancestors', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeAncestors) : getASTNodeAncestors(n)
  })

  astq.func('siblings', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeSiblings) : getASTNodeSiblings(n)
  })

  astq.func('children', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(n => getASTNodeChildren(n)) : getASTNodeChildren(n)
  })

  astq.func('parent', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeParent) : getASTNodeParent(n)
  })

  astq.func('kindName', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = arg || node
    return isArray(n) ? n.map(getASTNodeKindName) : getASTNodeKindName(n)
  })

  astq.func('includes', (adapter, node, a: string | any[], b?: any) => {
    const n = b || node
    if (isArray(a) || isString(a)) {
      // in case of includes([['a'], ['a']], 'a') we could do some magic but we we won't :
      // if (a && a.length && isString(a[0])) {
      // }
      return a.includes(n)
    }
    return false
  })

  astq.func('localNames', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(localNames) : localNames(n)
  })

  astq.func('typeText', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeTypeAsString) : getASTNodeTypeAsString(n)
  })
  astq.func('Type', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeType) : getASTNodeType(n)
  })

  astq.func('returnType', (adapter, node, arg?: ASTNodeType | ASTNodeType[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getReturnType) : getReturnType(n)
  })

  astq.func('get', (adapter, node, nodesOrName?: string | ASTNodeType | ASTNodeType[], name?: string) => {
    let n: any
    if (typeof nodesOrName === 'string') {
      n = node
      name = nodesOrName
    }
    else {
      n = (nodesOrName || node)
    }
    if (!name) {
      return null
    }
    return isArray(n) ? n.map(c => propertyValue(c, name)) : propertyValue(n, name)
  })
}


