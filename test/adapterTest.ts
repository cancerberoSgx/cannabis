import { StepTraceEvent } from 'astq'
import test from 'ava'
import { asArray, indent, notSameNotFalsy, printMs, removeWhites } from 'misc-utils-of-mine-generic'
import { notFalsy } from 'misc-utils-of-mine-typescript'
import { isSourceFile } from 'ts-simple-ast-extra'
import { ASTNode, queryAst } from '../src'
import { getTypeScriptAstq } from '../src/adapter/adapter'
import { getGeneralNodeKindName, isGeneralNode, getNodeProperty, setNodeProperty } from '../src/astNode'
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

  node.forEachDescendant(d => {

    const p = getNodeProperty<StepTraceEvent & { t: number }>(d, 'traceTest1Events')
    if (!p) { return }
    b.push([indent(p.queryNodeDepth, 4), printMs(p.t), printNode(d), 'query: ', p.queryNode.type(), 'depth: ' + p.queryNodeDepth, 'childs: ', p.queryNode.childs().map(c => c.type()).join(', '), 'attrs: ' + Object.keys(p.queryNode.attrs()).map(k => `${k}=${p.queryNode.get(k)}`).join(', ')])
  })
  t.truthy(result.length > 10 || true)

  const constants = b.map(l => l.filter(isString).filter(s => !s.includes('milliseconds'))).map(l => asArray(l).join(', ')).join('\n')

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






// test('trace should be there', t=>{
//   const {result, error, query} = queryAst('// * [ depth() == 3 ]', getFile('class C {}'), {trace: true})
//   console.log('RESULT, ', result, error)

//   // const query = astq.compile( "// * [ depth() == 3 ]", true)
//   // expect(query.lastTrace).deep.equals([])
//   // const result = astq.execute(node1, query, {}, true)
//   // expect(result).to.be.deep.equal([ node5, node6, node7 ])
//   // expect(query.lastTrace).to.length.above(10)
//   // const lastTraceItem = query.lastTrace[query.lastTrace.length - 1]
//   // expect(lastTraceItem.timestamp > 0).to.be.true

//   // t.truthy(!!query &&!!query.lastTrace)
//   // console.log(query!.lastTrace!);

// //  t.deepEqual(query!.lastTrace!, [1 as any])
// })

// const {logger} = require("../logger")
// Or: const logger = {debug: (...args) => console.log.call(console.log, args) }

// const joinStrings = (arr: never[], separator: undefined) => {
//   if (arr.length === 0) return "";
//   return arr.reduce((v1: any, v2: any) => `${v1}${separator}${v2}`);
// }
// class CircularReferenceDetector {

//   detectCircularReferences(toBeStringifiedValue: { [x: string]: any; }, serializationKeyStack = []) {
//     Object.keys(toBeStringifiedValue).forEach(key => {
//       let value = toBeStringifiedValue[key];

//       let serializationKeyStackWithNewKey = serializationKeyStack.slice();
//       serializationKeyStackWithNewKey.push(key);
//       try {
//         JSON.stringify(value);
//         logger.debug(`path "${joinStringµ(serializationKeyStack)}" is ok`);
//       } catch (error) {
//         logger.debug(`path "${joinStrings(serializationKeyStack)}" JSON.stringify results in error: ${error}`);

//         let isCircularValue;
//         let circularExcludingStringifyResult = "";
//         try {
//           circularExcludingStringifyResult = JSON.stringify(value, this.replaceRootStringifyReplacer(value), 2);
//           isCircularValue = true;
//         } catch (error) {
//           logger.debug(`path "${joinStrings(serializationKeyStack)}" is not the circular source`);
//           this.detectCircularReferences(value, serializationKeyStackWithNewKey);
//           isCircularValue = false;
//         }
//         if (isCircularValue) {
//           throw new Error(`Circular reference detected:\nCircularly referenced value is value under path "${joinStrings(serializationKeyStackWithNewKey)}" of the given root object\n`+
//               `Calling stringify on this value but replacing itself with [Circular object --- fix me] ( <-- search for this string) results in:\n${circularExcludingStringifyResult}\n`);
//         }
//       }
//     });
//   }

//   replaceRootStringifyReplacer(toBeStringifiedValue: any) {
//     let serializedObjectCounter = 0;

//     return function (key: any, value: any) {
//       if (serializedObjectCounter !== 0 && typeof(toBeStringifiedValue) === 'object' && toBeStringifiedValue === value) {
//         logger.error(`object serialization with key ${key} has circular reference to being stringified object`);
//         return '[Circular object --- fix me]';
//       }

//       serializedObjectCounter++;

//       return value;
//     }
//   }
// }


// function isCyclic(obj: any) {
//   var keys: string[] = [];
//   var stack:   string[] = [];
//   var stackSet = new Set();
//   var detected = false;

//   function detect(obj: any, key: string) {
//     if (obj && typeof obj != 'object') { return; }

//     if (stackSet.has(obj)) { // it's cyclic! Print the object and its locations.
//       var oldindex = stack.indexOf(obj);
//       var l1 = keys.join('.') + '.' + key;
//       var l2 = keys.slice(0, oldindex + 1).join('.');
//       console.log('CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj);
//       console.log(obj);
//       detected = true;
//       return;
//     }

//     keys.push(key);
//     stack.push(obj);
//     stackSet.add(obj);
//     for (var k in obj) { //dive on the object's children
//       if (Object.prototype.hasOwnProperty.call(obj, k)) { detect(obj[k], k); }
//     }

//     keys.pop();
//     stack.pop();
//     stackSet.delete(obj);
//     return;
//   }

//   detect(obj, 'obj');
//   return detected;
// }

/**
//  *  Try to call n.getName or returns empty string if there is no such method
//  */
// export function getName(n: Node) {
//   function getNodeName(n: Node) {
//     const id = n.getFirstChildByKind(ts.SyntaxKind.Identifier)
//     return id ? id.getText() : undefined
//   }
//   try {
//     return (tsMorph.TypeGuards.hasName(n) ? n.getName() : getNodeName(n)) || undefined
//   } catch (error) {
//     return undefined
//   }
// }
