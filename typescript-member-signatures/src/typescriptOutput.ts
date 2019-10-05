import { Project } from 'ts-morph'
import { Result } from './types'

interface Options {
  result: Result
  exportName?: string
}

function firstLetterToUpperCase(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}
function firstLetterToLowerCase(s: string) {
  return s.substring(0, 1).toLowerCase() + s.substring(1)
}

export function resultToTypeScript(o: Options) {
  const name = o.exportName || o.result.name
  // TODO: Member is copy&paste
  // TODO: support methods and other data ? 
  // TODO: don't use JSON.stringify produce ugly output 
  const r = `
export interface ${firstLetterToUpperCase(name)}Member {
  signature: string
  name?: string
  typeText?: string
  optional?: boolean
  jsDocsText?: string
  markdown?: string
}

export interface ${firstLetterToUpperCase(name)} {
  name: string,
  properties: ${firstLetterToUpperCase(name)}Member[]
}

export const ${firstLetterToLowerCase(name)}: ${firstLetterToUpperCase(name)} = {
  name: '${name}',
  properties: ${JSON.stringify(o.result.properties || [], null, 2)}
}
  `
  const p = new Project()
  const f = p.createSourceFile('test.ts', r)
  f.formatText()
  return f.getText()
}
