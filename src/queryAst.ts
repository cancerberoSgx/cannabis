import ASTQClass from './astq'
import {ts, tsMorph, getExtendsRecursively, getExtendsRecursivelyNames, getImplementsAllNames, getGeneralNodeParent} from 'ts-simple-ast-extra'
import { getFile } from './file';
type Node = tsMorph.Node

const ASTQ = require('astq') as typeof ASTQClass


let astq: ASTQClass<Node> | undefined

function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<Node>();
    astq.adapter({
      taste(node: any) {
        return tsMorph.TypeGuards.isNode(node)
      },
      getParentNode(node: Node) {
        // return getGeneralNodeParent(node)
        return node && node.getParent();
      },
      getChildNodes(node: Node) {
        return node && node.forEachChildAsArray()//getChildren(node, false);
      },
      getNodeType(node: Node) {
        return node && node.getKindName()
      },
      getNodeAttrNames(node: Node) {
        return ['text', 'name'];
      },
      getNodeAttrValue(node: Node, attr: string) {
return getAttribute(node, attr)
      }
    })
    installFunctions(astq)
  }
  return astq
}
function getAttribute(node: Node, attr: string){
  if(!node){
    return undefined
  }
  else if (attr === 'text') {
    return node.getText();
  }
  else if (attr === 'name') {
    const id = node.getChildrenOfKind(ts.SyntaxKind.Identifier)
    return id && id.length && id[0].getText()
  }
  else if (attr === 'type') {
    return node.getType().toString()
  }
  else if (attr === 'modifiers') {
    return tsMorph.TypeGuards.isModifierableNode(node) && node.getModifiers().map(n=>n.getText()).join(' ')
  }
  //body, expression, symbol, type, pos, start, getModifiers, 
}
function installFunctions(astq: ASTQClass){
  astq.func('isFunctionLike', (adapter, node)=>{
    return ts.isFunctionLike(node.compilerNode)
  })
  astq.func('extendsNamed', (adapter, node, classOrInterfaceName)=>{
    return  (tsMorph.TypeGuards.isClassDeclaration(node)||tsMorph.TypeGuards.isInterfaceDeclaration(node)) && getExtendsRecursivelyNames(node).includes(classOrInterfaceName)
  })
  astq.func('implementsNamed', (adapter, node, interfaceName)=>{
    return  (tsMorph.TypeGuards.isClassDeclaration(node) ) && getImplementsAllNames(node).includes(interfaceName)
  })
}

export function queryAst(q: string, codeOrNode: string | ts.Node |tsMorph.SourceFile) {
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
    return { result: getTypeScriptAstq().query(node, q) }
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