import { inspect } from 'util'
import { getStore } from './store'
import { codeExamples } from './examples';
import { setEditorText } from '../editor/monaco';
import { executeQuery } from '../queryAst/executeQuery';
import { setConfig } from 'cannabis';

export function debug(...args: any[]) {
  getStore().getState().logs.push(args.map(a => inspect(a)).join(' '))
}

export function selectExample(query: string) {
  const selectedExample = getStore().getState().examples.find(ex => ex.query === query)!;
  if (selectedExample.code) {
    const code = codeExamples.find(c => c.name === selectedExample.code);
    code && setEditorText(code.content);
  }
  if(typeof selectedExample.getChildren!=='undefined' && selectedExample.getChildren!== getStore().getState().getChildren){
    setConfig('getChildren', selectedExample.getChildren)
    getStore().setState({getChildren: selectedExample.getChildren})
  }
  executeQuery(selectedExample);
}