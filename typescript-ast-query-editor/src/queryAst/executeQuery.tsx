import { queryAst } from 'cannabis'
import { highlightNodesInEditor } from '../editor/codeEditor'
import { Example } from "../editor/examples"
import { getStore } from '../store'
import { getSourceFile } from './astFiles'

export function executeQuery(selectedExample?: Example) {
  const state = getStore().getState()
  const query = selectedExample && selectedExample.query || state.selectedExample.query
  const r = queryAst(query, getSourceFile())
  if (r.error) {
    console.error(r.error)
  }
  if (r.result && r.result.length && !r.error) {
    highlightNodesInEditor(r.result)
  }
  getStore().setState({ selectedExample: { ...selectedExample || state.selectedExample, query }, result: r.result || [], error: r.error, queryTraceText: r.query && r.query.dump() })
}
