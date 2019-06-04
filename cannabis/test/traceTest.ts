import { StepTraceEvent } from 'astq';
import test from 'ava';
import { ASTNode, queryAst } from '.';
import { getASTNodeKindName, isASTNode, getASTNodeText } from '../src/astNode';
import { code3 } from './assets/code';
import { indent, shorter } from 'misc-utils-of-mine-generic';
import { fail } from 'assert';

test.cb('queryAst should let us register a trace event listener', t => {
  class Tracer {
    private events: StepTraceEvent<ASTNode>[] = [];
    private onFinish?: (events: StepTraceEvent<ASTNode>[]) => void;
    constructor(options: {
      onFinish: (events: StepTraceEvent<ASTNode>[]) => void;
    }) {
      this.onFinish = options.onFinish && options.onFinish.bind(this);
      this.trace = this.trace.bind(this);
    }
    trace(e: StepTraceEvent<ASTNode>) {
      this.events.push(e);
      if (e.event === 'finishSearch') {
        this.onFinish && this.onFinish(this.events);
      }
      if(e.event==='endStep'){
        const f = this.events.find(ee=>ee.event==='beginStep'&&e.nodeDepth===ee.nodeDepth&&e.node==ee.node)
        if(f){
          e.totalSearchTime = e.timestamp - f.timestamp
          t.true(typeof  e.totalSearchTime==='number')
        }else {
          t.fail('no beginStep for endStep '+e)
        }
      }
    }
  }
  const tracer = new Tracer({
    onFinish: events => {
      const finishSearch = events.find(e => e.event === 'finishSearch')!;
      t.truthy(finishSearch!.totalSearchTime! > 0);
      const finishCompile = events.find(e => e.event === 'finishCompile')!;
      t.truthy(typeof finishCompile!.totalCompileTime === 'number');
      t.notThrows(() => JSON.parse((finishCompile!.queryAst! as any)));
      events.filter(e => e.event === 'endStep').forEach(e => {
        t.truthy(isASTNode(e.node));
        t.truthy(e.timestamp >= 0);
      });
      setTimeout(() => {
        // console.log(events.filter(e=>e.event==='endStep').map(e=>indent(e.nodeDepth)+ e.queryNode.type() +'-'+ getASTNodeKindName(e.node) + ' - ' +shorter(getASTNodeText(e.node))+' - '+e.totalSearchTime).join('\n'));
        t.falsy(error);
        t.deepEqual(result!.map(getASTNodeKindName), ['Constructor', 'MethodDeclaration', 'FunctionDeclaration', 'MethodDeclaration']);
        t.end();
      }, 100);
    }
  });
  // I need a query that takes more than 1ms for this test
  const { error, result, query } = queryAst(`// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`, code3, tracer);
});
