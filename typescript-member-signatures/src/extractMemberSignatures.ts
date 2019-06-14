import { Project, InterfaceDeclaration, TypeGuards, MethodSignature, SyntaxKind, PropertySignature, Directory, ClassDeclaration } from 'ts-morph';
import { setProject, queryAst } from 'cannabis';
import { ok, fail } from 'assert';
import { getExtendsRecursively, getDefinitionsOf } from 'ts-simple-ast-extra';
import {sync} from 'glob'
import {RemoveProperties, notUndefined} from 'misc-utils-of-mine-generic'
import { basename } from 'path';
import { readFileSync } from 'fs';
import { Options, Result } from './types';

export function extractMemberSignatures(o: Options): Result[] {
  let p : Project
  if(o.project){
    p= new Project({ tsConfigFilePath: o.project, addFilesFromTsConfig: true });
  }
  else{
    p = new Project()
    p.createDirectory('src')
  }
  const root = setProject(p).getRootDirectory() as Directory
    if(o.files){
    sync(o.files).forEach(f=>{
      root.createSourceFile(basename(f), readFileSync(f).toString())
    })
    }  
  // const r = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.target}')]`, root);
  const r = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.target}')]`, root);
  if(r.error){
    fail(r.error)
  }
  // ok(r.error === undefined && r.result);
  // const i = r.result![0] as InterfaceDeclaration;
  return (r.result! as InterfaceDeclaration[]).filter(notUndefined) .map((i)=>{
    // console.log(i.getName(), i.getBaseDeclarations().map(d=>d.getName()))
    // const all = 
    //   [i, ... i.getBaseDeclarations()]
      // .map(m => m.getFirstChildByKind(SyntaxKind.Identifier)!)
      // .map(i => TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [i])

      // .flat() as InterfaceDeclaration[];

      const all = [i, ...getExtendsRecursively(i)
        .map(m => m.getFirstChildByKind(SyntaxKind.Identifier)!)]
        .map(i => TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [i])
        .flat() as InterfaceDeclaration[];


      //// .filter(TypeGuards.isReferenceFindableNode).map(i=>i.findReferences())//r//i.getFirstChildByKind(SyntaxKind.Identifier)).map(i=>i.)

    const methods = all.map(i => i.getMethods()).flat().filter(f=>!o.ignoreMemberWithUnderscorePrefix || !f.getName().startsWith('_')).filter((o,i,a)=>a.findIndex(e=>e.getName()===o.getName())===i).map(m=>extractDoc(m,o))
    //.map(m=>m.getSignature().getDeclaration().tex.getStructure())).flat()
    // const methodDocs = methods.map(extractDoc)
    const properties = all.map(i => i.getProperties()).flat().filter(f=>!o.ignoreMemberWithUnderscorePrefix || !f.getName().startsWith('_')).filter((o,i,a)=>a.findIndex(e=>e.getName()===o.getName())===i).map(m=>extractDoc(m,o))
    //.map(m=>m.getSignature().getDeclaration().tex.getStructure())).flat()
    // const propDocs = props.map(extractDoc)

  return o.onlySignature ? {
    name: i.getName(),
    signature: `interface ${i.getName()} {\n  ${properties.map(p=>p.signature).join('\n  ')}\n  ${methods.map(p=>p.signature).join('\n  ')}\n}`,
  }: {
    name: i.getName(),
    signature: `interface ${i.getName()} {\n  ${properties.map(p=>p.signature).join('\n  ')}\n  ${methods.map(p=>p.signature).join('\n  ')}\n}`,
      methods ,
      properties 
    }
  })
  // return addInterfaceSignatures(result)
  // console.log(methodDocs, propDocs);
  //   const r = queryAst(`
  // // * [ 
  //   (type()=='PropertySignature' || type()=='MethodSignature') && 
  //   parent()
  //   matchEvery(@namePath, '${o.targetPattern}')]`, root)
  //   console.log(r.error || r.result!.map(getASTNodeKindName));
}

// export function addInterfaceSignatures(r: RemoveProperties<Result, 'signature'>[]): Result[] {
//   return r.map(i=>({
//     ...i, 
   
//   }))
// }

function extractDoc(m: MethodSignature | PropertySignature, o: Options) {
  m.formatText();
  return o.onlySignature ? {
    signature: m.getText(),     
  } : {
    name:m.getName(),
    signature: m.getText(), 
    jsDocsText: m.getJsDocs().map(j=>j.getInnerText()).join('\n')
  }
}
