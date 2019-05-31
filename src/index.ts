export * from 'astq'
export { ts } from 'ts-morph'
export { ASTDirectory, ASTFile, ASTNode, getASTNodeChildren, getASTNodeKindName, getASTNodeName, getASTNodeText, getASTNodeFilePath, isASTNode, getASTNodePath, getASTNodeParent } from './astNode'
export { createDirectory, createSourceFile, loadProject, setProject } from './file'
export { queryAll, queryAllOrThrow, queryAst, queryOne, queryOneOrThrow, QueryResult } from './queryAst'
export { tsMorph }
import * as tsMorph from 'ts-morph'
export { getConfig, setConfig } from './config'
