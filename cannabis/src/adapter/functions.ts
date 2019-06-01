import ASTQ from 'astq'
import { compareTexts, isString, stringToObject } from 'misc-utils-of-mine-generic'
import { getExtendsRecursively, getExtendsRecursivelyNames, getImplementsAll, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { getASTNodeDescendants, getASTNodeParent } from '../astNode'
import { ExecutionContext } from '../queryAst'
const stringify = require('string.ify')

export function installFunctions(astq: ASTQ, context: ExecutionContext) {

  astq.func('isFunctionLike', (adapter, node, arg) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })

  astq.func('getExtended', (adapter, node, arg?) => {
    return getExtendsRecursively(arg || node) || []
  })
  astq.func('getExtendedNames', (adapter, node, arg?) => {
    return getExtendsRecursivelyNames(arg || node) || []
  })
  astq.func('extendsAllNamed', (adapter, node, name, arg3?) => {
    // const extended = getExtendsRecursivelyNames(node)
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(name.split(','), getExtendsRecursivelyNames(node), { verb: 'equals', multiplicity: 'allOf' }) || false

    // if (extended.length === 0) {
    //   return false
    // }
    // const r = compareTexts(extended.join(','), name.split(','), { multiplicity: all ? 'allOf' : 'anyOf', verb: 'contains' })
    // console.log(r, extended.join(','), classOrInterfaceName.split(','));
    // return r
  })
  astq.func('extendsAnyNamed', (adapter, node, name, arg3?) => {
    // const extended = getExtendsRecursivelyNames(node)
    if (typeof arg3 === 'string') {
      node = name
      name = arg3
    }
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) &&
      compareTexts(name.split(','), getExtendsRecursivelyNames(node), { verb: 'equals' }) || false//.find(n=>name === n)||false

    // if (extended.length === 0) {
    //   return false
    // }
    // const r = compareTexts(extended.join(','), name.split(','), { multiplicity: all ? 'allOf' : 'anyOf', verb: 'contains' })
    // console.log(r, extended.join(','), classOrInterfaceName.split(','));
    // return r
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
    console.log(getImplementsAllNames(node), name.split(','), compareTexts(name.split(','), getImplementsAllNames(node), { verb: 'equals', multiplicity: 'allOf' }))

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

  astq.func('compareText', (adapter, node, actual: string, expected: string, options?: string) => {
    if (!actual || !expected) {
      return false
    }
    // console.log(actual.split(','), expected.split(','), stringToObject(options), compareTexts(actual.split(','), expected.split(','), stringToObject(options)));

    return compareTexts(actual.split(','), expected.split(','), stringToObject(options))
  })

  astq.func('contains', (adapter, node, a: string | any[], b: any) => {
    if (isString(a)) {
      return a.includes(b)
    }
    else {
      return !!a.find(a => a === b)
    }
  })



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



