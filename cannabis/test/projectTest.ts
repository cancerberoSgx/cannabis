import test from 'ava'
import { Project } from 'ts-morph'
import { getName, tsMorph } from 'ts-simple-ast-extra'
import { loadProject, queryAll, queryAst, queryOne, setProject } from '.'
import { getASTNodeNamePath } from '../src'
import { getASTNodeDescendants, getASTNodeFilePath, getASTNodeName } from "../src/node/astNode"
import { withConfig } from '../src/query/config'
import { code1, code2 } from './assets/code'
const p = new tsMorph.Project()
const src = p.createDirectory('src')
src.createSourceFile('code1.ts', code1)
const srcCode2 = src.createDirectory('code2')
srcCode2.createSourceFile('code2.ts', code2)
src.createDirectory('foo').createSourceFile('foo.ts', 'export const f = 1')

test('calling operations on node of non registered projects setProject or load project will throw', t => {
  withConfig({ verifyProjectRegistered: true }, () => {
    t.throws(() => queryAst('//* [namePath()=~"code"]', src))
    // we need to call setProject with our project to prevent these errors.
  })
})

test('we need to call setProject with our project to prevent these errors.', t => {
  withConfig({ verifyProjectRegistered: true }, () => {
    setProject(p)
    const r3 = queryAst('//* [namePath()=~"on/push/n/ThisKeyword"]', src)
    t.falsy(r3.error)
    t.deepEqual(r3.result!.map(getASTNodeNamePath), ['code1/A/method1/Block/ForInStatement/ExpressionStatement/CallExpression/push/n/ThisKeyword'])
  })
})

test('should be able to query at a project level, selecting directories and sourceFiles as if were nodes', t => {
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

})

test('loadProject', t => {
  const p = loadProject('test/assets/project1/tsconfig.json')
  const root = p.getRootDirectory()
  t.is(queryOne<tsMorph.Directory>(`.//Directory [@name=='src']`, root)!.getBaseName(), 'src')
  t.deepEqual(queryAll<tsMorph.SourceFile>(`.//SourceFile [@name=~'.tsx']`, root)!.map(f => f.getBaseName()), ['app.tsx', 'forkRibbon.tsx', 'leftPanel.tsx', 'component.tsx'])
})

test('source files should not be in node modules', t => {
  const p = loadProject('test/assets/project1/tsconfig.json')
  const root = p.getRootDirectory()
  t.deepEqual(queryAll<tsMorph.SourceFile>(`.// SourceFile `, root)!.map(getASTNodeFilePath).filter(p => p.includes('node_modules')), [])
  p.getRootDirectories().forEach(d => {
    t.falsy(getASTNodeFilePath(d).includes('node_modules'))
    t.deepEqual(getASTNodeDescendants(d).map(getASTNodeFilePath).filter(p => p.includes('node_modules')).concat(getASTNodeFilePath(d)), [getASTNodeFilePath(d)])
  })
})

test('setProject', t => {
  const project = new Project({ tsConfigFilePath: 'test/assets/project1/tsconfig.json', addFilesFromTsConfig: true })
  // HEADS UP: in order to be a node child the file must be associated with a directory - 
  // if we use project.createSourceFile() it wont and so it won't be present in the AST:
  project.getRootDirectories()[0].createSourceFile('src/foo12312322.ts', 'var a')
  const p = setProject(project)
  const root = p.getRootDirectory()
  t.deepEqual(p.getSourceFiles().map(getASTNodeName).filter(r => r!.includes('foo12312322.ts')), ['foo12312322.ts'])
  t.is(queryOne<tsMorph.Directory>(`.//Directory [@name=='src']`, root)!.getBaseName(), 'src')
  t.deepEqual(queryAll<tsMorph.SourceFile>(`.//SourceFile [@name=~'.tsx']`, root)!.map(f => f.getBaseName()), ['app.tsx', 'forkRibbon.tsx', 'leftPanel.tsx', 'component.tsx'])
  t.is(queryOne<tsMorph.SourceFile>(`//SourceFile [@name=~'foo12312322']`, root)!.getBaseName(), 'foo12312322.ts')
})

test('parsing non registered projects nodes should throw', t => {
  withConfig({ verifyProjectRegistered: true }, () => {

    const project = new Project()
    const f = project.createSourceFile('asd.ts', '')
    t.throws(() => queryOne(`//SourceFile [@name=~'foo12312322']`, f))
  })
})

