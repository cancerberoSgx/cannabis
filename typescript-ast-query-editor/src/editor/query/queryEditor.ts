import * as monaco from 'monaco-editor'
import { nodeKinds } from '../../queryAst/nodeKinds';
import { attributeSignatures } from '../../queryAst/attributeSignatures';
import { functionSignatures } from '../../queryAst/functionSignatures';
import { nodeKindSignature } from '../../queryAst/nodeKindSignatures';

let editor: monaco.editor.IStandaloneCodeEditor | undefined

let _containerEl: HTMLElement | undefined

interface Props {
  code: string,
  containerEl: HTMLElement,
  onCursorPositionChange: (e: monaco.editor.ICursorPositionChangedEvent) => void,
  onContentChange: (e: monaco.editor.IModelContentChangedEvent) => void
}

export function getQueryEditorContainerEl(){
  return _containerEl
}

/**
 * @internal
 */
export function installQueryEditor(props: Props) {
  if (editor) {
    return editor
  }
  monaco.languages.register({ id: 'cannabisTypeScriptQueries' })
  setMonarchTokensProvider()
  registerCompletionItemProvider()
  registerHoverProvider()

  editor = monaco.editor.create(props.containerEl, {
    value: props.code,
    language: 'cannabisTypeScriptQueries'
  })
  _containerEl = props.containerEl
  editor.onDidChangeCursorPosition(props.onCursorPositionChange)
  editor.getModel()!.onDidChangeContent(props.onContentChange)
  return editor
}

export function getQueryEditorText() {
  return editor!.getModel()!.getValue()
}

export function setQueryEditorText(s: string) {
  return editor!.getModel()!.setValue(s)
}

/** @internal */
export function updateQueryEditorUI(containerEl: HTMLElement) {
  // HEADS UP! HACK: we store a reference to the original element and on the next umount/mount we call
  // updateQueryEditorUI so it will hide react-created-empty container element and append the real one. Ugly
  // anti-react-pattern hack - but I don't want to use a library for monaco-react anna need this working asap.
  if (editor && _containerEl) {
    containerEl.style.display = 'hidden'
    containerEl.parentElement!.insertBefore(_containerEl, containerEl)
    editor && editor!.layout()
  }
}

