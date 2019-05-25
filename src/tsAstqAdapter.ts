import ASTQ from 'astq'
import * as ts from 'typescript'
import { getEditorText } from './monaco';
import { getChildren, getKindName } from './tsUtil';

var astq = new ASTQ<ts.Node>()

astq.adapter({
  taste(node: any) {
    return node && typeof node.kind==='number'
  },
  getParentNode(node: ts.Node) {
    return node && node.parent
  },
  getChildNodes(node: ts.Node) {
    return node && getChildren(node, false)
  },
  getNodeType(node: ts.Node) {
    return node && getKindName(node)
  },
  getNodeAttrNames(node: ts.Node) {
    if(!node){
      return []
    }
    return ['nodeFlags']
  },
  getNodeAttrValue(node: ts.Node, attr: string) {
    if(node && attr==='text'){
      return node.getText()
    }
  }
})

export function executeQuery(q: string ) {
  const file1 = ts.createSourceFile("foo.ts", getEditorText(), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return astq.query(file1, q)
}


