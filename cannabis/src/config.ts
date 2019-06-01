const config = {
  includeFilesInNodeModules: false,
  getChildren: false,
  includeJSDocTagNodes: false,
}

interface Config {
  includeFilesInNodeModules: boolean
  getChildren: boolean
  includeJSDocTagNodes: boolean
}

export function getConfig(p: keyof Config) {
  return config[p]
}

export function setConfig(p: keyof Config, v: Config[typeof p]) {
  config[p] = v
}
