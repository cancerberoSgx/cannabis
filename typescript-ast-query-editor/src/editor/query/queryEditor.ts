import * as monaco from 'monaco-editor'

let editor: monaco.editor.IStandaloneCodeEditor | undefined

let _containerEl: HTMLElement | undefined

interface Props {
  code: string,
  containerEl: HTMLElement,
  onCursorPositionChange: (e: monaco.editor.ICursorPositionChangedEvent) => void,
  onContentChange: (e: monaco.editor.IModelContentChangedEvent) => void
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
    return `\${${n}|${types.join(',')}|}`
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
      let type
      if ((type = types.find(t => t.includes(w) || w.includes(t)))) {
        contents.push({
          value: `**${type}** : TypeScript / JavaScript node\'s syntax kind. TODO document, reference.`
        })
      }
      let aFunction
      if ((aFunction = functions.find(t => t.includes(w) || w.includes(t)))) {
        contents.push({
          value: `**${aFunction}** : a Cannabis AST Querty function. Its signature is : TODO. reference, document.`
        })
      }
      let anAttr
      if ((anAttr = attributes.find(t => t.includes(w) || w.includes(t)))) {
        contents.push({
          value: `**${anAttr}** : a Cannabis AST Query attribute. Its signature is : TODO. reference, document.`
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

var attributes = ['type', 'text', 'name', 'modifiers', 'expression', 'literalText', 'start', 'end', 'width', 'body', 'leadingComments', 'trailingComments', 'kindPath', 'indexPath']

var functions = ["isFunctionLike", "below", "follows", "in", "debug", "join", "includes", "compareText", "contains", "attrs", "depth", "pos", "nth", "first", "last", "count", "substr", "index", "trim", "lc", "uc", "type", "getExtended", "getExtendedNames", "text", "extendsAllNamed", "extendsAnyNamed", "getImplementations", "getImplementationNames", "implementsAnyNamed", "implementsAllNamed", "findReferences", "sourceFile", "kindName", "parent", "children"]

var types = ["VariableDeclaration",
  "TypeParameter", "Parameter", "Decorator", "PropertySignature", "PropertyDeclaration", "MethodSignature", "MethodDeclaration", "Constructor", "GetAccessor", "SetAccessor", "CallSignature", "ConstructSignature", "IndexSignature", "FirstTypeNode", "TypeReference", "FunctionType", "ConstructorType", "TypeQuery", "TypeLiteral", "ArrayType", "TupleType", "OptionalType", "RestType", "UnionType", "IntersectionType", "ConditionalType", "InferType", "ParenthesizedType", "ThisType", "TypeOperator", "IndexedAccessType", "MappedType", "LiteralType", "LastTypeNode", "ObjectBindingPattern", "ArrayBindingPattern", "BindingElement", "ArrayLiteralExpression", "ObjectLiteralExpression", "PropertyAccessExpression", "ElementAccessExpression", "CallExpression", "NewExpression", "TaggedTemplateExpression", "TypeAssertionExpression", "ParenthesizedExpression", "FunctionExpression", "ArrowFunction", "DeleteExpression", "TypeOfExpression", "VoidExpression", "AwaitExpression", "PrefixUnaryExpression", "PostfixUnaryExpression", "BinaryExpression", "ConditionalExpression", "TemplateExpression", "YieldExpression", "SpreadElement", "ClassExpression", "OmittedExpression", "ExpressionWithTypeArguments", "AsExpression", "NonNullExpression", "MetaProperty", "SyntheticExpression", "TemplateSpan", "SemicolonClassElement", "Block", "VariableStatement", "EmptyStatement", "ExpressionStatement", "IfStatement", "DoStatement", "WhileStatement", "ForStatement", "ForInStatement", "ForOfStatement", "ContinueStatement", "BreakStatement", "ReturnStatement", "WithStatement", "SwitchStatement", "LabeledStatement", "ThrowStatement", "TryStatement", "DebuggerStatement", "VariableDeclarationList", "FunctionDeclaration", "ClassDeclaration", "InterfaceDeclaration", "TypeAliasDeclaration", "EnumDeclaration", "ModuleDeclaration", "ModuleBlock", "CaseBlock", "NamespaceExportDeclaration", "ImportEqualsDeclaration", "ImportDeclaration", "ImportClause", "NamespaceImport", "NamedImports", "ImportSpecifier", "ExportAssignment", "ExportDeclaration", "NamedExports", "ExportSpecifier", "MissingDeclaration", "ExternalModuleReference", "JsxElement", "JsxSelfClosingElement", "JsxOpeningElement", "JsxClosingElement", "JsxFragment", "JsxOpeningFragment", "JsxClosingFragment", "JsxAttribute", "JsxAttributes", "JsxSpreadAttribute", "JsxExpression", "CaseClause", "DefaultClause", "HeritageClause", "CatchClause", "PropertyAssignment", "ShorthandPropertyAssignment", "SpreadAssignment", "EnumMember", "UnparsedPrologue", "UnparsedPrepend", "UnparsedText", "UnparsedInternalText", "UnparsedSyntheticReference", "SourceFile", "Bundle", "UnparsedSource", "InputFiles", "FirstJSDocNode", "JSDocAllType", "JSDocUnknownType", "JSDocNullableType", "JSDocNonNullableType", "JSDocOptionalType", "JSDocFunctionType", "JSDocVariadicType", "JSDocComment", "JSDocTypeLiteral", "JSDocSignature", "FirstJSDocTagNode", "JSDocAugmentsTag", "JSDocClassTag", "JSDocCallbackTag", "JSDocEnumTag", "JSDocParameterTag", "JSDocReturnTag", "JSDocThisTag", "JSDocTypeTag", "JSDocTemplateTag", "JSDocTypedefTag", "LastJSDocTagNode", "SyntaxList", "NotEmittedStatement", "PartiallyEmittedExpression", "CommaListExpression", "MergeDeclarationMarker", "EndOfDeclarationMarker", "Count", "FirstToken", "EndOfFileToken", "FirstTriviaToken", "SingleLineCommentTrivia", "MultiLineCommentTrivia", "NewLineTrivia", "WhitespaceTrivia", "ShebangTrivia", "LastTriviaToken", "FirstLiteralToken", "BigIntLiteral", "StringLiteral", "JsxText", "JsxTextAllWhiteSpaces", "RegularExpressionLiteral", "FirstTemplateToken", "TemplateHead", "TemplateMiddle", "LastTemplateToken", "FirstPunctuation", "CloseBraceToken", "OpenParenToken", "CloseParenToken", "OpenBracketToken", "CloseBracketToken", "DotToken", "DotDotDotToken", "SemicolonToken", "CommaToken", "FirstBinaryOperator", "LessThanSlashToken", "GreaterThanToken", "LessThanEqualsToken", "GreaterThanEqualsToken", "EqualsEqualsToken", "ExclamationEqualsToken", "EqualsEqualsEqualsToken", "ExclamationEqualsEqualsToken", "EqualsGreaterThanToken", "PlusToken", "MinusToken", "AsteriskToken", "AsteriskAsteriskToken", "SlashToken", "PercentToken", "PlusPlusToken", "MinusMinusToken", "LessThanLessThanToken", "GreaterThanGreaterThanToken", "GreaterThanGreaterThanGreaterThanToken", "AmpersandToken", "BarToken", "CaretToken", "ExclamationToken", "TildeToken", "AmpersandAmpersandToken", "BarBarToken", "QuestionToken", "ColonToken", "AtToken", "BacktickToken", "FirstAssignment", "FirstCompoundAssignment", "MinusEqualsToken", "AsteriskEqualsToken", "AsteriskAsteriskEqualsToken", "SlashEqualsToken", "PercentEqualsToken", "LessThanLessThanEqualsToken", "GreaterThanGreaterThanEqualsToken", "GreaterThanGreaterThanGreaterThanEqualsToken", "AmpersandEqualsToken", "BarEqualsToken", "LastBinaryOperator", "Identifier", "FirstKeyword", "CaseKeyword", "CatchKeyword", "ClassKeyword", "ConstKeyword", "ContinueKeyword", "DebuggerKeyword", "DefaultKeyword", "DeleteKeyword", "DoKeyword", "ElseKeyword", "EnumKeyword", "ExportKeyword", "ExtendsKeyword", "FalseKeyword", "FinallyKeyword", "ForKeyword", "FunctionKeyword", "IfKeyword", "ImportKeyword", "InKeyword", "InstanceOfKeyword", "NewKeyword", "NullKeyword", "ReturnKeyword", "SuperKeyword", "SwitchKeyword", "ThisKeyword", "ThrowKeyword", "TrueKeyword", "TryKeyword", "TypeOfKeyword", "VarKeyword", "VoidKeyword", "WhileKeyword", "LastReservedWord", "FirstFutureReservedWord", "InterfaceKeyword", "LetKeyword", "PackageKeyword", "PrivateKeyword", "ProtectedKeyword", "PublicKeyword", "StaticKeyword", "LastFutureReservedWord", "FirstContextualKeyword", "AsKeyword", "AnyKeyword", "AsyncKeyword", "AwaitKeyword", "BooleanKeyword", "ConstructorKeyword", "DeclareKeyword", "GetKeyword", "InferKeyword", "IsKeyword", "KeyOfKeyword", "ModuleKeyword", "NamespaceKeyword", "NeverKeyword", "ReadonlyKeyword", "RequireKeyword", "NumberKeyword", "ObjectKeyword", "SetKeyword", "StringKeyword", "SymbolKeyword", "TypeKeyword", "UndefinedKeyword", "UniqueKeyword", "UnknownKeyword", "FromKeyword", "GlobalKeyword", "BigIntKeyword", "LastContextualKeyword", "FirstNode", "ComputedPropertyName",]
