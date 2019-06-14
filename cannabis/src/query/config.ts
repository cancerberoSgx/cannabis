import { TraceListener } from 'astq'
import { unique } from 'misc-utils-of-mine-generic'
import { ASTNode } from '../../test'

const config: Config = {
  includeFilesInNodeModules: false,
  getChildren: false,
  includeJSDocTagNodes: false,
  visitChildrenFirst: true,
  params: {},
  verifyProjectRegistered: true,
  trace: false,
  // logs: false,
  cacheNodePaths: false,
  cacheTypeText: false,
  cacheExtended: false,
  cacheImplemented: false,
  cacheReferences: false,
  cacheDerivedClasses: false,
  cacheImplementations: false,
  cacheAncestors: false,
  cacheNodeType: false
}

export interface Config {

  includeFilesInNodeModules: boolean

  /**
   * TypeScript Children node mode. Default: 'forEachChild' that return only nodes with high level semantics.
   * 'getChildren' on the other hand, will return all kind of nodes, including tokens, jsdocs comments,
   * keywords, etc. In general is better to build queries with 'forEachChild' mode, but in some cases, is
   * necessary to use 'getChildren'. Take into account that queries in one mode could not work in the other
   * mode. 
   */
  getChildren: boolean

  /**
   * if getChildren==false (default), then JSDoc kind of nodes won't be availabel in the AST, setting this to
   * true will enable then and only them , the rest remains the same (getChildren mode is still off)
   */
  includeJSDocTagNodes: boolean

  /**
   * Changes the node visiting implementation, just to compare between the two: if false it will visit first
   * current node's siblings and then its children. If true will visit first node's children even before self,
   * and then its siblings. Direction supported only left to right and top to bottom. - would be interesting
   * also to test that..
   */
  visitChildrenFirst: boolean

  /**
 * If true the query execution will be traced, step by step, probably affecting performance but useful to
 * debug and understand the internal process. Default value is false.
 */
  trace: boolean | TraceListener<ASTNode>

  /**
   * Query execution parameters to be consumable using `{param1}` syntax (similar to attributes). Default
   * value is `{}.`
   */
  params: { [name: string]: any }

  /**
   * Will be called with `debug()` function arguments.
   */
  logs?: ((...args: any) => void) | string[]

  cacheNodePaths: boolean

  cacheTypeText: boolean
  cacheNodeType: boolean
  cacheExtended: boolean

  cacheImplemented: boolean

  cacheReferences: boolean

  cacheDerivedClasses: boolean

  cacheImplementations: boolean

  cacheAncestors: boolean

  /**
   * Will throw if a non registered project's node is detected. force to use setProject or loadProject before 
   * passing nodes of external ts-morph projects.
   */
  verifyProjectRegistered: boolean
}

export function getConfig<P extends C>(p: P) {
  return config[p] as Config[P]
}

type C = keyof Config

export function setConfig<P extends C>(p: P | Partial<Config>, v?: Config[P]) {
  if (typeof p === 'object') {
    Object.assign(config, p)
  }
  else if (typeof v !== 'undefined') {
    config[p] = v
  }
}

export function saveConfig(name = 'default') {
  saved[name] = { ...config }
}

export function restoreConfig(name = 'default') {
  Object.assign(config, saved[name] || {})
}

const saved: any = {}

export function withConfig<T = any>(c: Partial<Config>, f: () => T): T {
  const id = unique('config')
  saveConfig(id)
  setConfig(c)
  const r = f()
  restoreConfig(id)
  return r
}
