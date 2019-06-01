import * as monaco from 'monaco-editor'

function setMonarchTokensProvider() {
  monaco.languages.setMonarchTokensProvider('cannabisTypeScriptQueries', {
    tokenizer: {
      root: [
        [/[\[\]]{1}/igm, "square-brackets"],

        [/@[a-zA-Z0-9]+/, "attribute"],

        [/\'[^\'']+\'/, "literal"],
        [/\"[^\]]+\"/, "literal"],
        [/[0-9\.]+/, "literal"],

        [/\s*[\a-zA-Z0-9_]+\s*\(/, "function"],
        [/[\(\)]/, "function"],
        [/\[[a-zA-Z 0-9:]+\]/, "function"],

        [/&/, "operator"], [/=/, "operator"],
        [/>/, "operator"], [/</, "operator"],
        [/!/, "operator"], // TODO: the rest 

        [/[\/\.]+\s*[A-Z-a-z0-9]+/, "axis"],
        [/[\/\.\*]+/, "axis"] // TODO: the rest   
      ]
    }
  })
}

function defineTheme() {
  monaco.editor.defineTheme('cannabisTypeScriptQueriesLightTheme', {
    base: 'vs',
    inherit: false,
    rules: [
      { token: 'literal', foreground: '808080' },
      { token: 'square-brackets', foreground: 'ff0000' },
      { token: 'attribute', foreground: 'FFA500' },
      { token: 'function', foreground: '008800' },
      { token: 'operator', foreground: '0055aa' },
      { token: 'axis', foreground: '992288', fontStyle: 'bold' },
    ],
    colors: {}
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
      ];
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
          //range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
          contents
        }
      }
    }
  });
}

let editor: monaco.editor.IStandaloneCodeEditor | undefined

export function getQueryEditor() {
  if (!editor) {
    throw new Error('Editor not initialized, installEditor needs to be called first.')
  }
  return editor
}

/**
 * @internal
 */
export function installQueryEditor(code: string, containerEl: HTMLElement) {
  if (editor) {
    return editor
  }
  monaco.languages.register({ id: 'cannabisTypeScriptQueries' });
  setMonarchTokensProvider()
  defineTheme()
  registerCompletionItemProvider()
  registerHoverProvider()
  editor = monaco.editor.create(containerEl, {
    theme: 'cannabisTypeScriptQueriesLightTheme',
    value: code,
    language: 'cannabisTypeScriptQueries'
  })
  return editor
}

export function getQueryEditorText() {
  return editor!.getModel()!.getValue()
}

export function setQueryEditorText(s: string) {
  return editor!.getModel()!.setValue(s)
}





var axis = ['//', '/', './', './/', '-/', '-//', '+/', '+//', '~/', '~//', '../', '..//', '<//', '>//']

var compareOperators = ["==", "!=", "<=", ">=", "<", ">", "=~", "!~"]

var logicalOperators = ["&&", "\\|\\|"]

var operators = [...logicalOperators, ...compareOperators]

var attributes = ['type', 'text', 'name', 'modifiers', 'expression', 'literalText', 'start', 'end', 'width', 'body', 'leadingComments', 'trailingComments', 'kindPath', 'indexPath']

var functions = ["isFunctionLike", "below", "follows", "in", "debug", "join", "includes", "compareText", "contains", "attrs", "depth", "pos", "nth", "first", "last", "count", "substr", "index", "trim", "lc", "uc", "type", "getExtended", "getExtendedNames", "text", "extendsAllNamed", "extendsAnyNamed", "getImplementations", "getImplementationNames", "implementsAnyNamed", "implementsAllNamed", "findReferences", "sourceFile", "kindName", "parent", "children"]

