import { writeFileSync } from 'fs'
import { printMs } from 'misc-utils-of-mine-generic'
import { ASTNode, getASTNodeName, getFile, queryAll, queryAst } from '../../src'
import { withConfig } from '../../src/query/config'
import { code1 } from './code1'
import { getPerformanceFileName } from './perfUtil'

function start() {

  const root = getFile(code1, 'f1.ts')
  const allNames = queryAll(`// *`, root).map(getASTNodeName).filter((e, i, a) => e && a.indexOf(e) === i)
  const reports = []

  reports.push(buildReport({ result: test((a, b) => `// * [ (@name =~ '${a}' && (..// * [@name =~ '${b}'])) || (@name =~ '${b}' && (..// * [@name =~ '${a}'])) ]`), name: 'ascendant_descendant' }))

  withConfig({ cacheNodePaths: false }, () =>
    reports.push(buildReport({ result: test((a, b) => `// * [ matchEvery(@namePath, '**/${a}/**/${b}/**') ]`), name: 'matchEvery' }))
  )

  withConfig({ cacheNodePaths: true }, () =>
    reports.push(buildReport({ result: test((a, b) => `// * [ matchEvery(@namePath, '**/${a}/**/${b}/**') ]`), name: 'matchEvery_cachedPaths' }))
  )

  reports.push(buildReport({ result: test((a, b) => `// * [ (@modifiers=~'export' && @modifiers=~'default' && @modifiers=~'abstract' ) || (//Identifier && @text=='${a}') || (..//FunctionDeclaration && @name=='${b}') ]`), name: 'attributes1' }))

  writeFileSync('test/performance/reports/' + getPerformanceFileName('allNames1'), JSON.stringify(reports, null, 2))

  function buildReport({ result, name }: { result: TestResult, name: string }) {
    const report = {
      name: 'allNames1_' + name,
      time: Date.now() - result.t0,
      timeFormatted: printMs(Date.now() - result.t0),
      results: result.results.length,
      queries: result.counter
    }
    console.log(`${result.results.length} results, ${result.counter} queries in ${printMs(Date.now() - result.t0)}`)
    return report
  }

  interface TestResult {
    counter: number;
    t0: number;
    results: ASTNode[]
  }

  let counter = 0
  function test(q: (a: string, b: string) => string): TestResult {
    counter = 0
    const t0 = Date.now()
    const results: ASTNode[] = []
    for (let i = 0;i < allNames.length;i++) {
      const j = allNames.length - 1 - i
      const a = allNames[i]
      const b = allNames[j]
      if (a != b) {
        results.push(...query(q(a, b)))
      }
    }
    return { results, counter, t0 }
  }

  function query(q: string) {
    counter++
    const r = queryAst(q, root)
    if (r.error) {
      console.error(r.error)
      throw r.error
    }
    return r.result!
  }
}

start()

