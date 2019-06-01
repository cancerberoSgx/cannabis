export * from 'astq'
export { ts } from 'ts-morph'
export {  ASTNode, getASTNodeChildren, getASTNodeFilePath, getASTNodeKindName, getASTNodeName, getASTNodeParent, getASTNodePath, getASTNodeText, isASTNode } from './astNode'
export { getConfig, setConfig } from './config'
export {   loadProject, setProject } from './file'
export {Kind} from './nodeKinds'
export { queryAll, queryAllOrThrow, queryAst, queryOne, queryOneOrThrow, QueryResult } from './queryAst'
export { tsMorph }
import * as tsMorph from 'ts-morph'