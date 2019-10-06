export interface FormatOptionsMember {
    signature: string
    name?: string
    typeText?: string
    optional?: boolean
    jsDocsText?: string
    markdown?: string
}

export interface FormatOptions {
    name: string,
    properties: FormatOptionsMember[]
}

export const formatOptions: FormatOptions = {
    name: 'formatOptions',
    properties: [
        {
            "name": "verifyErrors",
            "signature": "verifyErrors?: 'all' | 'syntactical' | 'semantical'",
            "typeText": "\"all\" | \"syntactical\" | \"semantical\" | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "_projectManipulationSetted",
            "signature": "_projectManipulationSetted?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "quotePreference",
            "signature": "quotePreference?: Quote",
            "typeText": "\"auto\" | \"double\" | \"single\" | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "trailingSemicolons",
            "signature": "trailingSemicolons?: 'never' | 'always'",
            "typeText": "\"never\" | \"always\" | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "organizeImports",
            "signature": "organizeImports?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "ensureNewLineAtEndOfFile",
            "signature": "ensureNewLineAtEndOfFile?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "file",
            "signature": "file: SourceFile",
            "typeText": "import(\"/Users/sebastiangurin/git/typescript-plugins-of-mine/ts-simple-ast-extra/node_modules/ts-morph/dist-declarations/ts-morph\").SourceFile",
            "optional": false,
            "jsDocsText": ""
        },
        {
            "name": "project",
            "signature": "project: Project",
            "typeText": "import(\"/Users/sebastiangurin/git/typescript-plugins-of-mine/ts-simple-ast-extra/node_modules/ts-morph/dist-declarations/ts-morph\").Project",
            "optional": false,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterCommaDelimiter",
            "signature": "readonly insertSpaceAfterCommaDelimiter?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterSemicolonInForStatements",
            "signature": "readonly insertSpaceAfterSemicolonInForStatements?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceBeforeAndAfterBinaryOperators",
            "signature": "readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterConstructor",
            "signature": "readonly insertSpaceAfterConstructor?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterKeywordsInControlFlowStatements",
            "signature": "readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterFunctionKeywordForAnonymousFunctions",
            "signature": "readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis",
            "signature": "readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets",
            "signature": "readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces",
            "signature": "readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces",
            "signature": "readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces",
            "signature": "readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceAfterTypeAssertion",
            "signature": "readonly insertSpaceAfterTypeAssertion?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceBeforeFunctionParenthesis",
            "signature": "readonly insertSpaceBeforeFunctionParenthesis?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "placeOpenBraceOnNewLineForFunctions",
            "signature": "readonly placeOpenBraceOnNewLineForFunctions?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "placeOpenBraceOnNewLineForControlBlocks",
            "signature": "readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "insertSpaceBeforeTypeAnnotation",
            "signature": "readonly insertSpaceBeforeTypeAnnotation?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "indentMultiLineObjectLiteralBeginningOnBlankLine",
            "signature": "readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "baseIndentSize",
            "signature": "baseIndentSize?: number;",
            "typeText": "number | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "indentSize",
            "signature": "indentSize?: number;",
            "typeText": "number | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "tabSize",
            "signature": "tabSize?: number;",
            "typeText": "number | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "newLineCharacter",
            "signature": "newLineCharacter?: string;",
            "typeText": "string | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "convertTabsToSpaces",
            "signature": "convertTabsToSpaces?: boolean;",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "indentStyle",
            "signature": "indentStyle?: IndentStyle;",
            "typeText": "import(\"/Users/sebastiangurin/git/typescript-plugins-of-mine/ts-simple-ast-extra/node_modules/typescript/lib/typescript\").IndentStyle | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "emptyLinesMax",
            "signature": "emptyLinesMax?: number",
            "typeText": "number | undefined",
            "optional": true,
            "jsDocsText": "Maximum number of continuos empty lines allowed. "
        },
        {
            "name": "emptyLinesTrim",
            "signature": "emptyLinesTrim?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": "Trim lines first in order to assert they are empty."
        },
        {
            "name": "formatJsdocs",
            "signature": "formatJsdocs?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "formatJsdocsFormatBefore",
            "signature": "formatJsdocsFormatBefore?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "formatJsdocsFormatAfter",
            "signature": "formatJsdocsFormatAfter?: boolean",
            "typeText": "boolean | undefined",
            "optional": true,
            "jsDocsText": ""
        },
        {
            "name": "jsdocLineMaxLength",
            "signature": "jsdocLineMaxLength?: number",
            "typeText": "number | undefined",
            "optional": true,
            "jsDocsText": ""
        }
    ]
}
