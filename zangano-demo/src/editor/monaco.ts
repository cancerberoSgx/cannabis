import { unique } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import { tsMorph } from 'zangano'
import { isSourceFile } from './tsUtil'
import { getMonacoDefinitionAtPosition } from './tsWorker';
import { install } from './navigateExternalDefinitions';
import {lib_es2015_core_d_ts ,lib_es5_d_ts, lib_es2015_iterable_d_ts, lib_es2015_symbol_d_ts} from 'zangano'

export function initMonacoWorkers() {
  if (typeof (self as any).MonacoEnvironment === 'undefined') {
    (self as any).MonacoEnvironment = {
      getWorkerUrl(moduleId: any, label: any) {
        if (label === 'json') {
          return './json.worker.js'
        }
        if (label === 'css') {
          return './css.worker.js'
        }
        if (label === 'html') {
          return './html.worker.js'
        }
        if (label === 'typescript' || label === 'javascript') {
          return './ts.worker.js'
        }
        return './editor.worker.js'
      },
    }
  }
}

let editor: monaco.editor.IStandaloneCodeEditor

export function getMonacoInstance() {
  if (!editor) {
    throw new Error('Editor not initialized, installEditor needs to be called first.')
  }
  return editor
}



export function getEditor(containerEl: HTMLElement, content?: string) {
  if (editor) {
    return editor
  }
  
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: monaco.languages.typescript.JsxEmit.React,
  })
  // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5_d_ts,`node_modules/typescript/lib/lib.es5.d.ts`)
  // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_core_d_ts,`node_modules/typescript/lib/lib.es2015.core.d.ts`)
  //  monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_iterable_d_ts,`node_modules/typescript/lib/lib.es2015.iterable.d.ts`) 
  //  monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_core_d_ts,`node_modules/typescript/lib/lib.es2015.core.d.ts`)
  
  editor = monaco.editor.create(containerEl, {
    model: getModel({ path: `/${unique('unamed')}.tsx`, content: content || 'const a = <p>hello <strong>world</strong</p>' }),
    language: 'typescript',
    wordWrap: 'on',
    minimap: { enabled: false, }
  })

  // project.createSourceFile('lib.es5.d.ts', lib_es5_d_ts)
  // project.createSourceFile('lib.es2015.core.d.ts', lib_es2015_core_d_ts)
  // // project.createSourceFile('lib.es2015.symbol.d.ts', lib_es2015_symbol_d_ts)
  // project.createSourceFile('lib.es2015.iterable.d.ts', lib_es2015_iterable_d_ts)
  // project.createSourceFile('lib.dom.d.ts', lib_dom_d_ts)

  // const fileName = `node_modules/@types${d.name.substring('@types'.length, d.name.length)}/index.d.ts`
          // getMonaco().languages.typescript.typescriptDefaults.addExtraLib(text, fileName)
          // const fileName = `node_modules/typescript/lib/${lib}`
              // const url = `https://unpkg.com/typescript@2.9.2/lib/${lib}`
              // console.log(`addExtraLib url: ${url} . Filename: ${fileName}. libs value: ${lib}`);
              // libResource = { fileName, url, content }
           
  // lib_es2015_core_d_ts
  
  // install(editor, (ed, model, def)=>{
  //   console.log(ed, model, def);    
  // })

  // monaco.editor.onDidCreateEditor(ed=>{

  // })

  // getMonaco().


  return editor
}

const validExtensions = ['.js', '.ts', '.jsx', '.json', '.tsx', '.d.ts']

const models: { [name: string]: monaco.editor.ITextModel } = {}
let activeFilePath: string=''

export function getModel(fileOrFilePath: string | tsMorph.SourceFile | { path: string, content: string }): monaco.editor.ITextModel | undefined {
  const { path, content } = typeof fileOrFilePath === 'string' ? { path: fileOrFilePath, content: '' } : isSourceFile(fileOrFilePath) ? { path: fileOrFilePath.getFilePath(), content: fileOrFilePath.getText() } : fileOrFilePath

  if (!path.startsWith('/') || !validExtensions.find(e => path!.endsWith(e))) {
    throw new Error('To create a model give an absolute path and an extension in ' + validExtensions.join(', '))
  }
  if (models[path]) {
    return models[path]
  }
  const model = monaco.editor.createModel(content || '', 'typescript', monaco.Uri.parse(`file://${path}`))
  models[path] = model
  return model
}

export function setActiveModel(f: tsMorph.SourceFile) {
  const fp = f.getFilePath()
  if(fp===activeFilePath){
    return
  }
  const model = getModel(f)
  if (!model) {
    throw new Error('No model exists for ' + f)
  }
    updateEditorModel(model, fp);
}

const viewStates : {[s: string]: monaco.editor.ICodeEditorViewState|null} = {}
function updateEditorModel(model: monaco.editor.ITextModel, f: string) {
  viewStates[activeFilePath] = editor.saveViewState()
  model.pushEditOperations([], [
    {
      range: model.getFullModelRange(),
      text: model.getValue(),
    },
  ], (e) => { return null; });
  editor.setModel(null);
  editor.setModel(model);

  activeFilePath = f
  const nextViewState = viewStates[f]
  if(nextViewState){
    editor.restoreViewState(nextViewState)
  }
}

export function getEditorText() {
  return editor.getModel()!.getValue()
}

export function setEditorText(s: string) {
  return editor.getModel()!.setValue(s)
}
