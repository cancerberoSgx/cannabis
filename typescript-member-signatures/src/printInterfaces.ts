import { fail } from 'assert'
import { getASTNodeNamePath, queryAst } from 'cannabis'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { InterfaceDeclaration } from 'ts-morph'
import { getProject } from './getProject'
import { Options } from './types'

interface Result {
  name: string, path: string
}

export function listInterfaces(o: Options): Result[] {
  const root = getProject(o)
  const query = `//InterfaceDeclaration ${o.target ? `[matchEvery(@namePath, '${o.target}')]` : ''}`
  o.debug && console.log('Executing Query : ' + query)
  const r = queryAst(query, root)
  if (r.error) {
    fail(r.error)
  }
  return (r.result! as InterfaceDeclaration[]).filter(notUndefined).map(i => ({
    name: i.getName(),
    path: getASTNodeNamePath(i)
  }))
}
