import { StepTraceEvent } from 'astq'
import test from 'ava'
import { asArray, indent, notSameNotFalsy, printMs, removeWhites } from 'misc-utils-of-mine-generic'
import { notFalsy } from 'misc-utils-of-mine-typescript'
import { isSourceFile } from 'ts-simple-ast-extra'
import { ASTNode, queryAst } from '../src'
import { getTypeScriptAstq } from '../src/adapter/adapter'
import { getGeneralNodeKindName, getNodeProperty, isGeneralNode, setNodeProperty, getASTNodeDescendants } from '../src/astNode'
import { getFile } from '../src/file'
import { code2, code3 } from './assets/code'
import { isString, printNode } from './testUtil'

test('compile and execute should be invocable manually', async t => {
  const astq = getTypeScriptAstq()
  const b: (string | number)[][] = []
  const events: StepTraceEvent<ASTNode>[] = []
  function trace(e: StepTraceEvent<ASTNode>) {
    if (e.event === 'beginStep') {
      events.push(e)
    } else if (e.event === 'endStep') {
      const begin = events.find(be => be.node === e.node)
      if (begin) {
        setNodeProperty(e.node, 'traceTest1Events', { ...begin, ...e, t: e.timestamp - begin.timestamp })
      } else {
        console.error('end event but not begin event found', e)
      }
    }
    else if (e.event === 'finishSearch') {
      b.push(['SEARCH complete, total time', (e as any).totalSearchTime])
    }
  }
  const query = astq.compile(" // Identifier [ @name =~ 'I' && @type =~ 'number' && @modifiers =~ 'protected' && type()!='']  ", e => {
    if (e.event === 'finishCompile') {
      b.push(['finished compilation in ', printMs(e.totalCompileTime!)])
    }
  })
  const node = getFile(code2)
  const result = astq.execute(node, query, {}, trace)

getASTNodeDescendants(node).forEach(d => {

    const p = getNodeProperty<StepTraceEvent & { t: number }>(d, 'traceTest1Events')
    if (!p) { return }
    b.push([indent(p.queryNodeDepth, 4), printMs(p.t), printNode(d), 'query: ', p.queryNode.type(), 'depth: ' + p.queryNodeDepth, 'childs: ', p.queryNode.childs().map(c => c.type()).join(', '), 'attrs: ' + Object.keys(p.queryNode.attrs()).map(k => `${k}=${p.queryNode.get(k)}`).join(', ')])
  })
  t.truthy(result.length > 10 || true)

  t.deepEqual(events
    .map(d => d.node)
    .filter(e =>
      notFalsy(e) && !isSourceFile(e))
    .map(e => printNode(e, true, false))
    .filter(notSameNotFalsy)
    ,
    [
      'Identifier A',
      'Identifier I1',
      'Identifier J',
      'Identifier B',
      'Identifier C',
      'Identifier T',
      'Identifier I2',
      'Identifier I3',
      'Identifier D',
      'Identifier I',
    ]
  )
})

test('query.ast.serialize() && query.dump()', async t => {
  const astq = getTypeScriptAstq()
  const query = astq.compile("//Identifier", true)
  t.is(query.ast.serialize(), `{"ASTy":{"T":"Query","L":{"L":1,"C":1,"O":0},"C":[{"T":"Path","L":{"L":1,"C":1,"O":0},"C":[{"T":"Step","L":{"L":1,"C":1,"O":0},"C":[{"T":"Axis","L":{"L":1,"C":1,"O":0},"A":{"op":"//","type":"*"}},{"T":"Match","L":{"L":1,"C":3,"O":2},"A":{"id":"Identifier"}}]}]}]}}`)
  t.is(removeWhites(query.dump()), removeWhites(`
Query [1,1]
    └── Path [1,1]
        └── Step [1,1]
            ├── Axis (op: "//", type: "*") [1,1]
            └── Match (id: "Identifier") [1,3]`.trim()))
})


test.cb('queryAst should let us register a trace event listener', t => {
  class Tracer {
    private events: StepTraceEvent<ASTNode>[] = []
    private onFinish?: (events: StepTraceEvent<ASTNode>[]) => void
    constructor(options: { onFinish: (events: StepTraceEvent<ASTNode>[]) => void }) {
      this.onFinish = options.onFinish && options.onFinish.bind(this)
      this.trace = this.trace.bind(this)
    }
    trace(e: StepTraceEvent<ASTNode>) {
      this.events.push(e)
      if (e.event === 'finishSearch') {
        this.onFinish && this.onFinish(this.events)
      }
    }
  }
  const tracer = new Tracer({
    onFinish: events => {
      const finishSearch = events.find(e => e.event === 'finishSearch')!
      t.truthy(finishSearch!.totalSearchTime! > 0)
      const finishCompile = events.find(e => e.event === 'finishCompile')!
      t.truthy(typeof finishCompile!.totalCompileTime === 'number')
      t.notThrows(() => JSON.parse((finishCompile!.queryAst! as any)))
      events.filter(e => e.event === 'endStep').forEach(e => {
        t.truthy(isGeneralNode(e.node))
        t.truthy(e.timestamp >= 0)
      })
      t.end()
    }
  })
  // I need a query that takes more than 1ms for this test
  const { error, result, query } = queryAst(`// *  [isFunctionLike() == true && ( // VariableDeclaration || // ClassDeclaration ||// Parameter [@name=='id'] ) ]`, code3, tracer)
  t.falsy(error)
  t.deepEqual(result!.map(getGeneralNodeKindName), ['Constructor', 'MethodDeclaration', 'FunctionDeclaration', 'MethodDeclaration'])
})

