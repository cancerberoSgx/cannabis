import ASTQ from 'astq'
import { compareTexts, isArray, isString, stringToObject } from 'misc-utils-of-mine-generic'
import { getExtendsRecursively, getExtendsRecursivelyNames, getImplementsAll, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { getASTNodeDescendants, getASTNodeParent, getASTNodeText } from '../astNode'
import { ExecutionContext } from '../queryAst'
const stringify = require('string.ify')

export function installFunctions(astq: ASTQ, context: ExecutionContext) {

  astq.func('isFunctionLike', (adapter, node, arg?) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })

  astq.func('getExtended', (adapter, node, arg?) => {
    return getExtendsRecursively(arg || node) || []
  })

  astq.func('getExtendedNames', (adapter, node, arg?) => {
    return getExtendsRecursivelyNames(arg || node) || []
  })

  astq.func('text', (adapter, node, arg?) => {
    return getASTNodeText(arg || node) || ''
  })

  astq.func('extendsAllNamed', (adapter, node, name, arg3?) => {
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(name.split(','), getExtendsRecursivelyNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false
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
    context.logs.push(args.length ? args.map(a => stringify(a)).join(', ') : node)
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

  astq.func('includes', (adapter, node, arr: any[], item: any) => {
    return isArray(arr) && arr.includes(item) || false
  })

  astq.func('compareText', (adapter, node, actual: string, expected: string, options?: string) => {
    if (!actual || !expected) {
      return false
    }
    return compareTexts(splitString(actual), splitString(expected), stringToObject(options))
  })

  astq.func('contains', (adapter, node, a: string | any[], b: any) => {
    if (isString(a)) {
      return a.includes(b)
    }
    else {
      return !!a.find(a => a === b)
    }
  })


  function splitString(s: string | string[], splitChar = ',') {
    return isString(s) ? s.split(splitChar) : s
  }
  // astq.func('get', (adapter, node, name: string, ...args: any[]) => {
  //   const getter = name.substring(0,1).toUpperCase()+name.substring(1, name.length)
  //   let value:any|null = null
  //   if(typeof node[getter]==='function'){
  //     value = tryTo(()=>node[getter].apply(node, args))||null
  //   }
  //   else if(typeof node[name]==='function') {
  //     value = tryTo(()=>node[name].apply(node, args))||null
  //   }
  //   else  if(typeof node[name]!=='undefined'){
  //     value = node[name]
  //   }
  //   return value
  // })
}

