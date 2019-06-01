//@ts-nocheck
// Register a new language
monaco.languages.register({ id: 'astq' });

// Register a tokens provider for the language
monaco.languages.setMonarchTokensProvider('astq', {
  tokenizer: {
    root: [
      //	[/\[[^]]*\]/igm, "square-brackets"],
      [/[\[\]]{1}/igm, "square-brackets"],
      [/@[a-zA-Z0-9]+/, "attribute"],
      [/\'[^\'']+\'/, "literal"],
      [/\"[^\]]+\"/, "literal"],
      [/[0-9\.]+/, "literal"],

      [/\s*[\a-zA-Z0-9_]+\s*\(/, "function"],
      [/[\(\)]/, "function"],

      [/\[[a-zA-Z 0-9:]+\]/, "function"],


      [/&/, "operator"], [/=/, "operator"],
      [/>/, "operator"], [/</, "operator"], [/!/, "operator"],

      [/[\/\.]+\s*[A-Z-a-z0-9]+/, "axis"],
      [/[\/\.\*]+/, "axis"]

    ]
  }
});

// Define a new theme that contains only rules that match this language
monaco.editor.defineTheme('myCoolTheme', {
  base: 'vs',
  inherit: false,
  rules: [
    { token: 'literal', foreground: '808080' },
    { token: 'square-brackets', foreground: 'ff0000' },
    { token: 'attribute', foreground: 'FFA500' },
    { token: 'function', foreground: '008800' },
    { token: 'operator', foreground: '0055aa' },
    { token: 'axis', foreground: '992288', fontStyle: 'bold' },

  ]
});

function typesCompletion(n) { return `\${${n}|${types.join(',')}|}` }
function attributesCompletion(n) { return `@\${${n}|${attributes.join(',')}|}` }
function operatorsCompletion(n) { return `\${${n}|${operators.join(',')}|}` }
function axisCompletion(n) { return `\${${n}|${axis.join(',')}|}` }
function functionsCompletion(n) { return `\${${n}|${functions.join(',')}|}()` }

operators
// Register a completion item provider for the new language
monaco.languages.registerCompletionItemProvider('astq', {
  provideCompletionItems: () => {
    var suggestions = [{
      label: 'attribute',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: attributesCompletion(1),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    }, {
      label: 'type',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: typesCompletion(1),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    }, {
      label: 'function',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: functionsCompletion(1),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet

    },
    {
      label: 'axis',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: axisCompletion(1),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet

    },


    {
      label: 'operator',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: operatorsCompletion(1),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet

    },


    {
      label: 'path',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: `
\${1|${axis.join(',')}|} \${2|*,${types.join(',')}|} [\${3|${functions.join(',')}|}() \${4|${compareOperators.join(',')}|} ${attributesCompletion(5)} ]
`.trim(),
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet

    }
    ];

    return { suggestions: suggestions };
  }
});

monaco.editor.create(document.getElementById("container"), {
  theme: 'myCoolTheme',
  value: getCode(),
  language: 'astq'
});

function getCode() {
  return [
    `
// Foo [
    @sdf=='asdasd' && 
    [..// && [func(@attr) >= 9988 ] ]
]
`.trim()
  ].join('\n');;
}
var axis = ['/', '//', './', './/', '-/', '-//', '+/', '+//', '~/', '~//', '../', '..//', '<//', '>//']

var compareOperators = ["==", "!=", "<=", ">=", "<", ">", "=~", "!~"]

var logicalOperators = ["&&", "\\|\\|"]

var operators = [...logicalOperators, ...compareOperators]

var attributes = ['text', 'name', 'type', 'modifiers', 'expression', 'literalText', 'start', 'end', 'width', 'body', 'leadingComments', 'trailingComments', 'kindPath', 'indexPath']
var functions = ['a', 'b', 'c', 'd']

var types = [
  "FirstToken",  "EndOfFileToken",  "FirstTriviaToken",  "SingleLineCommentTrivia",  "MultiLineCommentTrivia",  "NewLineTrivia",  "WhitespaceTrivia",  "ShebangTrivia",  "LastTriviaToken",  "FirstLiteralToken",  "BigIntLiteral",  "StringLiteral",  "JsxText",  "JsxTextAllWhiteSpaces",  "RegularExpressionLiteral",  "FirstTemplateToken",  "TemplateHead",  "TemplateMiddle",  "LastTemplateToken",  "FirstPunctuation",  "CloseBraceToken",  "OpenParenToken",  "CloseParenToken",  "OpenBracketToken",  "CloseBracketToken",  "DotToken",  "DotDotDotToken",  "SemicolonToken",  "CommaToken",  "FirstBinaryOperator",  "LessThanSlashToken",  "GreaterThanToken",  "LessThanEqualsToken",  "GreaterThanEqualsToken",  "EqualsEqualsToken",  "ExclamationEqualsToken",  "EqualsEqualsEqualsToken",  "ExclamationEqualsEqualsToken",  "EqualsGreaterThanToken",  "PlusToken",  "MinusToken",  "AsteriskToken",  "AsteriskAsteriskToken",  "SlashToken",  "PercentToken",  "PlusPlusToken",  "MinusMinusToken",  "LessThanLessThanToken",  "GreaterThanGreaterThanToken",  "GreaterThanGreaterThanGreaterThanToken",  "AmpersandToken",  "BarToken",  "CaretToken",  "ExclamationToken",  "TildeToken",  "AmpersandAmpersandToken",  "BarBarToken",  "QuestionToken",  "ColonToken",  "AtToken",  "BacktickToken",  "FirstAssignment",  "FirstCompoundAssignment",  "MinusEqualsToken",  "AsteriskEqualsToken",  "AsteriskAsteriskEqualsToken",  "SlashEqualsToken",  "PercentEqualsToken",  "LessThanLessThanEqualsToken",  "GreaterThanGreaterThanEqualsToken",  "GreaterThanGreaterThanGreaterThanEqualsToken",  "AmpersandEqualsToken",  "BarEqualsToken",  "LastBinaryOperator",  "Identifier",  "FirstKeyword",  "CaseKeyword",  "CatchKeyword",  "ClassKeyword",  "ConstKeyword",  "ContinueKeyword",  "DebuggerKeyword",  "DefaultKeyword",  "DeleteKeyword",  "DoKeyword",  "ElseKeyword",  "EnumKeyword",  "ExportKeyword",  "ExtendsKeyword",  "FalseKeyword",  "FinallyKeyword",  "ForKeyword",  "FunctionKeyword",  "IfKeyword",  "ImportKeyword",  "InKeyword",  "InstanceOfKeyword",  "NewKeyword",  "NullKeyword",  "ReturnKeyword",  "SuperKeyword",  "SwitchKeyword",  "ThisKeyword",  "ThrowKeyword",  "TrueKeyword",  "TryKeyword",  "TypeOfKeyword",  "VarKeyword",  "VoidKeyword",  "WhileKeyword",  "LastReservedWord",  "FirstFutureReservedWord",  "InterfaceKeyword",  "LetKeyword",  "PackageKeyword",  "PrivateKeyword",  "ProtectedKeyword",  "PublicKeyword",  "StaticKeyword",  "LastFutureReservedWord",  "FirstContextualKeyword",  "AsKeyword",  "AnyKeyword",  "AsyncKeyword",  "AwaitKeyword",  "BooleanKeyword",  "ConstructorKeyword",  "DeclareKeyword",  "GetKeyword",  "InferKeyword",  "IsKeyword",  "KeyOfKeyword",  "ModuleKeyword",  "NamespaceKeyword",  "NeverKeyword",  "ReadonlyKeyword",  "RequireKeyword",  "NumberKeyword",  "ObjectKeyword",  "SetKeyword",  "StringKeyword",  "SymbolKeyword",  "TypeKeyword",  "UndefinedKeyword",  "UniqueKeyword",  "UnknownKeyword",  "FromKeyword",  "GlobalKeyword",  "BigIntKeyword",  "LastContextualKeyword",  "FirstNode",  "ComputedPropertyName",  "TypeParameter",  "Parameter",  "Decorator",  "PropertySignature",  "PropertyDeclaration",  "MethodSignature",  "MethodDeclaration",  "Constructor",  "GetAccessor",  "SetAccessor",  "CallSignature",  "ConstructSignature",  "IndexSignature",  "FirstTypeNode",  "TypeReference",  "FunctionType",  "ConstructorType",  "TypeQuery",  "TypeLiteral",  "ArrayType",  "TupleType",  "OptionalType",  "RestType",  "UnionType",  "IntersectionType",  "ConditionalType",  "InferType",  "ParenthesizedType",  "ThisType",  "TypeOperator",  "IndexedAccessType",  "MappedType",  "LiteralType",  "LastTypeNode",  "ObjectBindingPattern",  "ArrayBindingPattern",  "BindingElement",  "ArrayLiteralExpression",  "ObjectLiteralExpression",  "PropertyAccessExpression",  "ElementAccessExpression",  "CallExpression",  "NewExpression",  "TaggedTemplateExpression",  "TypeAssertionExpression",  "ParenthesizedExpression",  "FunctionExpression",  "ArrowFunction",  "DeleteExpression",  "TypeOfExpression",  "VoidExpression",  "AwaitExpression",  "PrefixUnaryExpression",  "PostfixUnaryExpression",  "BinaryExpression",  "ConditionalExpression",  "TemplateExpression",  "YieldExpression",  "SpreadElement",  "ClassExpression",  "OmittedExpression",  "ExpressionWithTypeArguments",  "AsExpression",  "NonNullExpression",  "MetaProperty",  "SyntheticExpression",  "TemplateSpan",  "SemicolonClassElement",  "Block",  "VariableStatement",  "EmptyStatement",  "ExpressionStatement",  "IfStatement",  "DoStatement",  "WhileStatement",  "ForStatement",  "ForInStatement",  "ForOfStatement",  "ContinueStatement",  "BreakStatement",  "ReturnStatement",  "WithStatement",  "SwitchStatement",  "LabeledStatement",  "ThrowStatement",  "TryStatement",  "DebuggerStatement",  "VariableDeclaration",  "VariableDeclarationList",  "FunctionDeclaration",  "ClassDeclaration",  "InterfaceDeclaration",  "TypeAliasDeclaration",  "EnumDeclaration",  "ModuleDeclaration",  "ModuleBlock",  "CaseBlock",  "NamespaceExportDeclaration",  "ImportEqualsDeclaration",  "ImportDeclaration","ImportClause","NamespaceImport","NamedImports","ImportSpecifier","ExportAssignment","ExportDeclaration","NamedExports","ExportSpecifier","MissingDeclaration","ExternalModuleReference","JsxElement","JsxSelfClosingElement","JsxOpeningElement","JsxClosingElement","JsxFragment","JsxOpeningFragment","JsxClosingFragment","JsxAttribute","JsxAttributes","JsxSpreadAttribute","JsxExpression","CaseClause","DefaultClause","HeritageClause","CatchClause","PropertyAssignment","ShorthandPropertyAssignment","SpreadAssignment","EnumMember","UnparsedPrologue","UnparsedPrepend","UnparsedText","UnparsedInternalText","UnparsedSyntheticReference","SourceFile","Bundle","UnparsedSource","InputFiles","FirstJSDocNode","JSDocAllType","JSDocUnknownType","JSDocNullableType","JSDocNonNullableType","JSDocOptionalType","JSDocFunctionType","JSDocVariadicType","JSDocComment","JSDocTypeLiteral","JSDocSignature","FirstJSDocTagNode","JSDocAugmentsTag","JSDocClassTag","JSDocCallbackTag","JSDocEnumTag","JSDocParameterTag","JSDocReturnTag","JSDocThisTag","JSDocTypeTag","JSDocTemplateTag","JSDocTypedefTag","LastJSDocTagNode","SyntaxList","NotEmittedStatement","PartiallyEmittedExpression","CommaListExpression","MergeDeclarationMarker","EndOfDeclarationMarker","Count"]