var types = ["VariableDeclaration",
  "TypeParameter", "Parameter", "Decorator", "PropertySignature", "PropertyDeclaration", "MethodSignature", "MethodDeclaration", "Constructor", "GetAccessor", "SetAccessor", "CallSignature", "ConstructSignature", "IndexSignature", "FirstTypeNode", "TypeReference", "FunctionType", "ConstructorType", "TypeQuery", "TypeLiteral", "ArrayType", "TupleType", "OptionalType", "RestType", "UnionType", "IntersectionType", "ConditionalType", "InferType", "ParenthesizedType", "ThisType", "TypeOperator", "IndexedAccessType", "MappedType", "LiteralType", "LastTypeNode", "ObjectBindingPattern", "ArrayBindingPattern", "BindingElement", "ArrayLiteralExpression", "ObjectLiteralExpression", "PropertyAccessExpression", "ElementAccessExpression", "CallExpression", "NewExpression", "TaggedTemplateExpression", "TypeAssertionExpression", "ParenthesizedExpression", "FunctionExpression", "ArrowFunction", "DeleteExpression", "TypeOfExpression", "VoidExpression", "AwaitExpression", "PrefixUnaryExpression", "PostfixUnaryExpression", "BinaryExpression", "ConditionalExpression", "TemplateExpression", "YieldExpression", "SpreadElement", "ClassExpression", "OmittedExpression", "ExpressionWithTypeArguments", "AsExpression", "NonNullExpression", "MetaProperty", "SyntheticExpression", "TemplateSpan", "SemicolonClassElement", "Block", "VariableStatement", "EmptyStatement", "ExpressionStatement", "IfStatement", "DoStatement", "WhileStatement", "ForStatement", "ForInStatement", "ForOfStatement", "ContinueStatement", "BreakStatement", "ReturnStatement", "WithStatement", "SwitchStatement", "LabeledStatement", "ThrowStatement", "TryStatement", "DebuggerStatement", "VariableDeclarationList", "FunctionDeclaration", "ClassDeclaration", "InterfaceDeclaration", "TypeAliasDeclaration", "EnumDeclaration", "ModuleDeclaration", "ModuleBlock", "CaseBlock", "NamespaceExportDeclaration", "ImportEqualsDeclaration", "ImportDeclaration", "ImportClause", "NamespaceImport", "NamedImports", "ImportSpecifier", "ExportAssignment", "ExportDeclaration", "NamedExports", "ExportSpecifier", "MissingDeclaration", "ExternalModuleReference", "JsxElement", "JsxSelfClosingElement", "JsxOpeningElement", "JsxClosingElement", "JsxFragment", "JsxOpeningFragment", "JsxClosingFragment", "JsxAttribute", "JsxAttributes", "JsxSpreadAttribute", "JsxExpression", "CaseClause", "DefaultClause", "HeritageClause", "CatchClause", "PropertyAssignment", "ShorthandPropertyAssignment", "SpreadAssignment", "EnumMember", "UnparsedPrologue", "UnparsedPrepend", "UnparsedText", "UnparsedInternalText", "UnparsedSyntheticReference", "SourceFile", "Bundle", "UnparsedSource", "InputFiles", "FirstJSDocNode", "JSDocAllType", "JSDocUnknownType", "JSDocNullableType", "JSDocNonNullableType", "JSDocOptionalType", "JSDocFunctionType", "JSDocVariadicType", "JSDocComment", "JSDocTypeLiteral", "JSDocSignature", "FirstJSDocTagNode", "JSDocAugmentsTag", "JSDocClassTag", "JSDocCallbackTag", "JSDocEnumTag", "JSDocParameterTag", "JSDocReturnTag", "JSDocThisTag", "JSDocTypeTag", "JSDocTemplateTag", "JSDocTypedefTag", "LastJSDocTagNode", "SyntaxList", "NotEmittedStatement", "PartiallyEmittedExpression", "CommaListExpression", "MergeDeclarationMarker", "EndOfDeclarationMarker", "Count", "FirstToken", "EndOfFileToken", "FirstTriviaToken", "SingleLineCommentTrivia", "MultiLineCommentTrivia", "NewLineTrivia", "WhitespaceTrivia", "ShebangTrivia", "LastTriviaToken", "FirstLiteralToken", "BigIntLiteral", "StringLiteral", "JsxText", "JsxTextAllWhiteSpaces", "RegularExpressionLiteral", "FirstTemplateToken", "TemplateHead", "TemplateMiddle", "LastTemplateToken", "FirstPunctuation", "CloseBraceToken", "OpenParenToken", "CloseParenToken", "OpenBracketToken", "CloseBracketToken", "DotToken", "DotDotDotToken", "SemicolonToken", "CommaToken", "FirstBinaryOperator", "LessThanSlashToken", "GreaterThanToken", "LessThanEqualsToken", "GreaterThanEqualsToken", "EqualsEqualsToken", "ExclamationEqualsToken", "EqualsEqualsEqualsToken", "ExclamationEqualsEqualsToken", "EqualsGreaterThanToken", "PlusToken", "MinusToken", "AsteriskToken", "AsteriskAsteriskToken", "SlashToken", "PercentToken", "PlusPlusToken", "MinusMinusToken", "LessThanLessThanToken", "GreaterThanGreaterThanToken", "GreaterThanGreaterThanGreaterThanToken", "AmpersandToken", "BarToken", "CaretToken", "ExclamationToken", "TildeToken", "AmpersandAmpersandToken", "BarBarToken", "QuestionToken", "ColonToken", "AtToken", "BacktickToken", "FirstAssignment", "FirstCompoundAssignment", "MinusEqualsToken", "AsteriskEqualsToken", "AsteriskAsteriskEqualsToken", "SlashEqualsToken", "PercentEqualsToken", "LessThanLessThanEqualsToken", "GreaterThanGreaterThanEqualsToken", "GreaterThanGreaterThanGreaterThanEqualsToken", "AmpersandEqualsToken", "BarEqualsToken", "LastBinaryOperator", "Identifier", "FirstKeyword", "CaseKeyword", "CatchKeyword", "ClassKeyword", "ConstKeyword", "ContinueKeyword", "DebuggerKeyword", "DefaultKeyword", "DeleteKeyword", "DoKeyword", "ElseKeyword", "EnumKeyword", "ExportKeyword", "ExtendsKeyword", "FalseKeyword", "FinallyKeyword", "ForKeyword", "FunctionKeyword", "IfKeyword", "ImportKeyword", "InKeyword", "InstanceOfKeyword", "NewKeyword", "NullKeyword", "ReturnKeyword", "SuperKeyword", "SwitchKeyword", "ThisKeyword", "ThrowKeyword", "TrueKeyword", "TryKeyword", "TypeOfKeyword", "VarKeyword", "VoidKeyword", "WhileKeyword", "LastReservedWord", "FirstFutureReservedWord", "InterfaceKeyword", "LetKeyword", "PackageKeyword", "PrivateKeyword", "ProtectedKeyword", "PublicKeyword", "StaticKeyword", "LastFutureReservedWord", "FirstContextualKeyword", "AsKeyword", "AnyKeyword", "AsyncKeyword", "AwaitKeyword", "BooleanKeyword", "ConstructorKeyword", "DeclareKeyword", "GetKeyword", "InferKeyword", "IsKeyword", "KeyOfKeyword", "ModuleKeyword", "NamespaceKeyword", "NeverKeyword", "ReadonlyKeyword", "RequireKeyword", "NumberKeyword", "ObjectKeyword", "SetKeyword", "StringKeyword", "SymbolKeyword", "TypeKeyword", "UndefinedKeyword", "UniqueKeyword", "UnknownKeyword", "FromKeyword", "GlobalKeyword", "BigIntKeyword", "LastContextualKeyword", "FirstNode", "ComputedPropertyName",]
