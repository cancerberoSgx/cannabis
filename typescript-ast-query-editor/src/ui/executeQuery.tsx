import { highlightNodesInEditor } from '../editor/codeEditor';
import { Example } from "../editor/examples";
import { getStore } from '../store';
import { executeQuery as executeQuery2 } from '../tsAstqAdapter';
export function executeQuery(selectedExample?: Example) {
  const state = getStore().getState();
  const query = selectedExample && selectedExample.query || state.selectedExample.query;
  const r = executeQuery2(query);
  if (r.result && r.result.length && !r.error) {
    highlightNodesInEditor(r.result);
  }
  getStore().setState({ selectedExample: { ...selectedExample || state.selectedExample, query }, result: r.result || [], error: r.error });
}
