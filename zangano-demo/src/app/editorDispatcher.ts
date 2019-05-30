import { tsMorph } from 'zangano'
import { setActiveModel, getEditorText } from '../editor/monaco'
import { getStore } from './store'
import { unique } from 'misc-utils-of-mine-generic';

export function selectFile(f: tsMorph.SourceFile) {
  getStore().setState({
    currentSourceFile: f,
  })
  setActiveModel(f)
}

export function addNewFile(){
  const name = prompt('New File Name?', 'src/Unnamed_'+unique()+'.ts')||'src/Unnamed_'+unique()+'.ts'
  const newFile = getStore().getState().currentProject.project.createSourceFile(name, '')
  selectFile(newFile)
}

export function saveEditorFile(){
try {
  const text = getEditorText()
  const path = getStore().getState().currentSourceFile.getFilePath()
  getStore().getState().currentSourceFile.replaceWithText(text)
  getStore().getState().currentSourceFile.saveSync()
  getStore().getState().currentSourceFile.forget()  
  getStore().getState().currentSourceFile = getStore().getState().currentProject.project.getSourceFile(path)!
} catch (error) {
  getStore().setState({error})
}

}