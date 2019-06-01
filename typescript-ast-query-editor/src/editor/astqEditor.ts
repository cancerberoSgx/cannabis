// import * as monaco from 'monaco-editor'


// let editor: monaco.editor.IStandaloneCodeEditor|undefined

// export function getASTQEditor() {
//   if (!editor) {
//     throw new Error('Editor not initialized, installEditor needs to be called first.')
//   }
//   return editor
// }

// export function installEditor(code: string, containerEl: HTMLElement) {
//   if (editor) {
//     return editor
//   }
//   // Register a new language
// monaco.languages.register({ id: 'astq' });

// // Register a tokens provider for the language
// monaco.languages.setMonarchTokensProvider('astq', {
// 	tokenizer: {
// 		root: [
// 		//	[/\[[^]]*\]/igm, "square-brackets"],
// 			[/[\[\]]{1}/igm, "square-brackets"],
// 			[/@[a-zA-Z0-9]+/, "attribute"],
// 			[/\'[^\'']+\'/, "literal"],
// 			[/\"[^\]]+\"/, "literal"],
//             [/[0-9\.]+/, "literal"],

//             [/\s*[\a-zA-Z0-9_]+\s*\(/, "function"],
// 			[/[\(\)]/, "function"],

// 			[/\[[a-zA-Z 0-9:]+\]/, "function"],


// 			[/&/, "operator"],	[/=/, "operator"],
// 	[/>/, "operator"],	[/</, "operator"],	[/!/, "operator"],

// [/[\/\.]+\s*[A-Z-a-z0-9]+/, "axis"],
// 			[/[\/\.\*]+/, "axis"]

// 		]
// 	}
// });

// // Define a new theme that contains only rules that match this language
// monaco.editor.defineTheme('astqLightTheme', {
// 	base: 'vs',
// 	inherit: false,
// 	rules: [
// 		{ token: 'literal', foreground: '808080' },
// 		{ token: 'square-brackets', foreground: 'ff0000' },
// 		{ token: 'attribute', foreground: 'FFA500' },
// 		{ token: 'function', foreground: '008800' },
// 		{ token: 'operator', foreground: '0055aa'  },
// 		{ token: 'axis', foreground: '992288' , fontStyle: 'bold' },
        
//   ], 
//   colors: {}
// });

// // Register a completion item provider for the new language
// monaco.languages.registerCompletionItemProvider('astq', {
// 	provideCompletionItems(model, position, context, token) {
// 		var suggestions = [{
// 			label: 'nodeType',
//       kind: monaco.languages.CompletionItemKind.Text,
//       documentation: 'Each node in the ast belong to a certain kind or type of node. Some kind of nodes are complex, like a class declaration (ClassDeclaration) that contains other kind of nodes inside, such as MethodDeclaration, PropertyDeclaration, etc, and some kind of nodes are simple, like Identifier, ColonToken, etc. TODO TODO TEST TEST',
//       detail: 'Select a TypeScript Node Syntax Kind',
// 			insertText: 'nodeType'
//     }, 
//     // {
// 		// 	label: 'testing',
// 		// 	kind: monaco.languages.CompletionItemKind.Keyword,
//     //   insertText: 'testing(${1:condition})',
//     //   // detail?: '',
// 		// 	insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
// 		// }, {
// 		// 	label: 'ifelse',
// 		// 	kind: monaco.languages.CompletionItemKind.Snippet,
// 		// 	insertText: [
// 		// 		'if (${1:condition}) {',
// 		// 		'\t$0',
// 		// 		'} else {',
// 		// 		'\t',
// 		// 		'}'
// 		// 	].join('\n'),
// 		// 	insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
// 		// 	documentation: 'If-Else Statement'
//     // }
//   ];
//     return { suggestions}
//     // : suggestions, then(list){
//     //   return null as any
//     // },  
//   // }
// }  ,
//   resolveCompletionItem(model , position , item , token ) {
//     return 
//   }

// })

//   return editor
// }

// export function getEditorText() {
//   return editor!.getModel()!.getValue()
// }

// export function setEditorText(s: string) {
//   return editor!.getModel()!.setValue(s)
// }


// }