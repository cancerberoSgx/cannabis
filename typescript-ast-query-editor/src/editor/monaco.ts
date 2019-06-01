import * as monaco from 'monaco-editor'

let editor: monaco.editor.IStandaloneCodeEditor

export function getMonacoInstance() {
  if (!editor) {
    throw new Error('Editor not initialized, installEditor needs to be called first.')
  }
  return editor
}

export function installEditor(code: string, containerEl: HTMLElement) {
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
    model: monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.tsx')),
    language: 'typescript',
    wordWrap: 'on',
    minimap: { enabled: false, }
  })

  return editor
}

export function getEditorText() {
  return editor.getModel()!.getValue()
}

export function setEditorText(s: string) {
  return editor.getModel()!.setValue(s)
}
