export const attributeSignatures =[
  {
    "name": "text",
    "signature": "text: string",
    "jsDocsText": "Returns current node's text as in `ts.Node#getText()`. Example: `// VariableDeclaration [ @text!~'2' ]` "
  },
  {
    "name": "name",
    "signature": "name: string",
    "jsDocsText": "Returns current node's name if any. If it doesn't have a name, it returns an empty string.\n\nThere are node kinds that have name, like InterfaceDeclaration, and others that don't, like IfStatement. Examples `// * [ @name=='f' && @modifiers=~'export' ]`"
  },
  {
    "name": "type",
    "signature": "type: string",
    "jsDocsText": "Returns current node's type string representation. If type is not declared it will be inferrer form usage. If type doesn't apply to current node it will return empty string. \n\nExamples: `// VariableDeclaration [ @type=='Date[]']`, `// Parameter [ @type=='boolean' || @type=='number']`"
  },
  {
    "name": "modifiers",
    "signature": "modifiers: string",
    "jsDocsText": "A comma separated modifier names in ` \"export\", \"default\", \"declare\", \"abstract\", \"public\", \"protected\", \"private\", \"readonly\", \"static\", \"async\", \"const\"`. Example: `// PropertyDeclaration [ @modifiers=~'private' || @modifiers=~'protected' ]`"
  },
  {
    "name": "expression",
    "signature": "expression: ASTNode | null",
    "jsDocsText": "Returns a AST Node if the node has an expression, or null other wise. "
  },
  {
    "name": "literalText",
    "signature": "literalText: string",
    "jsDocsText": "Gets the literal text of a literal-like node. Example: `// LiteralString [compareText({forbidden}, @literalText, 'verb:equals,caseSensitive:true']`"
  },
  {
    "name": "start",
    "signature": "start: number",
    "jsDocsText": "Returns the position of current node in its source file."
  },
  {
    "name": "end",
    "signature": "end: number",
    "jsDocsText": "Returns the position of current node's end, in its source file."
  },
  {
    "name": "width",
    "signature": "width: number",
    "jsDocsText": "Returns the amount of characters of current node."
  },
  {
    "name": "body",
    "signature": "body: ASTNode | null",
    "jsDocsText": "Return current node's body node, or null if it doesn't have a body."
  },
  {
    "name": "leadingComments",
    "signature": "leadingComments: string[]",
    "jsDocsText": "Returns the text of comments before this node."
  },
  {
    "name": "trailingComments",
    "signature": "trailingComments: string[]",
    "jsDocsText": "Returns the text of comments after this node."
  },
  {
    "name": "kindPath",
    "signature": "kindPath: string",
    "jsDocsText": "Returns a node kind based path for the node, like `src/services/login/loginService/InterfaceDeclaration/Identifier`. Notice that unlike @indexPath, this doesn't necessarily points to the node."
  },
  {
    "name": "indexPath",
    "signature": "indexPath: string",
    "jsDocsText": "Returns a child-index based path for the node, similar to `src/services/login/loginService/2/1`"
  },
  {
    "name": "namePath",
    "signature": "namePath: string",
    "jsDocsText": "Returns a node-name based path for current node, like `src/services/login/loginService/LoginService/method1/param1`. Notice that unlike @indexPath, this doesn't necessarily points to the node. If a node doesn't have a name, its kind name will be printed in the path instead."
  }
]
