import * as ts from 'typescript'
import ASTQClass from './astq'
import { getChildren, getKindName } from './util';
const ASTQ = require('astq') as typeof ASTQClass


let astq: ASTQClass<ts.Node> | undefined

function getTypeScriptAstq() {
  if (!astq) {
    astq = new ASTQ<ts.Node>();
    astq.adapter({
      taste(node: any) {
        return node && typeof node.kind === 'number';
      },
      getParentNode(node: ts.Node) {
        return node && node.parent;
      },
      getChildNodes(node: ts.Node) {
        return node && getChildren(node, false);
      },
      getNodeType(node: ts.Node) {
        return node && getKindName(node);
      },
      getNodeAttrNames(node: ts.Node) {
        return ['text'];
      },
      getNodeAttrValue(node: ts.Node, attr: string) {
        if (node && attr === 'text') {
          return node.getText();
        }
      }
    })
    installFunctions(astq)
  }
  return astq
}

function installFunctions(astq: ASTQClass){
  astq.func('isFunctionLike', (adapter, node)=>{
    return ts.isFunctionLike(node)
  })
  // astq.func('isSubClassOf', (adapter, node, className)=>{
  //   return  ts.isFunctionLike(node)
  // })
}


export function queryAst(q: string, codeOrNode: string | ts.Node) {
  if (typeof codeOrNode === 'string') {
    codeOrNode = ts.createSourceFile("foo.ts", codeOrNode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  }
  try {
    return { result: getTypeScriptAstq().query(codeOrNode, q) }
  } catch (error) {
    return { error }
  }
}
