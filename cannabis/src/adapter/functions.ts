import ASTQ from 'astq'
import { getExtendsRecursivelyNames, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { ExecutionContext } from '../queryAst'
const stringify = require('string.ify')

export function installFunctions(astq: ASTQ, context: ExecutionContext) {
  astq.func('isFunctionLike', (adapter, node, arg) => {
    return isNode((node || arg)) && ts.isFunctionLike((node || arg).compilerNode)
  })
  astq.func('extendsNamed', (adapter, node, classOrInterfaceName) => {
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) && getExtendsRecursivelyNames(node).includes(classOrInterfaceName)
  })
  astq.func('implementsNamed', (adapter, node, interfaceName, arg3?) => {
    if (typeof arg3 === 'string') {
      node = interfaceName
      interfaceName = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && getImplementsAllNames(node).includes(interfaceName)
  })
  astq.func('findReferences', (adapter, node, arg) => {
    return isNode(arg || node) && tsMorph.TypeGuards.isReferenceFindableNode(arg || node) && (arg || node).findReferencesAsNodes()
  })
  astq.func('sourceFile', (adapter, node, arg?) => {
    return isNode(arg || node) && (arg || node).getSourceFile()
  })
  astq.func('kindName', (adapter, node, arg?) => {
    return isNode(arg || node) && (arg || node).getKindName()
  })
  astq.func('debug', (adapter, node, ...args: any[]) => {
    context.logs.push(args.length ? args.map(a => stringify(a)).join(', ') : node)
    return true // return tue so users can write AND expressions and keep the query.
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


