import { isString } from 'misc-utils-of-mine-generic'
import { isNode } from 'ts-simple-ast-extra'
import { isArray } from 'util'
import { ASTNode, isASTNode } from '../node/astNode'
import { getASTNodeNamePath } from '../node/path'
const stringify = require('string.ify')

export function print(a: any): string {
  // return !a ? 'undefined' : isArray(a) ? a.map(print).join(', ') : isASTNode(a) ? getASTNodeNamePath(a) : tsMorph.TypeGuards.isTypeNode(a) ? (tryTo(() => a.getText()) || 'TypeNode') : stringify(a)
  return isASTNode(a) ? getASTNodeNamePath(a) : isArray(a) ? a.map(print).join(', ') : stringify(a)
}

export function splitString(s: string | string[], splitChar = ',') {
  return isArray(s) ? s : isString(s) ? s.split(splitChar) : []
}

export function getSourceFile(n: ASTNode) {
  return isNode(n) ? n.getSourceFile() : null
}

export function now() {
  return Date.now()
}

export function propertyValue(n: any, name: string | undefined): any {
  return typeof n[name!] === 'function' ? n[name!]() : n[name!]
}

