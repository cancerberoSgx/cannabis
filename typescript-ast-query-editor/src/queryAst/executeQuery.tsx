import { queryAst, QueryResult } from 'cannabis'
import { Example } from '../app/examples'
import { getStore } from '../app/store'
import { highlightNodesInEditor } from '../editor/ts/codeEditor'
import { getSourceFile } from './astFiles'

// interface Options {
//   query: string
//   trace?: boolean
// }
export function executeQuery(selectedExample?: Example) {
  const state = getStore().getState()
  const query = selectedExample && selectedExample.query || state.selectedExample.query
  if (!query) {
    return
  }
  const context = { logs: [] }
  const r = queryAst(query, getSourceFile(), { context })
  if (r.error) {
    console.error(r.error)
  }
  if (r.result && r.result.length && !r.error) {
    highlightNodesInEditor(r.result)
  }
  getStore().setState({
    selectedExample: { ...selectedExample || state.selectedExample, query },
    result: r.result || [],
    error: r.error,
    queryLogs: context.logs,
    queryDump: getQueryDump(r),
    query: r.query || state.query,
    queryAst: r.query && r.query.ast || state.queryAst
  })
}

function getQueryDump(r: QueryResult): string | undefined {
  if (!r.query) {
    return ''
  }
  let s = r.query.dump().replace(/   /gm, ' ').replace(/├── /gm, '├─').replace(/└── /gm, '└─')
  return s
}

