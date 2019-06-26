import { fail } from 'assert'
import { queryAst } from 'cannabis'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { InterfaceDeclaration, MethodSignature, PropertySignature, SyntaxKind, TypeGuards } from 'ts-morph'
import { getDefinitionsOf, getExtendsRecursively } from 'ts-simple-ast-extra'
import { getProject } from './getProject'
import { Member, Options, Result } from './types'

export function extractMemberSignatures(o: Options): Result[] {
  const root = getProject(o)
  const r = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.target}')]`, root)
  if (r.error) {
    fail(r.error)
  }
  return (r.result! as InterfaceDeclaration[]).filter(notUndefined).map((i) => {
    const all = [i, ...getExtendsRecursively(i)
      .map(m => m.getFirstChildByKind(SyntaxKind.Identifier)!)]
      .map(i => TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [i])
      .flat()
      .filter(i => !!i && TypeGuards.isInterfaceDeclaration(i)) as InterfaceDeclaration[]

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
