import { setProject, loadProject, queryAll, getASTNodeText, queryAst, getASTNodeKindName, getASTNodeName, getFile, ASTNode } from '../../src';
import { equal } from 'assert';
import { notFalsy, printMs } from 'misc-utils-of-mine-generic';
import { code1 } from './code1';
import { writeFileSync } from 'fs';
import { getPerformanceFileName } from './perfUtil';


function start() {
  // const root = loadProject('test/assets/project1/tsconfig.json').getRootDirectory()
  const root = getFile(code1, 'f1.ts')
  const allNames = queryAll(`// *`, root).map(getASTNodeName).filter((e,i,a)=>e && a.indexOf(e)===i) 
  // console.log(
  //   JSON.stringify(allNames)
  // )
  // const r = queryAst(`// * [ @name=='A' && (..// * [@name=='src'])]`, root)
  // if(r.error){
  //   console.error(r.error);   
  //   throw r.error
  // }
  // equal(r.error ? r.error+'\n'+r.error.stack : '', '')
// console.log(
//   JSON.stringify(r.result!.map(getASTNodeKindName))
// )
const reports = []

reports.push( buildReport({result: test( (a,b)=>`// * [ (@name =~ '${a}' && (..// * [@name =~ '${b}'])) || (@name =~ '${b}' && (..// * [@name =~ '${a}'])) ]`), name: 'ascendant_descendant'})
)

reports.push( buildReport({result: test( (a,b)=>`// * [ matchEvery(@namePath, '**/${a}/**/${b}/**') ]`), name: 'matchEvery'})
)

  // var { results, counter, t0 } = test( (a,b)=>`// * [ (@name =~ '${a}' && (..// * [@name =~ '${b}'])) || (@name =~ '${b}' && (..// * [@name =~ '${a}'])) ]`));
  

writeFileSync('test/performance/reports/'+getPerformanceFileName('allNames1'), JSON.stringify(reports, null, 2))

function buildReport({result, name}: {result: TestResult, name: string}){
  const report  = {
    name: 'allNames1_'+name,
    time: Date.now()-result.t0,
    timeFormatted : printMs(Date.now()-result.t0),
    results: result.results.length,
    queries:result.counter
  }
console.log(`${result.results.length} results, ${result.counter} queries in ${printMs(Date.now()-result.t0)}`);
  return report
}

interface TestResult{
  counter: number;
  t0: number;
  results: ASTNode[]
}

let counter = 0;
  function test( q: (a:string,b:string)=> string):TestResult {
    counter=0
    const t0 = Date.now();
    const results: ASTNode[] = [];
    for (let i = 0; i < allNames.length; i++) {
      const j = allNames.length - 1 - i;
      const a = allNames[i];
      // for (let j = i; j < allNames.length; j++) {
      const b = allNames[j];
      if (a != b) {
        results .push(...query(q(a,b)))
        // query(`// * [ (@name =~ '${a}' && (..// * [@name =~ '${b}'])) || (@name =~ '${b}' && (..// * [@name =~ '${a}'])) ]`);
        // query(`// * [ matchEvery(@namePath, '**/${a}/**/${b}/**') || matchEvery(@namePath, '**/${b}/**/${a}/**') ]`)
      }
      // }
    }
    return {results,  counter, t0 };
  }

  function query(q: string) {
    counter++;
    const r = queryAst(q, root);
    if (r.error) {
      console.error(r.error);
      throw r.error;
    }
    return r.result!
    // 
  }
}



start()

