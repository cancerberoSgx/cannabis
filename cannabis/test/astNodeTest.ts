import test from 'ava'
import { loadProject, setConfig } from '.'
import { getASTNodeAncestors, getASTNodeDescendants, getASTNodeName, getASTNodeSiblings, getASTNodeText, getASTSourceFile } from "../src/astNode"
import { getASTNodeIndexPath, getASTNodeKindPath, getASTNodeNamePath, getASTNodePath } from "../src/path"
import { queryAst } from '../src/queryAst'

const p = loadProject('test/assets/project1/tsconfig.json')
const root = p.getRootDirectory()
const i = getASTNodeDescendants(root).find(d => getASTNodeName(d) === 'LoginService')!

test('getASTNodeAncestors', t => {
  const r = queryAst(`.// Identifier [matchEvery(@namePath, '**/ui/**/onFinish/**/finishSearch')]`, root)
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeNamePath), ['src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction/Block/VariableStatement/VariableDeclarationList/finishSearch/finishSearch'])
  t.deepEqual(getASTNodeAncestors(r.result![0]).map(getASTNodeNamePath), [
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction/Block/VariableStatement/VariableDeclarationList/finishSearch',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction/Block/VariableStatement/VariableDeclarationList',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction/Block/VariableStatement',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction/Block',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish/ArrowFunction',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression/onFinish',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer/ObjectLiteralExpression',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer/Tracer',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList/tracer',
    'src/ui/components/leftPanel/VariableStatement/VariableDeclarationList',
    'src/ui/components/leftPanel/VariableStatement',
    'src/ui/components/leftPanel',
    'src/ui/components',
    'src/ui',
    'src',])
})




test('getASTNodePath(n, { onlyKindName: true })', t => {
  t.deepEqual(getASTNodePath(i, { onlyKindName: true }), 'src/services/login/loginService/InterfaceDeclaration/Identifier')
})

test('getASTNodePath(n, { onlyIndex: true })', t => {
  t.deepEqual(getASTNodePath(i, { onlyIndex: true }), 'src/services/login/loginService/2/1')
})

test('getASTNodeKindPath(n)', t => {
  t.deepEqual(getASTNodeKindPath(i), 'src/services/login/loginService/InterfaceDeclaration/Identifier')
})

test('getASTNodeIndexPath(n)', t => {
  t.deepEqual(getASTNodeIndexPath(i), 'src/services/login/loginService/2/1')
})

test('getASTNodePath(n) - mode getChildren', t => {
  setConfig('getChildren', true)
  t.deepEqual(getASTNodePath(i), 'src/services/login/loginService/InterfaceDeclaration:nth-child(2)/Identifier:nth-child(2)')
  setConfig('getChildren', false)
})

test('getASTNodeNamePath', t => {
  t.deepEqual(getASTNodeNamePath(i), 'src/services/login/loginService/LoginService/LoginService')
  const nn = getASTNodeDescendants(getASTSourceFile(i!)!).find(d => getASTNodeText(d) === 'Model')
  t.deepEqual(getASTNodeNamePath(nn!), 'src/services/login/loginService/ImportDeclaration/ImportClause/NamedImports/Model/Model')
})

test('getASTNodeNamePath - mode getChildren', t => {
  setConfig('getChildren', true)
  t.deepEqual(getASTNodeNamePath(i), 'src/services/login/loginService/LoginService/LoginService')
  let nn = getASTNodeDescendants(getASTSourceFile(i!)!).find(d => getASTNodeText(d) === 'Model')
  t.deepEqual(getASTNodeNamePath(nn!), 'src/services/login/loginService/ImportDeclaration/ImportClause/NamedImports/Model/Model')
  nn = getASTNodeDescendants(getASTSourceFile(i!)!).find(d => getASTNodeText(d) === 'extends')
  t.deepEqual(getASTNodeNamePath(nn!), 'src/services/login/loginService/LoginService/T/ExtendsKeyword')
  setConfig('getChildren', false)
})

test('getASTNodeSiblings', t => {
  const r = queryAst(`//VariableStatement [@text=~'a = 1']`, `var a = 1; var b = 2; var c = '9'`)
  t.falsy(r.error)
  t.deepEqual(r.result!.map(getASTNodeSiblings).flat().map(getASTNodeText), ['var b = 2;', 'var c = \'9\'',])
})

