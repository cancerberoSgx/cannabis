import { isString, notUndefined } from 'misc-utils-of-mine-generic'
import { ClassDeclaration, InterfaceDeclaration, SyntaxKind, TypeGuards } from 'ts-morph'
import { getDefinitionsOf, getExtendsRecursively, isNode, tsMorph } from 'ts-simple-ast-extra'
import { isArray } from 'util'
import { ASTNode, isASTNode } from '../astNode'
import { getASTNodeNamePath } from '../path'
const stringify = require('string.ify')

export function print(a: any): string {
  return isASTNode(a) ? getASTNodeNamePath(a) : isArray(a) ? a.map(print).join(', ') : stringify(a)
}

export function splitString(s: string | string[], splitChar = ',') {
  return isArray(s) ? s : isString(s) ? s.split(splitChar) : []
}

export function getSourceFile(n: ASTNode) {
  return isNode(n) ? n.getSourceFile() : null
}

