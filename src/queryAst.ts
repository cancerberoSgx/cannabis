import ASTQClass from './astq'
import {ts, tsMorph, isNode, getExtendsRecursivelyNames, getImplementsAllNames, getGeneralNodeParent, GeneralNode, getGeneralNodeChildren, getGeneralNodeKindName} from 'ts-simple-ast-extra'
import { getFile } from './file';
type Node = tsMorph.Node

const ASTQ = require('astq') as typeof ASTQClass


let astq: ASTQClass<GeneralNode> | undefined

function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<GeneralNode>();
    astq.adapter({
      taste(node: any) {
        return tsMorph.TypeGuards.isNode(node)
      },
      getParentNode(node: GeneralNode) {
        // return getGeneralNodeParent(node)
        return getGeneralNodeParent(node)
        // return node && node.getParent()
      },
      getChildNodes(node: GeneralNode) {
        return getGeneralNodeChildren(node)
        // return node && node.forEachChildAAsrray()//getChildren(node, false);
      },
      getNodeType(node: GeneralNode) {
        return getGeneralNodeKindName(node)
      },
      getNodeAttrNames(node: GeneralNode) {
        return ['text', 'name'];
      },
      getNodeAttrValue(node: GeneralNode, attr: string) {
return getAttribute(node, attr)
      }
    })
    installFunctions(astq)
  }
  return astq
}

function getAttribute(node: GeneralNode, attr: string){
  if(!node){
    return undefined
  }
  else if (attr === 'text') {
    return isNode(node) ? node.getText() : ''
  }
  else if (attr === 'name') {
    const id = isNode(node) &&  node.getChildrenOfKind(ts.SyntaxKind.Identifier)
    return id && id.length && id[0].getText()
  }
  else if (attr === 'type') {
    return isNode(node) && node.getType().toString()
  }
  else if (attr === 'sourceFile') {
    return isNode(node) && node.getSourceFile()
  }
  else if (attr === 'modifiers') {
    return isNode(node) && tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n=>n.getText()).join(' ')
  }
  //body, expression, symbol, type, pos, start, getModifiers, 
}

function installFunctions(astq: ASTQClass){
  astq.func('isFunctionLike', (adapter, node)=>{
    return isNode(node) && ts.isFunctionLike(node.compilerNode)
  })
  astq.func('extendsNamed', (adapter, node, classOrInterfaceName)=>{
    return  isNode(node) && (tsMorph.TypeGuards.isClassDeclaration(node)||tsMorph.TypeGuards.isInterfaceDeclaration(node)) && getExtendsRecursivelyNames(node).includes(classOrInterfaceName)
  })
  astq.func('implementsNamed', (adapter, node, interfaceName)=>{
    return  isNode(node) && tsMorph.TypeGuards.isClassDeclaration(node)  && getImplementsAllNames(node).includes(interfaceName)
  })
  astq.func('findReferences', (adapter, node)=>{
    return  isNode(node) && tsMorph.TypeGuards.isReferenceFindableNode(node) && node.findReferencesAsNodes()
  })
}

export function queryAst<T extends GeneralNode = Node>(q: string, codeOrNode: string | ts.Node |tsMorph.SourceFile) {
  let node : tsMorph.SourceFile
  if (typeof codeOrNode === 'string') {
    node = getFile(codeOrNode)!
  }
  else if (tsMorph.TypeGuards.isNode(codeOrNode)){
    node = codeOrNode
  }
  else {
    node = getFile(codeOrNode.getText())
  }
  try {
    return { result: getTypeScriptAstq().query(node, q) as T[] }
  } catch (error) {
    return { error }
  }
}



// isTypeParameteredNode, isAbstractableNode, isAmbientableNode, isArgumentedNode, isAsyncableNode, isAwaitableNode, isBodiedNode, isBodyableNode, DecoratableNode, ScopedNode, staticableNode, PropertyNamedNode, OverloadableNode, GeneratorableNode, ModifierableNode, JSDocableNode, ReadonlyableNode, ExclamationTokenableNode, QuestionTokenableNode, InitializerExpressionableNode, PropertyNamedNode

/*

research

possible attributes:

 // TODO: body, expression, symbol, type, pos, start, fullStart, fuillText, width, fullWIdth, leadingtriviaWidth, trailingTriviaWidth, trailingTriviaEnd, getCombinedModifierFlags, getLastToken, childIndex, getIndentationLevel, getChildIndentationLevel, getIndentationText, getChildIndentationText, getStartLinePos, getStartLineNumber, getEndLineNumber, isFirstNodeOnLine, getLeadingCommentRanges, getTrailingCommentRanges, getScope, getReturnType, isStatic, getTypeArguments, getTypeParameters, getProperties, getStaticProperties, getInstanceProperties, getGetAccessors, getSetAccessors, getMethods, getStaticMethods, getInstanceMethods, getStaticMembers, getInstanceMembers, getMembers, getBaseTypes,. getBaseClass, getDerivedClasses, children, childCount
 
*/