import test from 'ava'
import { getName, tsMorph } from 'ts-simple-ast-extra'
import { queryAst } from '../src'
import { getGeneralNodeKindName } from '../src/util'
import { code1, code2 } from './assets'

test('should be able to query at a project level, selecting directories and sourceFiles as if were nodes', t => {
  const p = new tsMorph.Project()
  const src = p.createDirectory('src')
  const f1 = src.createSourceFile('code1.ts', code1)
  const srcCode2 = src.createDirectory('code2')
  const f2 = srcCode2.createSourceFile('code2.ts', code2)
  const f3 = src.createDirectory('foo').createSourceFile('foo.ts', 'export const f = 1')

  let r = queryAst('//InterfaceDeclaration', src)

  t.falsy(r.error)
  t.deepEqual(r.result && r.result.map(r => r.getKindName()), ['InterfaceDeclaration', 'InterfaceDeclaration',
    'InterfaceDeclaration', 'InterfaceDeclaration', 'InterfaceDeclaration'])

  t.deepEqual(r.result && r.result.map(getName), ['I', 'I1',
    'I2', 'J', 'I3'])

  t.deepEqual(queryAst<tsMorph.SourceFile>(`//SourceFile`, src).result!.map(r => r.getBaseName()), [`code2.ts`, `foo.ts`, `code1.ts`])

  t.deepEqual(queryAst<tsMorph.Directory>(`//Directory`, src).result!.map(r => r.getBaseName()), [`code2`, `foo`])

  t.deepEqual(queryAst<tsMorph.Directory>(`//Directory [@name=='foo']`, src).result!.map(r => r.getBaseName()), ['foo'])

  let r2 = queryAst<tsMorph.SourceFile>(`//SourceFile [../Directory [@name=='code2']]`, src)
  t.falsy(r2.error)
  t.deepEqual(r2.result!.map(r => r.getBaseName()), ['code2.ts'])

  // and I can use the result source file as a query source
  t.deepEqual(queryAst(`//InterfaceDeclaration`, r2.result![0]).result!.map(getName), ['I', `I1`, 'I2', 'J', 'I3'])

  // results can have mixed dirs, files and nodes:
  t.deepEqual(queryAst(`//* [@name=~'o']`, src).result!.map(getGeneralNodeKindName), [
    'Directory', 'SourceFile', 'Directory', 'SourceFile', 'SourceFile', 'Parameter', 'PropertyAccessExpression', 'MethodDeclaration', 'MethodDeclaration', 'PropertyDeclaration', 'PropertyAccessExpression',])


})

test.todo('I can use other nodes than source file to query')
