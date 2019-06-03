import { setConfig } from 'cannabis'
import { inspect } from 'util'
import { getQueryEditorContainerEl, setQueryEditorText } from '../editor/query/queryEditor'
import { getCodeEditorContainerEl, setCodeEditorText } from '../editor/ts/codeEditor'
import { executeQuery } from '../queryAst/executeQuery'
import { codeExamples } from './examples'
import { getStore } from './store'

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

export function showQueryEditorAtTheRight(b: boolean) {
  const codeEl = getCodeEditorContainerEl()
  const queryEl = getQueryEditorContainerEl()
  if (codeEl && queryEl) {
    if (b) {
      Array.from(codeEl.parentElement!.children).forEach(e => {
        codeEl.style.display = 'none'
      })
      document.querySelector<HTMLDivElement>('.CursorBreadcrumb') && (document.querySelector<HTMLDivElement>('.CursorBreadcrumb')!.style.display = 'none')
      codeEl.parentElement!.appendChild(queryEl)
    }
    else {
      Array.from(codeEl.parentElement!.children).forEach(e => {
        codeEl.style.display = 'block'
      })
      document.querySelector<HTMLDivElement>('.CursorBreadcrumb') && (document.querySelector<HTMLDivElement>('.CursorBreadcrumb')!.style.display = 'block')
    }
  }
}
