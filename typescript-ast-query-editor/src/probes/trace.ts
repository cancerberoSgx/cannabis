// import { fail, ok } from 'assert'
// import { notSameNotFalsy, printMs } from 'misc-utils-of-mine-generic'
// import { isArray } from 'util'
// import { StepTraceEvent, ASTNode, loadProject, setConfig, queryAst, getASTNodeName, getASTNodeKindName } from 'cannabis'

// export interface TraceNode {
//   event: StepTraceEvent<ASTNode>
//   children: TraceNode[]
//   time: number
//   parent?: TraceNode
// }
// class Tracer {
//   private events: TraceNode[] = [];
//   // private nodes: TraceNode[]
//   private onFinish?: (events: TraceNode[]) => void;
//   getEvents() {
//     return this.events
//   }
//   constructor(options: {
//     onFinish: (events: TraceNode[]) => void;
//   }) {
//     this.onFinish = options.onFinish && options.onFinish.bind(this)
//     this.trace = this.trace.bind(this)
//   }
//   trace(e: StepTraceEvent<ASTNode>) {
//     const node: TraceNode = { event: e, children: [], time: 0 }
//     this.events.push(node)
//     if (e.event === 'finishSearch') {
//       // console.log(this.events.filter(e=>e.event.event==='endStep').map(e=>indent(e.event.nodeDepth)+ e.event.queryNode.type() +'-'+ getASTNodeKindName(e.event.node) + ' - ' +shorter(getASTNodeText(e.event.node))+' - '+e.time).join('\n'));

//       // console.log(this.events.filter(e=>e.event.event==='endStep').map(e=>indent(e.event.queryNodeDepth)+ e.event.queryNode.type() +'-'+ getASTNodeKindName(e.event.node) + ' - #' +(e.event.matches||[]).length+' - '+e.time).join('\n'));

//       this.onFinish && this.onFinish(this.events)
//     }
//     if (e.event === 'endStep') {
//       const fi = this.events.map(e => e.event).findIndex(ee => ee.event === 'beginStep' && e.nodeDepth === ee.nodeDepth && e.node == ee.node)
//       if (fi !== -1) {
//         node.children.forEach(e=>{
//           if(e.parent){
//             e.parent.children =(e.parent.children||[]).filter(c=>c!==e)
//           }
//           e.parent = node
//         })
//         node.children = this.events.slice(fi + 1, this.events.length - 1).filter(f => f.event.event === 'endStep')
//         const f = this.events[fi]
//         node.time = e.timestamp - f.event.timestamp
//         // this.events.splice(fi, 1
//         // this.events = this.events.filter(n => !node.children.includes(n))

//         // this.events = this.events.filter(f=>f.event.event==='endStep')
//         ok(typeof node.time === 'number')
//       } else {
//         fail('no beginStep for endStep ' + e)
//       }
//     }
//   }
// }

// export function test() {


//   const tracer = new Tracer({
//     onFinish: events => {
//       const finishSearch = events.find(e => e.event.event === 'finishSearch')!
//       const finishCompile = events.find(e => e.event.event === 'finishCompile')!
//       // debugger
//     }
//   })

//   // const root = loadProject('../cannabis/test/assets/project1/tsconfig.json').getRootDirectory()
//   // setConfig({cacheReferences: true, cacheAncestors: true, cacheDerivedClasses: true, cacheExtended: true, cacheImplemented: true, cacheNodePaths: true, cacheTypeText: true, cacheImplementations: true})
//   setConfig({ 'cacheReferences': false, cacheAncestors: false, cacheDerivedClasses: false, cacheExtended: false, cacheImplemented: false, cacheNodePaths: false, cacheTypeText: false, cacheImplementations: false })

//   const t0 = Date.now()
//   let result = queryAst(`
// // * [
//   includes(kindName(flat(ancestors(findReferences()))), 'ImportDeclaration')
//   &&
//   !includes( kindName(ancestors()), 'ImportDeclaration' )
// ]
//   `,
//     // root
//     'var a = 1; export interface I{foo():boolean} ;export function f<T extends string[]>(s: I){return s.foo()}'
//     ,
//     { trace: tracer.trace }
//   )

//   console.log('Time', printMs(Date.now() - t0))

//   if (result.error) {
//     console.error(result.error)
//   }
//   // console.log(result.result!.map(getASTNodeName).filter(notSameNotFalsy))
//   // console.log(JSON.stringify(toJson(tracer.getEvents())))
//   // writeFileSync('test.json', JSON.stringify(toJson(tracer.getEvents()), null, 2))
//   function toJson(nodes: TraceNode[]): TraceNodeJSON[] {
//     return nodes.map(n => {
//       //  if(n.event.matches && !n.event.matches!.map){
//       //    console.log(typeof n.event.matches, isArray(n.event.matches), n.event.matches);

//       //  }
//       return {
//         time: n.time,
//         matches: (isArray(n.event.matches) ? n.event.matches : []).length,//map(getASTNodeKindName),
//         nodeDepth: n.event.nodeDepth,
//         node: getASTNodeKindName(n.event.node),
//         // queryNode: n.event.queryAst!,
//         queryNode: n.event.queryNode && { 
//           type: n.event.queryNode.type(), 
//           attrs: n.event.queryNode.attrs().map(a => `${a}=${n.event.queryNode.get(a)}`) },
//         queryNodeDepth: n.event.queryNodeDepth,
//         children: toJson(n.children)
//       }
//     })

//   }

//   return { result, tracer, json: toJson(tracer.getEvents()) }
// }

// interface TraceNodeJSON {
//   time: number;
//   // matches: string[];
//   matches: number
//   nodeDepth: number;
//   node: string;
//   // queryNode:string
//   queryNode: any;
//   queryNodeDepth: number
//   children: TraceNodeJSON[];
// }

// test()
