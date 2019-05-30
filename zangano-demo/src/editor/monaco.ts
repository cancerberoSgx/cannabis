import { unique } from 'misc-utils-of-mine-generic'
import * as monaco from 'monaco-editor'
import { tsMorph } from 'zangano'
import { isSourceFile } from './tsUtil'

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

export function installEditor(containerEl: HTMLElement, content?: string) {
  if (editor) {
    return editor
  }
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: monaco.languages.typescript.JsxEmit.React,
  })

  editor = monaco.editor.create(containerEl, {
    model: getModel({ path: `/${unique('unamed')}.tsx`, content: content || 'const a = <p>hello <strong>world</strong</p>' }),
    language: 'typescript',
    wordWrap: 'on',
    minimap: { enabled: false, }
  })

  return editor
}

const validExtensions = ['.js', '.ts', '.jsx', '.json', '.tsx', '.d.ts']

const models: { [name: string]: monaco.editor.ITextModel } = {}

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
  debugger
  const model = getModel(f)
  if (!model) {
    throw new Error('No model exists for ' + f)
  }


  if (isSourceFile(f)) {
    model.setValue(f.getText())
    model.pushEditOperations(
      [],

      [
        {
          range: model.getFullModelRange(),
          text: model.getValue(),
        },
      ], (e) => { return null }
    )
    // editor.model
  }
  setTimeout(() => {
    editor.setModel(null)
    setTimeout(() => {
      editor.setModel(model)
      setTimeout(() => {
        editor.layout()
      }, 0)
    }, 0)
  }, 0)


}

export function getEditorText() {
  return editor.getModel()!.getValue()
}

export function setEditorText(s: string) {
  return editor.getModel()!.setValue(s)
}