function setMonarchTokensProvider() {
  // HEADS UP! names like 'identifier', 'string', 'number' etc are defined by the typescript editor / plugin.
  // Since monaco doesn't support two editors with different themes in the same DOM, we cannot define our own
  // theme so this is the only way of having some colors. 
  monaco.languages.setMonarchTokensProvider('cannabisTypeScriptQueries', {
    tokenizer: {
      root: [
        [/[\[\]]{1}/igm, "@brackets"],

        [/@[a-zA-Z0-9]+/, "identifier"],

        [/\'[^\'']+\'/, "string"],
        [/\"[^\]]+\"/, "string"],
        [/[0-9\.]+/, "number"],

        [/\s*[\a-zA-Z0-9_]+\s*\(/, "delimiter"],
        [/[\(\)]/, "delimiter"],
        [/\[[a-zA-Z 0-9:]+\]/, "delimiter"],

        [/&/, "comment.doc"], [/=/, "comment.doc"],
        [/>/, "comment.doc"], [/</, "comment.doc"],
        [/!/, "comment.doc"], // TODO: the rest 

        [/[\/\.]+\s*[A-Z-a-z0-9]+/, "string.escape"],
        [/[\/\.\*]+/, "string.escape"] // TODO: the rest   
      ]
    }
  })
}

function registerCompletionItemProvider() {
  function typesCompletion(n: number) {
    return `\${${n}|${nodeKinds.join(',')}|}`
  }
  function attributesCompletion(n: number) {
    return `@\${${n}|${attributes.join(',')}|}`
  }
  function operatorsCompletion(n: number) {
    return `\${${n}|${operators.join(',')}|}`
  }
  function axisCompletion(n: number) {
    return `\${${n}|${axis.join(',')}|}`
  }
  function functionsCompletion(n: number) {
    return `\${${n}|${functions.join(',')}|}()`
  }
  monaco.languages.registerCompletionItemProvider('cannabisTypeScriptQueries', {
    provideCompletionItems: () => {
      var suggestions = [{
        label: 'attribute',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: attributesCompletion(1),
        range: undefined as any,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      },
      {
        label: 'type',
        kind: monaco.languages.CompletionItemKind.Keyword,
        range: undefined as any,
        insertText: typesCompletion(1),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'function',
        kind: monaco.languages.CompletionItemKind.Keyword,
        range: undefined as any,
        insertText: functionsCompletion(1),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      },
      {
        label: 'axis',
        kind: monaco.languages.CompletionItemKind.Keyword,
        range: undefined as any,
        insertText: axisCompletion(1),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      },
      {
        label: 'operator',
        kind: monaco.languages.CompletionItemKind.Keyword,
        range: undefined as any,
        insertText: operatorsCompletion(1),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      },
      {
        label: 'path',
        range: undefined as any,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: `
  ${axisCompletion(1)} ${typesCompletion(2)} [ ${functionsCompletion(3)} ${operatorsCompletion(4)} ${attributesCompletion(5)} ]
  `.trim(),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }
      ]
      return { suggestions, them() { } }
    }
  })
}

function registerHoverProvider() {
  monaco.languages.registerHoverProvider('cannabisTypeScriptQueries', {
    provideHover: (model, p) => {
      let w_ = model.getWordAtPosition(p)
      const w = w_ && w_.word || model.getValueInRange({ startColumn: Math.max(0, p.column - 2), startLineNumber: p.lineNumber, endColumn: p.column + 2, endLineNumber: p.lineNumber }).trim()
      if (!w) {
        return
      }
      const contents = []
      let operator
      if ((operator = operators.find(o => w.includes(o)))) {
        contents.push({
          value: `**${operator}** : ASTQ query operator. TODO DOCUMENT; REFerence.`
        }
        )
      }
      let anAxis
      if ((anAxis = axis.find(o => w.includes(o)))) {
        contents.push({
          value: `**${anAxis}** : ASTQ query axis. TODO DOCUMENT; REFerence.`
        }
        )
      }
      let type:string|undefined
      if ((type = nodeKinds.find(t => w.includes(t)))) {
        const signature = nodeKindSignature.find(s=>s.name===type) || {signature: ''}
        contents.push({
          value: `**${type}**: TypeScript/JavaScript AST node kind\'s syntax kind.\n${'```ts\n'+signature.signature+'\n```'}`
        })
      }
      let aFunction:string|undefined
      if ((aFunction = functions.find(t =>  w.includes(t)))) {
        const a = functionSignatures.find(a=>a.name===aFunction)
        contents.push({
          value: `**${aFunction}**\n\`${a&&a.signature}\`\n${a&&a.jsDocsText}`
        })
      }
      let anAttr:string|undefined
      if ((anAttr = attributes.find(t =>w.includes(t)))) {
        const a = attributeSignatures.find(a=>a.name===anAttr)
        contents.push({
          value: `**@${anAttr}**\n\`${a&&a.signature}\`\n${a&&a.jsDocsText}`
        })
      }
      if (contents.length) {
        return {
          contents
        }
      }
    }
  })
}

var axis = ['//', '/', './', './/', '-/', '-//', '+/', '+//', '~/', '~//', '../', '..//', '<//', '>//']

var compareOperators = ["==", "!=", "<=", ">=", "<", ">", "=~", "!~"]

var logicalOperators = ["&&", "\\|\\|"]

var operators = [...logicalOperators, ...compareOperators]

var attributes = attributeSignatures.map(a=>a.name)//['type', 'text', 'name', 'modifiers', 'expression', 'literalText', 'start', 'end', 'width', 'body', 'leadingComments', 'trailingComments', 'kindPath', 'indexPath']

var functions = functionSignatures.map(f=>f.name)//["isFunctionLike", "below", "follows", "in", "debug", "join", "includes", "compareText", "contains", "attrs", "depth", "pos", "nth", "first", "last", "count", "substr", "index", "trim", "lc", "uc", "type", "getExtended", "getExtendedNames", "text", "extendsAllNamed", "extendsAnyNamed", "getImplementations", "getImplementationNames", "implementsAnyNamed", "implementsAllNamed", "findReferences", "sourceFile", "kindName", "parent", "children"]
