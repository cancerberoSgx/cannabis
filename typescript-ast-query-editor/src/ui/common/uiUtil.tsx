import { ASTNode } from 'cannabis'
import { shorter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { isDirectory, isNode, isSourceFile } from '../../editor/ts/tsUtil'

export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isDesktop() {
  return width() >= 1023
}

export const Space = () => (
  <span style={{ marginRight: '0.5em' }}></span>
)

export function printNode(n: ASTNode) {
  if (isSourceFile(n) || isDirectory(n)) {
    return `${n.getBaseName()} (file)`
  }
  else {
    return `${n.getKindName()} (${shorter(n.getText())})`
  }
}

/**
 * this is just for the UI!, not meant to be API
 */
export function getASTNodeAncestors(n: ASTNode, andSelf = false) {
  if (isNode(n)) {
    return [...andSelf ? [n] : [], ...n.getAncestors()]
  }
  else {
    return []
  }
}

export function iconForNodeKind(kind = '') {
  kind = kind.toLowerCase()
  if (['method', 'member', 'property', 'constructor'].find(s => kind.includes(s))) {
    return 'cube'
  }
  if (['type', 'interface', 'alias'].find(s => kind.includes(s))) {
    return 'cog'
  }
  if (['import', 'export'].find(s => kind.includes(s))) {
    return 'map'
  }
  if (kind.includes('jsx')) {
    return 'code'
  }
  if (kind.includes('declaration')) {
    return 'puzzle piece'
  }
  else {
    return 'leaf'
  }
}
