import { StepTraceEvent } from 'astq';
import { ASTNode, queryAst, getASTNodeName, getASTNodeKindName, getASTNodeText, loadProject } from '../test';
import { fail, ok } from 'assert';
import { code3 } from '../test/assets/code';
import { notSameNotFalsy, shorter, indent } from 'misc-utils-of-mine-generic';

interface TraceNode {
  event: StepTraceEvent<ASTNode>
  children: TraceNode[]
  time: number
}
class Tracer {
  private events: TraceNode[] = [];
  // private nodes: TraceNode[]
  private onFinish?: (events: TraceNode[]) => void;
  constructor(options: {
    onFinish: (events: TraceNode[]) => void;
  }) {
    this.onFinish = options.onFinish && options.onFinish.bind(this);
    this.trace = this.trace.bind(this);
  }
  trace(e: StepTraceEvent<ASTNode>) {
    const node: TraceNode = {event: e, children: [],time: 0}
    this.events.push(node );
    if (e.event === 'finishSearch') {
      // console.log(this.events.filter(e=>e.event.event==='endStep').map(e=>indent(e.event.nodeDepth)+ e.event.queryNode.type() +'-'+ getASTNodeKindName(e.event.node) + ' - ' +shorter(getASTNodeText(e.event.node))+' - '+e.time).join('\n'));

      // console.log(this.events.filter(e=>e.event.event==='endStep').map(e=>indent(e.event.queryNodeDepth)+ e.event.queryNode.type() +'-'+ getASTNodeKindName(e.event.node) + ' - #' +(e.event.matches||[]).length+' - '+e.time).join('\n'));



      this.onFinish && this.onFinish(this.events );
    }
    if(e.event==='endStep'){
      const fi = this.events.map(e=>e.event).findIndex(ee=>ee.event==='beginStep'&&e.nodeDepth===ee.nodeDepth&&e.node==ee.node)
      node.children = this.events.slice(fi+1, this.events.length-1)
      if(fi!==-1){
        const f = this.events[fi]
        node.time = e.timestamp - f.event.timestamp
        this.events.splice(fi, 1)
        ok(typeof node.time==='number')
      }else {
        fail('no beginStep for endStep '+e)
      }
    }
  }
}

function test(){

  const tracer = new Tracer({
    onFinish: events => {
      const finishSearch = events.find(e => e.event.event === 'finishSearch')!;
      const finishCompile = events.find(e => e.event.event === 'finishCompile')!;
      debugger
    }
  });

const root =   loadProject('test/assets/project1/tsconfig.json').getRootDirectory()
  let result = queryAst(`
// * [
  !includes(
    map(ancestors(), 'getKindName')
    , 'ImportDeclaration'
  )
  &&
  includes(
    map(
      flat(
        ancestors(
          findReferences()
        )
      )
    , 'getKindName')
  , 'ImportDeclaration')
  
]
  `, root, {trace: tracer.trace})
  if(result.error){
    console.error(result.error);
    
  }
 console.log(result.result!.map(getASTNodeName).filter(notSameNotFalsy) )
}

 test()