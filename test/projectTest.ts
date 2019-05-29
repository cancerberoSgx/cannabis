import test from 'ava'
import { getName, tsMorph } from 'ts-simple-ast-extra'
import { loadProject, queryAll, queryAst, queryOne } from '../src'
import { ASTDirectory, ASTFile } from "../src/astNode"
import { code1, code2 } from './assets/code'

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
  // t.deepEqual(JSON.stringify(queryAst(`//* [@name=~'o' && type()!='Identifier]`, src).result!.map(printNode).sort()), `["Directory code2 (\\"/Users/seb...\\")","Directory foo (\\"/Users/seb...\\")","ForInStatement o (\\"for(let i ...\\")","ForInStatement o (\\"for(let i ...\\")","MethodDeclaration method1 (\\"private me...\\")","MethodDeclaration method2 (\\"protected ...\\")","Parameter o (\\"o: any...\\")","PropertyAccessExpression log (\\"console.lo...\\")","PropertyAccessExpression log (\\"console.lo...\\")","PropertyDeclaration foo (\\"foo=f=>{\\n ...\\")","SourceFile code1.ts (\\"export fun...\\")","SourceFile code2.ts (\\"class A im...\\")","SourceFile foo.ts (\\"export con...\\")"]`
  // )
})


test('loadProject', t => {
  const p = loadProject('test/assets/project1/tsconfig.json')
  const root = p.getRootDirectory()
  t.is(queryOne<ASTDirectory>(`.//Directory [@name=='src']`, root)!.getBaseName(), 'src')
  t.deepEqual(queryAll<ASTFile>(`.//SourceFile [@name=~'.tsx']`, root)!.map(f => f.getBaseName()), ['app.tsx', 'forkRibbon.tsx', 'leftPanel.tsx'])
})


test.skip('loadProject real life', t => {
  const p = loadProject('test/assets/project1/tsconfig.json')
  const root = p.getRootDirectory()
  t.is(queryOne<ASTDirectory>(`.//SourceFile [@name=='src']`, root)!.getBaseName(), 'src')

  // files matching src/**/*Test.ts* that does't contain a class implementing (recursively) an interface called Gestured  
  // TODO: same but: "an interface declared in directory src/gestures/*"
  t.deepEqual(queryAll<ASTFile>(`.//SourceFile [@name=~'.tsx']`, root)!.map(f => f.getBaseName()), ['app.tsx', 'forkRibbon.tsx', 'leftPanel.tsx'])
})
