import { getExtendsRecursivelyNames, getImplementsAllNames, isNode, ts, tsMorph } from 'ts-simple-ast-extra'
import ASTQClass from './astq'

export function installFunctions(astq: ASTQClass) {
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
}
