import { ASTNode } from 'cannabis'
import { shorter } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { getQueryEditorText, setQueryEditorText } from '../../editor/query/queryEditor'
import { getCodeEditorText, setCodeEditorText } from '../../editor/ts/codeEditor'
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

export function createUrl() {
  const s = {
    query: getQueryEditorText(),
    code: getCodeEditorText(),
    // selectedExample : getStore().getState().selectedExample
  }
  const b = btoa(JSON.stringify(s))// Buffer.from(new TextEncoder().encode(JSON.stringify(s))).toString('base64')
  window.location.hash = '#state=' + b
}

export function loadUrl() {
  if (window.location.hash.includes('state=')) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
    // getStore().setState({
    //   selectedExample: {...getStore().getState().selectedExample, query:state.query}
    // })
    setCodeEditorText(state.code)
    setQueryEditorText(state.query)
  }
}
