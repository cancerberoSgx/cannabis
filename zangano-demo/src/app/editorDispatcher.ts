import { tsMorph } from 'zangano'
import { setActiveModel } from '../editor/monaco'
import { getStore } from './store'

export function selectFile(f: tsMorph.SourceFile) {

  getStore().setState({
    currentSourceFile: f,
  })

  setActiveModel(f)
}
