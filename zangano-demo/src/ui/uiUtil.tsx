import { shorter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { tsMorph } from 'zangano'
import { isDirectory, isSourceFile } from '../editor/tsUtil'

export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isDesktop() {
  return width() >= 1023
}


export function printNode(n: tsMorph.Node) {
  if (isSourceFile(n) || isDirectory(n)) {
    return `${n.getBaseName()} (file)`
  }
  else {
    return `${n.getKindName()} (${shorter(n.getText())})`
  }
}
export const Space = () => (
  <span style={{ marginRight: '0.5em' }}></span>
)


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
