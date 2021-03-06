import test from 'ava'
import { notSameNotFalsy } from 'misc-utils-of-mine-generic'
import { Project } from 'ts-morph'
import { queryAst, queryOne, setProject } from '../'
import { getASTNodeText } from '../../src'
import { getASTNodeIndexPath, getASTNodeKindPath, getASTNodeNamePath } from "../../src/node/path"
import { withConfig } from '../../src/query/config'

test('@indexPath', t => {
  const p = new Project()
  const f = p.createSourceFile('banana.ts', `import 'ss'; interface {i:number,m(m:{f:Array<Foo<XXX>>}):void}`)
  setProject(p)
  const e = queryOne(`//Identifier [@indexPath=='banana/2/0/1/0/2/2/0/1/1/1/0']`, f)
  t.deepEqual(getASTNodeIndexPath(e!), 'banana/2/0/1/0/2/2/0/1/1/1/0')
})

test('@kindPath', t => {
  const p = new Project()
  const f = p.createSourceFile('banana.ts', `import 'ss'; interface {i:number,m(m:{f:Array<Foo<XXX>>}):void}`)
  setProject(p)
  const path = 'banana/Block/LabeledStatement/ExpressionStatement/BinaryExpression/CallExpression/ObjectLiteralExpression/PropertyAssignment/CallExpression/TypeReference/TypeReference/Identifier'
  const e = queryOne(`//Identifier [@kindPath=='${path}']`, f)
  t.deepEqual(getASTNodeKindPath(e!), path)
})

test('@namePath and matchEvery', t => {
  const p = new Project()
  const f = p.createSourceFile('banana.ts', `import 'ss'; interface Name12 {i:number,m(m:{f:Array<Foo<XXX>>}):void}`)
  setProject(p)
  const result = queryAst(`//* [ ( type()=='MethodSignature' || type()=='PropertySignature' ) && matchEvery(@namePath, 'banana/**/Name12/*')]`, f)
  t.falsy(result.error)
  t.deepEqual(result.result!.map(getASTNodeNamePath).filter(notSameNotFalsy), ['banana/Name12/i', 'banana/Name12/m'])
})

test('paths with and without cache', t => {
  let e = withConfig({ cacheNodePaths: false }, () => queryAst(`//Identifier [@kindPath=~'InterfaceDeclaration' && @kindPath=~'PropertySignature']`, `import 'ss'; interface I {i:number,m(m:{f:Array<Foo<XXX>>}):void}`))
  t.falsy(e.error)
  t.deepEqual(e.result!.map(getASTNodeText), ['i', 'f', 'Array', 'Foo', 'XXX',])
  e = withConfig({ cacheNodePaths: true }, () => queryAst(`//Identifier [@kindPath=~'InterfaceDeclaration' && @kindPath=~'PropertySignature']`, `import 'ss'; interface I {i:number,m(m:{f:Array<Foo<XXX>>}):void}`))
  t.falsy(e.error)
  t.deepEqual(e.result!.map(getASTNodeText), ['i', 'f', 'Array', 'Foo', 'XXX',])
})

