// import { ASTNode } from "./astNode";
// import { StepTraceEvent, TraceListener } from 'astq';
// import { RemoveProperties } from 'misc-utils-of-mine-generic';
// import { Node } from './queryAst';
// import { tsMorph, isGeneralNode } from 'ts-simple-ast-extra';
// import { getFile } from './file';

// interface SolveStep<T extends ASTNode = Node> extends RemoveProperties<StepTraceEvent<T>, 'event'> {
//   time: number;
//   event: 'step' | 'compile'|'search';
// }

// export interface QueryAstOptions<T extends ASTNode = ASTNode> {
//   /**
//    * If true the query execution will be traced, step by step, probably affecting performance but useful to debug and understand the internal process. Default value is false.
//    */
//   trace?: boolean|TraceListener<T>
//   /**
//    * Query execution parameters to be consumable using `{param1}` syntax (similar to attributes). Default value is `{}.`
//    */
//   params?: { [name: string]: any }
// }
// // export interface ExecutorProps<T extends ASTNode = Node> {

// // }




// export interface ExecuteAndCompileOptions<T extends ASTNode = Node> {
//   query: string, 
//   codeOrNode: string | ts.Node | ASTNode, 
//   options?: QueryAstOptions<T>
// }
// export class ExecutorImpl<T extends ASTNode = Node> {
//   // constructor(protected props: ExecutorProps<T>){

//   // }
//   addTraceListener(e: SolveStep<T>){

//   }
//   executeAndCOmpile({query, codeOrNode, options: {}}: ExecuteAndCompileOptions<T>){
//     let node: Node | tsMorph.Directory
//     if (typeof codeOrNode === 'string') {
//       node = getFile(codeOrNode)!
//     }
//     else if (isGeneralNode(codeOrNode)) {
//       node = codeOrNode
//     }
//     else {
//       node = getFile(codeOrNode.getText())
//     }
//   }

// }

// export function defaultTraceHandler<T extends ASTNode = Node>(e: StepTraceEvent<T>) {
//   const events: StepTraceEvent<T>[] = [];
//   const solved: SolveStep<T>[] = [];
//   if (e.event === 'beginStep' || e.event === 'startCompile' || e.event === 'startSearch') {
//     events.push(e);
//   }
//   else if (e.event === 'endStep') {
//     const begin = events.find(be => be.node === e.node);
//     if (begin) {
//       const s = { ...begin, event: 'step' as any, time: e.timestamp - begin.timestamp };
//       solved.push(s);
//     }
//     else {
//       console.error('end event but not begin step event found', e);
//     }
//   }
//   else if (e.event === 'finishCompile') {
//     const begin = events.find(be => be.node === e.node && be.event === 'startCompile');
//     if (begin) {
//       const s = { ...begin, ...e, event: 'compile' as any, time: e.timestamp - begin.timestamp };
//       solved.push(s);
//     }
//     else {
//       console.error('end event but not begin compile event found', e);
//     }
//   }
//   else if (e.event === 'finishSearch') {
//     const begin = events.find(be => be.node === e.node && be.event === 'startSearch');
//     if (begin) {
//       const s = { ...begin, ...e, event: 'search' as any, time: e.timestamp - begin.timestamp };
//       solved.push(s);
//     }
//     else {
//       console.error('end event but not begin search event found', e);
//     }
//   }
//   else if (e.event === 'finishCompile') {
//     const begin = events.find(be => be.node === e.node && be.event === 'startCompile');
//     if (begin) {
//       const s = { ...begin, ...e, event: 'coimpile' as any, time: e.timestamp - begin.timestamp };
//       solved.push(s);
//     }
//     else {
//       console.error('end event but not begin search event found', e);
//     }
//   }
// }
