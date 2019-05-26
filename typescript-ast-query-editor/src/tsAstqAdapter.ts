import { createSourceFile, queryAst, ASTFile } from 'cannabis';
import { getEditorText } from './monaco';

// import ASTQ from 'astq'
// import * as ts from 'typescript'
// import { getChildren, getKindName } from 'typescript-ast-util'
// import ASTQClass from './astq'
// import { getEditorText } from './monaco'
// const ASTQ = require('astq') as typeof ASTQClass

// let astq = new ASTQ<ts.Node>()

// astq.adapter({
//   taste(node: any) {
//     return node && typeof node.kind === 'number'
//   },
//   getParentNode(node: ts.Node) {
//     return node && node.parent
//   },
//   getChildNodes(node: ts.Node) {
//     return node && getChildren(node, false)
//   },
//   getNodeType(node: ts.Node) {
//     return node && getKindName(node)
//   },
//   getNodeAttrNames(node: ts.Node) {
//     return ['text']
//   },
//   getNodeAttrValue(node: ts.Node, attr: string) {
//     if (node && attr === 'text') {
//       return node.getText()
//     }
//   }
// })

export function executeQuery(q: string) {
  const result =  queryAst(q, getSourceFile())
  if(result.error){
    console.error(result.error);
  }
  return result
  // try {
  //   return { result: astq.query(node, q) }
  // } catch (error) {
  //   return { error }
  // }
}
 

// export function updateCode(code: string = getEditorText()) {
//   sourceFile = ts.createSourceFile("foo.ts", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
// }

let sourceFile: ASTFile | undefined
let dirty = true
export function setDirty(d: boolean = true) {
  dirty = d
}
export function getSourceFile() {
  if (!sourceFile || dirty) {
    sourceFile = createSourceFile( getEditorText())
    dirty = false
  }
  return sourceFile!
}
