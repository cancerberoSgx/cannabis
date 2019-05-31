const config = {
  includeFilesInNodeModules: false
}

interface Config {
  includeFilesInNodeModules: boolean
}

export function getConfig(p:keyof Config){
  return config[p]
}

export function setConfig(p:keyof Config, v: Config[typeof p]){
  config[p] = v
}