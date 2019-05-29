import ASTQ from 'astq'
import { getExtendsRecursivelyNames, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'

export function installFunctions(astq: ASTQ) {
  astq.func('isFunctionLike', (adapter, node) => {
    return isNode(node) && ts.isFunctionLike(node.compilerNode)
  })
  astq.func('extendsNamed', (adapter, node, classOrInterfaceName) => {
    return isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node) || tsMorph.TypeGuards.isInterfaceDeclaration(node)) && getExtendsRecursivelyNames(node).includes(classOrInterfaceName)
  })
  astq.func('implementsNamed', (adapter, node, interfaceName) => {
    return isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node) && getImplementsAllNames(node).includes(interfaceName)
  })
  astq.func('findReferences', (adapter, node) => {
    return isNode(node) && tsMorph.TypeGuards.isReferenceFindableNode(node) && node.findReferencesAsNodes()
  })
  astq.func('sourceFile', (adapter, node) => {
    return isNode(node) && node.getSourceFile()
  })
  astq.func('kindName', (adapter, node, arg?) => {
    return arg ? isNode(arg) && arg.getKindName() : isNode(node) && node.getKindName() || ''
  })
  astq.func('debug', (adapter, node, ...args: any[]) => {
    // typeof appendFileSync!=='undefined' && appendFileSync('log2.txt', args.map(a=>inspect(a)).join(', ')+'\n')
    console.log(...args)
    return true
  })

  // astq.func('type', (adapter, node, arg) => {   
  //   return isNode(arg) && tryTo(()=>arg.getType().getText()) || ''
  // })

}


// * [ @type!='' && @type!='any' && @type!=null && debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
// * [  debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
// * [ (@type=='' || @type=='any' || @type==null) && debug('*', kindName(), '*' ,@type, '*' ,@name,'*' , @text)]
