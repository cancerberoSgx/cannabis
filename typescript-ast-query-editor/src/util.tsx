import { Emitter, shorter } from 'misc-utils-of-mine-generic'
import { isDirectory, isNode, isSourceFile } from 'ts-simple-ast-extra'
import { ASTNode } from '../../dist/src'

export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isDesktop() {
  return width() >= 1023
}

export function getAscendants(n: ASTNode, andSelf = false) {
  if (isNode(n)) {
    return [n, ...n.getAncestors()]
  }
  else {
    return []
  }
}
export function printNode(n: ASTNode) {
  if (isSourceFile(n) || isDirectory(n)) {
    return `${n.getBaseName()} (file)`
  }
  else {
    return `${n.getKindName()} (${shorter(n.getText())})`
  }
}

export class StatefulEmitter<T> extends Emitter<T>{
  constructor(public value: T) {
    super()
  }
}
