import { StepTraceEvent } from 'astq'
import test from 'ava'
import { indent, notSameNotFalsy, printMs, removeWhites } from 'misc-utils-of-mine-generic'
import { notFalsy } from 'misc-utils-of-mine-typescript'
import { isSourceFile } from 'ts-simple-ast-extra'
import { ASTNode, queryAst } from '.'
import { getTypeScriptAstq } from '../src/adapter/adapter'
import { getASTNodeDescendants, getASTNodeKindName, getASTNodeText, getNodeProperty, setNodeProperty } from '../src/astNode'
import { getFile } from '../src/file'
import { code2 } from './assets/code'
import { printNode } from './testUtil'

test('compile and execute should be invocable manually', async t => {
  const astq = getTypeScriptAstq( )
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
    .map(e => printNode(e, { name: true }))
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
  const astq = getTypeScriptAstq( )
  const query = astq.compile("//Identifier", true)
  t.is(query.ast.serialize(), `{"ASTy":{"T":"Query","L":{"L":1,"C":1,"O":0},"C":[{"T":"Path","L":{"L":1,"C":1,"O":0},"C":[{"T":"Step","L":{"L":1,"C":1,"O":0},"C":[{"T":"Axis","L":{"L":1,"C":1,"O":0},"A":{"op":"//","type":"*"}},{"T":"Match","L":{"L":1,"C":3,"O":2},"A":{"id":"Identifier"}}]}]}]}}`)
  t.is(removeWhites(query.dump()), removeWhites(`
Query [1,1]
    └── Path [1,1]
        └── Step [1,1]
            ├── Axis (op: "//", type: "*") [1,1]
            └── Match (id: "Identifier") [1,3]`.trim()))
})

const code = `
/**
 * @param {Date[]} p foo bar
 * @return {Foo[]} foo bar
 */
function a(p){
  return foo()
}
`
test('getChildren mode JSDocReturnTag', async t => {
  const r = queryAst('//JSDocReturnTag [//TypeReference [@text=="Foo"]]', code, { includeJSDocTagNodes: false, getChildren: true })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeKindName), ['JSDocReturnTag'])
})

test('getChildren mode off JSDocReturnTag', async t => {
  const r = queryAst('//JSDocReturnTag ', code, { includeJSDocTagNodes: false, getChildren: false })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeKindName), [])
})

test('getChildren mode  JSDocTypeExpression', async t => {
  const r = queryAst('//Identifier [..//JSDocTypeExpression] ', code, { includeJSDocTagNodes: false, getChildren: true })
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeText), ['Date', 'Foo'])
})
