import { tsMorph } from 'zangano';
import { getStore } from './store';
import { setEditorText, setActiveModel } from '../editor/monaco';
import { setTextRange } from 'typescript';

export function selectFile(f: tsMorph.SourceFile){

  getStore().setState({
    currentSourceFile: f,
  })

  setActiveModel(f)
}