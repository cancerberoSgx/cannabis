import { Project, InterfaceDeclaration, TypeGuards, MethodSignature, SyntaxKind, PropertySignature } from 'ts-morph';
import { setProject, queryAst } from 'cannabis';
import { ok } from 'assert';
import { getExtendsRecursively, getDefinitionsOf } from 'ts-simple-ast-extra';
import { Options } from './cli';

export function extractMemberSignatures(o: Options) {
  const p = new Project({ tsConfigFilePath: o.project, addFilesFromTsConfig: true });
  const root = setProject(p).getRootDirectory();
  const r = queryAst(`//InterfaceDeclaration [matchEvery(@namePath, '${o.target}')]`, root);
  ok(r.error === undefined && r.result);
  const i = r.result![0] as InterfaceDeclaration;
  const all = [i, ...getExtendsRecursively(i)
    .map(m => m.getFirstChildByKind(SyntaxKind.Identifier)!)]
    .map(i => TypeGuards.isIdentifier(i) ? getDefinitionsOf(i) : [i])
    .flat() as InterfaceDeclaration[];
  //// .filter(TypeGuards.isReferenceFindableNode).map(i=>i.findReferences())//r//i.getFirstChildByKind(SyntaxKind.Identifier)).map(i=>i.)
  const methods = all.map(i => i.getMethods()).flat();
  //.map(m=>m.getSignature().getDeclaration().tex.getStructure())).flat()
  // const methodDocs = methods.map(extractDoc)
  const props = all.map(i => i.getProperties()).flat();
  //.map(m=>m.getSignature().getDeclaration().tex.getStructure())).flat()
  // const propDocs = props.map(extractDoc)
  return {
    methods: methods.map(extractDoc),
    properties: props.map(extractDoc)
  };
  // console.log(methodDocs, propDocs);
  //   const r = queryAst(`
  // // * [ 
  //   (type()=='PropertySignature' || type()=='MethodSignature') && 
  //   parent()
  //   matchEvery(@namePath, '${o.targetPattern}')]`, root)
  //   console.log(r.error || r.result!.map(getASTNodeKindName));
}
function extractDoc(m: MethodSignature | PropertySignature) {
  m.formatText();
  return m.getText(true);
}
