import ASTQ from 'astq'
import { getExtendsRecursivelyNames, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import { tryTo } from 'misc-utils-of-mine-generic';

export function installFunctions(astq: ASTQ) {
  astq.func('isFunctionLike', (adapter, node) => {
    return isNode(node) && ts.isFunctionLike(node.compilerNode)
  })  
  astq.func('extendsNamed', (adapter, node, classOrInterfaceName) => {
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) && getExtendsRecursivelyNames(node).includes(classOrInterfaceName)
  })
  astq.func('implementsNamed', (adapter, node, interfaceName, arg3?) => {
    if(typeof arg3==='string'){
      node = interfaceName
      interfaceName = arg3
    }
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && getImplementsAllNames(node).includes(interfaceName)
  })
  astq.func('findReferences', (adapter, node, arg) => {
    return isNode(arg||node) && tsMorph.TypeGuards.isReferenceFindableNode(arg||node) && (arg||node).findReferencesAsNodes()
  })
  astq.func('sourceFile', (adapter, node, arg?) => {
    return isNode(arg||node) && (arg||node).getSourceFile()
  })
  astq.func('kindName', (adapter, node, arg?) => {
    return  isNode(arg||node) && arg.getKindName(arg||node)
  })
  // astq.func('debug', (adapter, node, ...args: any[]) => {
  //   // typeof appendFileSync!=='undefined' && appendFileSync('log2.txt', args.map(a=>inspect(a)).join(', ')+'\n')
  //   console.log(...args)
  //   return true
  // })
  astq.func('get', (adapter, node, name: string, ...args: any[]) => {
    const getter = name.substring(0,1).toUpperCase()+name.substring(1, name.length)
    let value:any|null = null
    if(typeof node[getter]==='function'){
      value = tryTo(()=>node[getter].apply(node, args))||null
    }
    else if(typeof node[name]==='function') {
      value = tryTo(()=>node[name].apply(node, args))||null
    }
    else  if(typeof node[name]!=='undefined'){
      value = node[name]
    }
    return value
  })
  // astq.func('type', (adapter, node, arg) => {   
  //   return isNode(arg) && tryTo(()=>arg.getType().getText()) || ''
  // })

}


// * [ @type!='' && @type!='any' && @type!=null && debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
// * [  debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
// * [ (@type=='' || @type=='any' || @type==null) && debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
