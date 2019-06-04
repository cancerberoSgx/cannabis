import ASTQ from 'astq'
import { all, every } from 'micromatch'
import { asArray, compareTexts, isArray, isString, notUndefined, stringToObject } from 'misc-utils-of-mine-generic'
import { getExtendsRecursivelyNames, getImplementsAll, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeAncestors, getASTNodeChildren, getASTNodeKindName, getASTNodeParent, getASTNodeText, getNodeProperty } from '../astNode'
import { getASTNodeNamePath } from '../path'
import { ExecutionContext } from '../queryAst'
import { findReferences, getExtendsDefinitionsRecursively, getSourceFile, print, splitString } from './util'



export function installFunctions(astq: ASTQ) {

  astq.func('isFunctionLike', (adapter, node, arg?) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })

  astq.func('getExtended', (adapter, node, arg?) => {
    return (tsMorph.TypeGuards.isClassDeclaration(arg || node) || tsMorph.TypeGuards.isInterfaceDeclaration(arg || node)) ? getExtendsDefinitionsRecursively(arg || node) : []
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
    return all(splitString(input), splitString(patterns))
  })
  astq.func('getExtendedNames', (adapter, node, arg?) => {
    return getExtendsRecursivelyNames(arg || node) || []
  })

  astq.func('text', (adapter, node, arg?) => {
    return getASTNodeText(arg || node) || ''
  })

  astq.func('extendsAllNamed', (adapter, node, nameOrNode: ASTNode | string | string[], name?: string | string[]) => {
    if (typeof name === 'string') {
      node = nameOrNode
      nameOrNode = name
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(splitString(nameOrNode as string | string[]), getExtendsRecursivelyNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false
  })

  astq.func('extendsAnyNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(name.split(','), getExtendsRecursivelyNames(node), { verb: 'equals' }) || false
  })

  astq.func('getImplementations', (adapter, node, arg?) => {
    return getImplementsAll(arg || node) || []
  })

  astq.func('getImplementationNames', (adapter, node, arg?) => {
    return getImplementsAllNames(arg || node) || []
  })

  astq.func('implementsAnyNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && compareTexts(name.split(','), getImplementsAllNames(node), { verb: 'equals', multiplicity: 'anyOf' }) || false
  })

  astq.func('implementsAllNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && compareTexts(name.split(','), getImplementsAllNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false
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
    const context = getNodeProperty<ExecutionContext>(astq as any, 'context')
    if (!context || !context.logs) {
      return true
    }
    if (!args || args.length === 0) {
      args = [node]
    }
    args = asArray(args)
    if (typeof context.logs === 'function') {
      context.logs(...args.map(print))
    }
    else if (isArray(context.logs)) {
      context.logs.push(args.map(print).join(', '))
    }
    return args[args.length - 1] // return tue so users can write AND expressions and keep the query.
  })

  astq.func('array', (adapter, node, ...args: any[]) => {
    return args && isArray(args) ? args : []
  })

  astq.func('stringArray', (adapter, node, ...args: any[]) => {
    return (args && isArray(args) ? args : []).map(e => e + '')
  })

  astq.func('children', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(n => getASTNodeChildren(n)) : getASTNodeChildren(n)
    // getASTNodeDescendants(arg || node) || []
  })

  astq.func('join', (adapter, node, arr: string[], joinChar?: string) => {
    return isArray(arr) && arr.join(joinChar || ' ') || ''
  })

  astq.func('map', (adapter, node, arr: any[], propertyName: string) => {
    // function getFunctions(){
    //   return (astq as any)._funcs._funcs
    // }
    return propertyName && arr && isArray(arr) && isString(propertyName) ? arr.filter(notUndefined).map(e => typeof e[propertyName] === 'function' ? e[propertyName].apply(e, []) :
      // (typeof e[propertyName]==='undefined' && typeof getFunctions()[propertyName]==='function') ? getFunctions()[propertyName](e) :
      e[propertyName]).filter(notUndefined) : []
  })

  astq.func('compareText', (adapter, node, actual: string, expected: string, options?: string) => {
    if (!actual || !expected) {
      return false
    }
    return compareTexts(splitString(actual), splitString(expected), stringToObject(options))
  })

  astq.func('flat', (adapter, node, arr: any[]) => {
    return arr && isArray(arr) && arr.length ? isArray(arr[0]) ? arr.flat() : arr : []
  })

  astq.func('declarations', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    // console.log(astq);
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

  astq.func('parent', (adapter, node, arg?: ASTNode | ASTNode[]) => {
    const n = (arg || node)
    return isArray(n) ? n.map(getASTNodeParent) : getASTNodeParent(n)
  })

  astq.func('kindName', (adapter, node: ASTNode, arg?: ASTNode | ASTNode[]) => {
    const n = arg || node//) as tsMorph.Node|tsMorph.Node[]
    return isArray(n) ? n.map(getASTNodeKindName) : getASTNodeKindName(n)
    // return isNode(arg || node) && (arg || node).getKindName()
  })

  astq.func('includes', (adapter, node, a: string | any[], b?: any) => {
    // if (isString(a)&&b) {
    //   return a.includes(b)
    // }
    // else if (isArray(a)) {
    // console.log(asArray(a).map(getASTNodeText), b||node);      
    return asArray(a).includes(b || node)
    // }
    // else {
    //   false
    // }
  })


}

