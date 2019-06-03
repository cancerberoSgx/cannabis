import ASTQ from 'astq'
import { all, every } from 'micromatch'
import { asArray, compareTexts, isArray, isString, notUndefined, stringToObject } from 'misc-utils-of-mine-generic'
import { getExtendsRecursively, getExtendsRecursivelyNames, getImplementsAll, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { ASTNode, getASTNodeDescendants, getASTNodeParent, getASTNodeText, getNodeProperty } from '../astNode'
import { ExecutionContext } from '../queryAst'
const stringify = require('string.ify')

export function installFunctions(astq: ASTQ) {

  astq.func('isFunctionLike', (adapter, node, arg?) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })

  astq.func('getExtended', (adapter, node, arg?) => {
    return getExtendsRecursively(arg || node) || []
  })

  astq.func('matchEvery', (adapter, node, input: string | string[], patterns: string | string[]): boolean => {
    return every(splitString(input), splitString(patterns))
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

  astq.func('findReferences', (adapter, node, arg) => {
    return isNode(arg || node) && tsMorph.TypeGuards.isReferenceFindableNode(arg || node) && (arg || node).findReferencesAsNodes() || []
  })

  astq.func('sourceFile', (adapter, node, arg?) => {
    return isNode(arg || node) && (arg || node).getSourceFile() || null
  })

  astq.func('kindName', (adapter, node, arg?) => {
    return isNode(arg || node) && (arg || node).getKindName()
  })

  astq.func('debug', (adapter, node, ...args: any[]) => {
    const context = getNodeProperty<ExecutionContext>(astq as any, 'context')
    if (!context || !context.logs) {
      return true
    }
    if (!args || args.length === 0) {
      args = [node]
    }
    if (args) {
      args = asArray(args)
    }
    if (typeof context.logs === 'function') {
      context.logs(...args)
    }
    else if (isArray(context.logs)) {
      context.logs.push(args.length ? args.map(a => stringify(a)).join(', ') : node)
    }
    return true // return tue so users can write AND expressions and keep the query.
  })

  astq.func('parent', (adapter, node, arg?) => {
    return getASTNodeParent(arg || node) || null
  })

  astq.func('children', (adapter, node, arg?) => {
    return getASTNodeDescendants(arg || node) || []
  })

  astq.func('join', (adapter, node, arr: string[], joinChar?: string) => {
    return isArray(arr) && arr.join(joinChar || ' ') || ''
  })

  astq.func('array', (adapter, node, ...args: any[]) => {
    return args && isArray(args) ? args : []
  })

  astq.func('stringArray', (adapter, node, ...args: any[]) => {
    return (args && isArray(args) ? args : []).map(e => e + '')
  })

  astq.func('map', (adapter, node, arr: any[], propertyName: string) => {
    return propertyName && arr && isArray(arr) && isString(propertyName) ? arr.filter(notUndefined).map(e => typeof e[propertyName] === 'function' ? e[propertyName].apply(e, []) : e[propertyName]).filter(notUndefined) : []
  })

  astq.func('compareText', (adapter, node, actual: string, expected: string, options?: string) => {
    if (!actual || !expected) {
      return false
    }
    return compareTexts(splitString(actual), splitString(expected), stringToObject(options))
  })

  astq.func('includes', (adapter, node, a: string | any[], b: any) => {
    if (isString(a)) {
      return a.includes(b)
    }
    else if (isArray(a)) {
      return a.includes(b)
    }
    else {
      false
    }
  })

}


function splitString(s: string | string[], splitChar = ',') {
  return isArray(s) ? s : isString(s) ? s.split(splitChar) : []
}
