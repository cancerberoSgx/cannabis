import test from 'ava'
import { loadProject, setConfig } from '../src'
import { getASTNodeDescendants, getASTNodeIndexPath, getASTNodeKindPath, getASTNodeName, getASTNodePath } from "../src/astNode"

const p = loadProject('test/assets/project1/tsconfig.json')
const root = p.getRootDirectory()
const i = getASTNodeDescendants(root).find(d => getASTNodeName(d) === 'LoginService')!

test('getASTNodePath(n)', t => {
  t.deepEqual(getASTNodePath(i), 'src/services/login/loginService/InterfaceDeclaration:nth-child(2)/Identifier:nth-child(1)')
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
