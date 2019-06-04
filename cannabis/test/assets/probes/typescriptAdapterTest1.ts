// import ASTQ from 'astq'
// import * as ts from 'typescript'

// var astq = new ASTQ<ts.Node>()

// astq.adapter({
//   taste(node: any) {
//     return node && typeof node.kind==='number'
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
//     if(!node){
//       return []
//     }
//     return ['nodeFlags']
//   },
//   getNodeAttrValue(node: ts.Node, attr: string) {
//     // if(node){
//     //   return undefined
//     // }
//     // if(attr =='flagNames'){
//     //   return  getEnumFlagNames(ts.NodeFlags, node.flags)
//     // }
//     if(node && attr==='text'){
//       return node.getText()
//     }
//   }
// })

// const code = `
// import {Foo, bar} from './aux'
// export class C {
//   private attribute1: number
//   constructor(public id: string = bar()){
//     this.attribute1 = 2
//   }
//   method1(a: number){
//     return new Foo(a).value();
//   }
// }
// `
// const file1 = ts.createSourceFile("foo.ts", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
// // all nodes
// // executeQuery('// *',file1);

// // identifiers direct children of a class declaration. Result: Identifier "C"
// executeQuery('// Identifier [../ClassDeclaration] ', file1);

// // identifiers direct children of a class declaration. Result: Identifier "C" , Identifier "attribute1", Identifier "method1"
// executeQuery('// Identifier [ ../ClassDeclaration || ../MethodDeclaration || ../PropertyDeclaration ] ',file1);



// function executeQuery(q: string, node: ts.Node) {
//   console.log('RESULTS for query ', q);
//   astq.query(node, q).forEach(n => {
//     console.log(` *${indent(getDistanceToAncestor(n, node) - 1)} ${getKindName(n)} "${shorter(n.getText().replace(/[\s\n]+/g, ' '), 30)}"`);
//   });
// }

// function shorter(text: string, much: number = 10): string {
//   return text.trim().substring(0, Math.min(text.length, much))
// }
// function indent(i: number = 1, tabSize = 2): string {
//   return new Array(i * tabSize).fill(0).map(i=>' ').join('')
// }
// function getKindName(kind: number | ts.Node): string {
//   return (kind || kind === 0) ? getEnumKey(ts.SyntaxKind, (kind as ts.Node).kind || kind) : 'undefined'
// }
// function getEnumKey(anEnum: any, value: any): string {
//   for (const key in anEnum) {
//     if (value === anEnum[key]) {
//       return key
//     }
//   }
//   return ''
// }
// function getDistanceToAncestor(n: ts.Node, ancestor: ts.Node): number{
//   if(n===ancestor||!n||!ancestor){
//     return 0
//   }
//   else {
//     return getDistanceToAncestor(n.parent, ancestor) + 1
//   }
// }
// function getChildren(node: ts.Node | undefined, getChildren: boolean = false): ts.Node[] {
//   if (!node) {
//     return []
//   }
//   if (getChildren) {
//     return node.getChildren()
//   }
//   const result: ts.Node[] = []
//   node.forEachChild(c => {
//     result.push(c)
//   })
//   return result
// }
// // function getEnumFlagNames(enumObj: any, flags: number) {
// //   const allFlags = Object.keys(enumObj)
// //       .map(k => enumObj[k]).filter(v => typeof v === "number") as number[];
// //   const matchedFlags = allFlags.filter(f => (f & flags) !== 0);
// //   return matchedFlags
// //       .filter((f, i) => matchedFlags.indexOf(f) === i)
// //       .map(f => enumObj[f]);
// // }
