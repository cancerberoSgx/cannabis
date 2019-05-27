import { ASTNode } from '../../dist/src';
import { isNode, isSourceFile } from 'ts-simple-ast-extra';
import { isDirectory } from 'ts-simple-ast-extra';
import { shorter } from 'misc-utils-of-mine-generic';

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