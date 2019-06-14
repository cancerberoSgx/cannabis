import { fail } from 'assert'
import { queryAst, setProject } from 'cannabis'
import { readFileSync } from 'fs'
import { sync } from 'glob'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { Directory, InterfaceDeclaration, MethodSignature, Project, PropertySignature, SyntaxKind, TypeGuards } from 'ts-morph'
import { getDefinitionsOf, getExtendsRecursively } from 'ts-simple-ast-extra'
import { Member, Options, Result } from './types'

export function extractMemberSignatures(o: Options): Result[] {
  let p: Project
  if (o.project) {
    p = new Project({ tsConfigFilePath: o.project, addFilesFromTsConfig: true })
  }
  else {
    p = new Project()
    p.createDirectory('src')
  }
  const root = setProject(p).getRootDirectory() as Directory
  if (o.files) {
    sync(o.files).forEach(f => {
      root.createSourceFile(basename(f), readFileSync(f).toString())
    })
  }
  const r = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.target}')]`, root)
  if (r.error) {
    fail(r.error)
  }
  return (r.result! as InterfaceDeclaration[]).filter(notUndefined).map((i) => {
    const all = [i, ...getExtendsRecursively(i)
      .map(m => m.getFirstChildByKind(SyntaxKind.Identifier)!)]
      .map(i => TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [i])
      .flat() as InterfaceDeclaration[]

    const methods = all.map(i => i.getMethods()).flat()
      .filter(f => !o.ignoreMemberWithUnderscorePrefix || !f.getName().startsWith('_'))
      .filter((o, i, a) => a.findIndex(e => e.getName() === o.getName()) === i)
      .map(m => extractDoc(m, o))

    const properties = all.map(i => i.getProperties()).flat()
      .filter(f => !o.ignoreMemberWithUnderscorePrefix || !f.getName().startsWith('_'))
      .filter((o, i, a) => a.findIndex(e => e.getName() === o.getName()) === i)
      .map(m => extractDoc(m, o))

    return o.onlySignature ? {
      name: i.getName(),
      signature: `interface ${i.getName()} {\n  ${
        properties.map(p => p.signature).join('\n  ')}\n  ${
        methods.map(p => p.signature).join('\n  ')}\n}`,
    } : {
        name: i.getName(),
        signature: `interface ${i.getName()} {\n  ${
          properties.map(p => p.signature).join('\n  ')}\n  ${
          methods.map(p => p.signature).join('\n  ')}\n}`,

        methods,
        properties,
        ...o.generateMarkdownDocs ? {
          markdown: `\`${i.getName()}\`\n\nProperties:\n * ${
            properties.map(p => p.markdown).join('\n * ')}\n\nMethods: \n * ${
            methods.map(p => p.markdown).join('\n * ')}`
        } : {}
      }
  })
}

function extractDoc(m: MethodSignature | PropertySignature, o: Options): Member {
  m.formatText()
  return o.onlySignature ? {
    signature: m.getText(),
  } : {
      name: m.getName(),
      signature: m.getText(),
      jsDocsText: m.getJsDocs().map(j => j.getInnerText()).join('\n'),
      ...o.generateMarkdownDocs ? { markdown: markdownDocs(m, o) } : {}
    }
}

function markdownDocs(m: MethodSignature | PropertySignature, o: Options) {
  return `\`${m.getText()}\`: ${m.getJsDocs().map(j => j.getInnerText()).join(' . ')}`
}
