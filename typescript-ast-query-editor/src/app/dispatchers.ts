import { setConfig } from 'cannabis'
import { inspect } from 'util'
import { executeQuery } from '../queryAst/executeQuery'
import { codeExamples } from './examples'
import { getStore } from './store'
import { setQueryEditorText } from '../editor/query/queryEditor';
import { setCodeEditorText } from '../editor/ts/codeEditor';

export function debug(...args: any[]) {
  getStore().getState().logs.push(args.map(a => inspect(a)).join(' '))
}

export function selectExample(query: string) {
  const selectedExample = getStore().getState().examples.find(ex => ex.query === query)!
  if (selectedExample.code) {
    const code = codeExamples.find(c => c.name === selectedExample.code)
    code && setCodeEditorText(code.content)
  }
  setQueryEditorText(selectedExample.query)
  if (typeof selectedExample.getChildren !== 'undefined' && selectedExample.getChildren !== getStore().getState().getChildren) {
    setConfig('getChildren', selectedExample.getChildren)
    getStore().setState({ getChildren: selectedExample.getChildren })
  }
  executeQuery(selectedExample)
}
