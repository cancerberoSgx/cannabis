import { unique } from 'misc-utils-of-mine-generic';

const config = {
  includeFilesInNodeModules: false,
  getChildren: false,
  includeJSDocTagNodes: false,
  visitChildrenFirst: true,
  cacheNodePaths: false,
  cacheTypeText: false,
  cacheExtended: false,
  cacheImplemented: false,
  cacheReferences: false,
}

interface Config {
  includeFilesInNodeModules: boolean
  getChildren: boolean
  /**
   * if getChildren==false (default), then JSDoc kind of nodes won't be availabel in the AST, setting this to true will enable then and only them , the rest remains the same (getChildren mode is still off)
   */
  includeJSDocTagNodes: boolean
  /**
   * Changes the node visiting implementation, just to compare between the two: if false it will visit first
   * current node's siblings and then its children. If true will visit first node's children even before self,
   * and then its siblings. Direction supported only left to right and top to bottom. - would be interesting
   * also to test that..
   */
  visitChildrenFirst: boolean
  cacheNodePaths: boolean
  cacheTypeText: boolean
  cacheExtended: boolean
  cachedImplemented: boolean
  cacheReferences: boolean
}

export function getConfig(p: C) {
  return config[p]
}
type C = keyof Config
export function setConfig(p: C|Partial<Config>, v?: Config[C]) {
  if(typeof p === 'object'){
    Object.assign(config, p)
  }
  else if(typeof v !== 'undefined'){
    config[p] = v
  }
}

export function saveConfig(name='default'){
saved[name] = {...config}
}

export function restoreConfig(name='default'){
Object.assign(config, saved[name]||{})
}
const saved:any = {}

export function withConfig<T=any>(c: Partial<Config>, f: ()=>T):T{
  const id = unique('config')
  saveConfig(id)
  setConfig(c)
  const r = f()
  restoreConfig(id)
  return r
}