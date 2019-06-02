const config = {
  includeFilesInNodeModules: false,
  getChildren: false,
  includeJSDocTagNodes: false,
  visitChildrenFirst: false,
  cacheNodePaths: false
}

interface Config {
  includeFilesInNodeModules: boolean
  getChildren: boolean
  includeJSDocTagNodes: boolean
  /**
   * Changes the node visiting implementation, just to compare between the two: if false it will visit first
   * current node's siblings and then its children. If true will visit first node's children even before self,
   * and then its siblings. Direction supported only left to right and top to bottom. - would be interesting
   * also to test that..
   */
  visitChildrenFirst: boolean
  cacheNodePaths: boolean
}

export function getConfig(p: keyof Config) {
  return config[p]
}

export function setConfig(p: keyof Config, v: Config[typeof p]) {
  config[p] = v
}
