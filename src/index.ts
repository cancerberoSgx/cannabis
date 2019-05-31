export * from 'astq'
export { ts } from 'ts-morph'
export { ASTDirectory, ASTFile, ASTNode, getASTNodeChildren, getASTNodeFilePath, getASTNodeKindName, getASTNodeName, getASTNodeParent, getASTNodePath, getASTNodeText, isASTNode } from './astNode'
export { getConfig, setConfig } from './config'
export { createDirectory, createSourceFile, loadProject, setProject } from './file'
export { queryAll, queryAllOrThrow, queryAst, queryOne, queryOneOrThrow, QueryResult } from './queryAst'
export { tsMorph }
import * as tsMorph from 'ts-morph'
