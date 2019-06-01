import { Project, TypeGuards } from 'ts-morph';
import { getASTNodeText } from '../../src';
import { ok, equal } from 'assert';
import { printDiagnostics } from 'ts-simple-ast-extra';

const p = new Project()
const c = p.createSourceFile('d.ts', `
//c1
const a = 1
/**c2*/
class C{}
`)
// printDiagnostics(p)
ok(c.getPreEmitDiagnostics().length===0)

console.log(c.getStatements().map(c=>c.getText()));
// [ 'const a = 1', 'class C{}' ]
console.log(c.getStatementsWithComments().map(c=>c.getText()));
// [ '//c1', 'const a = 1', 'class C{}' ]                 <---- ts-morph issue ? 


const f =  p.createSourceFile('d2.ts', `
//c1
const a2 = 1
// c3
/* c6 */
/**
 * desccc
 * @param T fsdf fff
 * @param F asdf  s dfdf
 * @return {string[]} foo bar
 * */
class C2<T,F>{
  member=1
} // ccc
// c4
/* c5*/
var b2 = 1
`)
// printDiagnostics(p)
ok(f.getPreEmitDiagnostics().length===0)
const cc = f.getClass('C2')!
console.log(cc.getLeadingCommentRanges().map(r=>r.getText()));
console.log(cc.getTrailingCommentRanges().map(r=>r.getText()));
// []                                       <---- ts-morph issue ? 

console.log(cc.getJsDocs().map(r=>r.getTags().map(t=>({name: t.getTagName(), text: t.getText(),p : TypeGuards.isJSDocParameterTag(t) ? t.getName() : TypeGuards.isJSDocReturnTag(t)? t.getTypeExpression()&&t.getTypeExpression()!.getText() : ''}))));