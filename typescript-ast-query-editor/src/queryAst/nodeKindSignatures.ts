export const nodeKindSignature = [
  {
    "name": "Token",
    "signature": "interface Token {\n  kind: TKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Identifier",
    "signature": "interface Identifier {\n  kind: SyntaxKind.Identifier;\n  escapedText: __String;\n  originalKeywordKind?: SyntaxKind;\n  isInJSDocNamespace?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TransientIdentifier",
    "signature": "interface TransientIdentifier {\n  resolvedSymbol: Symbol;\n  kind: SyntaxKind.Identifier;\n  escapedText: __String;\n  originalKeywordKind?: SyntaxKind;\n  isInJSDocNamespace?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "QualifiedName",
    "signature": "interface QualifiedName {\n  kind: SyntaxKind.QualifiedName;\n  left: EntityName;\n  right: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Declaration",
    "signature": "interface Declaration {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamedDeclaration",
    "signature": "interface NamedDeclaration {\n  name?: DeclarationName;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "DeclarationStatement",
    "signature": "interface DeclarationStatement {\n  name?: Identifier | StringLiteral | NumericLiteral;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ComputedPropertyName",
    "signature": "interface ComputedPropertyName {\n  parent: Declaration;\n  kind: SyntaxKind.ComputedPropertyName;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Decorator",
    "signature": "interface Decorator {\n  kind: SyntaxKind.Decorator;\n  parent: NamedDeclaration;\n  expression: LeftHandSideExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeParameterDeclaration",
    "signature": "interface TypeParameterDeclaration {\n  kind: SyntaxKind.TypeParameter;\n  parent: DeclarationWithTypeParameterChildren | InferTypeNode;\n  name: Identifier;\n  constraint?: TypeNode;\n  default?: TypeNode;\n  expression?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SignatureDeclarationBase",
    "signature": "interface SignatureDeclarationBase {\n  kind: SignatureDeclaration[\"kind\"];\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CallSignatureDeclaration",
    "signature": "interface CallSignatureDeclaration {\n  kind: SyntaxKind.CallSignature;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  questionToken?: QuestionToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ConstructSignatureDeclaration",
    "signature": "interface ConstructSignatureDeclaration {\n  kind: SyntaxKind.ConstructSignature;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  questionToken?: QuestionToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "VariableDeclaration",
    "signature": "interface VariableDeclaration {\n  kind: SyntaxKind.VariableDeclaration;\n  parent: VariableDeclarationList | CatchClause;\n  name: BindingName;\n  exclamationToken?: ExclamationToken;\n  type?: TypeNode;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "VariableDeclarationList",
    "signature": "interface VariableDeclarationList {\n  kind: SyntaxKind.VariableDeclarationList;\n  parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;\n  declarations: NodeArray<VariableDeclaration>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ParameterDeclaration",
    "signature": "interface ParameterDeclaration {\n  kind: SyntaxKind.Parameter;\n  parent: SignatureDeclaration;\n  dotDotDotToken?: DotDotDotToken;\n  name: BindingName;\n  questionToken?: QuestionToken;\n  type?: TypeNode;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "BindingElement",
    "signature": "interface BindingElement {\n  kind: SyntaxKind.BindingElement;\n  parent: BindingPattern;\n  propertyName?: PropertyName;\n  dotDotDotToken?: DotDotDotToken;\n  name: BindingName;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertySignature",
    "signature": "interface PropertySignature {\n  kind: SyntaxKind.PropertySignature;\n  name: PropertyName;\n  questionToken?: QuestionToken;\n  type?: TypeNode;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertyDeclaration",
    "signature": "interface PropertyDeclaration {\n  kind: SyntaxKind.PropertyDeclaration;\n  parent: ClassLikeDeclaration;\n  name: PropertyName;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  type?: TypeNode;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ObjectLiteralElement",
    "signature": "interface ObjectLiteralElement {\n  name?: PropertyName;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertyAssignment",
    "signature": "interface PropertyAssignment {\n  parent: ObjectLiteralExpression;\n  kind: SyntaxKind.PropertyAssignment;\n  name: PropertyName;\n  questionToken?: QuestionToken;\n  initializer: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ShorthandPropertyAssignment",
    "signature": "interface ShorthandPropertyAssignment {\n  parent: ObjectLiteralExpression;\n  kind: SyntaxKind.ShorthandPropertyAssignment;\n  name: Identifier;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  equalsToken?: Token<SyntaxKind.EqualsToken>;\n  objectAssignmentInitializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SpreadAssignment",
    "signature": "interface SpreadAssignment {\n  parent: ObjectLiteralExpression;\n  kind: SyntaxKind.SpreadAssignment;\n  expression: Expression;\n  name?: PropertyName;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertyLikeDeclaration",
    "signature": "interface PropertyLikeDeclaration {\n  name: PropertyName;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ObjectBindingPattern",
    "signature": "interface ObjectBindingPattern {\n  kind: SyntaxKind.ObjectBindingPattern;\n  parent: VariableDeclaration | ParameterDeclaration | BindingElement;\n  elements: NodeArray<BindingElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ArrayBindingPattern",
    "signature": "interface ArrayBindingPattern {\n  kind: SyntaxKind.ArrayBindingPattern;\n  parent: VariableDeclaration | ParameterDeclaration | BindingElement;\n  elements: NodeArray<ArrayBindingElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "FunctionLikeDeclarationBase",
    "signature": "interface FunctionLikeDeclarationBase {\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  body?: Block | Expression;\n  kind: SignatureDeclaration[\"kind\"];\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "FunctionDeclaration",
    "signature": "interface FunctionDeclaration {\n  kind: SyntaxKind.FunctionDeclaration;\n  name?: Identifier;\n  body?: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MethodSignature",
    "signature": "interface MethodSignature {\n  kind: SyntaxKind.MethodSignature;\n  parent: ObjectTypeDeclaration;\n  name: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  questionToken?: QuestionToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MethodDeclaration",
    "signature": "interface MethodDeclaration {\n  kind: SyntaxKind.MethodDeclaration;\n  parent: ClassLikeDeclaration | ObjectLiteralExpression;\n  name: PropertyName;\n  body?: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ConstructorDeclaration",
    "signature": "interface ConstructorDeclaration {\n  kind: SyntaxKind.Constructor;\n  parent: ClassLikeDeclaration;\n  body?: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SemicolonClassElement",
    "signature": "interface SemicolonClassElement {\n  kind: SyntaxKind.SemicolonClassElement;\n  parent: ClassLikeDeclaration;\n  name?: PropertyName;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "GetAccessorDeclaration",
    "signature": "interface GetAccessorDeclaration {\n  kind: SyntaxKind.GetAccessor;\n  parent: ClassLikeDeclaration | ObjectLiteralExpression;\n  name: PropertyName;\n  body?: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SetAccessorDeclaration",
    "signature": "interface SetAccessorDeclaration {\n  kind: SyntaxKind.SetAccessor;\n  parent: ClassLikeDeclaration | ObjectLiteralExpression;\n  name: PropertyName;\n  body?: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "IndexSignatureDeclaration",
    "signature": "interface IndexSignatureDeclaration {\n  kind: SyntaxKind.IndexSignature;\n  parent: ObjectTypeDeclaration;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  questionToken?: QuestionToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeNode",
    "signature": "interface TypeNode {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "KeywordTypeNode",
    "signature": "interface KeywordTypeNode {\n  kind: SyntaxKind.AnyKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.NumberKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.ThisKeyword | SyntaxKind.VoidKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.NullKeyword | SyntaxKind.NeverKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportTypeNode",
    "signature": "interface ImportTypeNode {\n  kind: SyntaxKind.ImportType;\n  isTypeOf?: boolean;\n  argument: TypeNode;\n  qualifier?: EntityName;\n  typeArguments?: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ThisTypeNode",
    "signature": "interface ThisTypeNode {\n  kind: SyntaxKind.ThisType;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "FunctionOrConstructorTypeNodeBase",
    "signature": "interface FunctionOrConstructorTypeNodeBase {\n  kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;\n  type: TypeNode;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "FunctionTypeNode",
    "signature": "interface FunctionTypeNode {\n  kind: SyntaxKind.FunctionType;\n  type: TypeNode;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ConstructorTypeNode",
    "signature": "interface ConstructorTypeNode {\n  kind: SyntaxKind.ConstructorType;\n  type: TypeNode;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NodeWithTypeArguments",
    "signature": "interface NodeWithTypeArguments {\n  typeArguments?: NodeArray<TypeNode>;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeReferenceNode",
    "signature": "interface TypeReferenceNode {\n  kind: SyntaxKind.TypeReference;\n  typeName: EntityName;\n  typeArguments?: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypePredicateNode",
    "signature": "interface TypePredicateNode {\n  kind: SyntaxKind.TypePredicate;\n  parent: SignatureDeclaration | JSDocTypeExpression;\n  parameterName: Identifier | ThisTypeNode;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeQueryNode",
    "signature": "interface TypeQueryNode {\n  kind: SyntaxKind.TypeQuery;\n  exprName: EntityName;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeLiteralNode",
    "signature": "interface TypeLiteralNode {\n  kind: SyntaxKind.TypeLiteral;\n  members: NodeArray<TypeElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ArrayTypeNode",
    "signature": "interface ArrayTypeNode {\n  kind: SyntaxKind.ArrayType;\n  elementType: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TupleTypeNode",
    "signature": "interface TupleTypeNode {\n  kind: SyntaxKind.TupleType;\n  elementTypes: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "OptionalTypeNode",
    "signature": "interface OptionalTypeNode {\n  kind: SyntaxKind.OptionalType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "RestTypeNode",
    "signature": "interface RestTypeNode {\n  kind: SyntaxKind.RestType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnionTypeNode",
    "signature": "interface UnionTypeNode {\n  kind: SyntaxKind.UnionType;\n  types: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "IntersectionTypeNode",
    "signature": "interface IntersectionTypeNode {\n  kind: SyntaxKind.IntersectionType;\n  types: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ConditionalTypeNode",
    "signature": "interface ConditionalTypeNode {\n  kind: SyntaxKind.ConditionalType;\n  checkType: TypeNode;\n  extendsType: TypeNode;\n  trueType: TypeNode;\n  falseType: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "InferTypeNode",
    "signature": "interface InferTypeNode {\n  kind: SyntaxKind.InferType;\n  typeParameter: TypeParameterDeclaration;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ParenthesizedTypeNode",
    "signature": "interface ParenthesizedTypeNode {\n  kind: SyntaxKind.ParenthesizedType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeOperatorNode",
    "signature": "interface TypeOperatorNode {\n  kind: SyntaxKind.TypeOperator;\n  operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "IndexedAccessTypeNode",
    "signature": "interface IndexedAccessTypeNode {\n  kind: SyntaxKind.IndexedAccessType;\n  objectType: TypeNode;\n  indexType: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MappedTypeNode",
    "signature": "interface MappedTypeNode {\n  kind: SyntaxKind.MappedType;\n  readonlyToken?: ReadonlyToken | PlusToken | MinusToken;\n  typeParameter: TypeParameterDeclaration;\n  questionToken?: QuestionToken | PlusToken | MinusToken;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "LiteralTypeNode",
    "signature": "interface LiteralTypeNode {\n  kind: SyntaxKind.LiteralType;\n  literal: BooleanLiteral | LiteralExpression | PrefixUnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "StringLiteral",
    "signature": "interface StringLiteral {\n  kind: SyntaxKind.StringLiteral;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Expression",
    "signature": "interface Expression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "OmittedExpression",
    "signature": "interface OmittedExpression {\n  kind: SyntaxKind.OmittedExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PartiallyEmittedExpression",
    "signature": "interface PartiallyEmittedExpression {\n  kind: SyntaxKind.PartiallyEmittedExpression;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnaryExpression",
    "signature": "interface UnaryExpression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UpdateExpression",
    "signature": "interface UpdateExpression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PrefixUnaryExpression",
    "signature": "interface PrefixUnaryExpression {\n  kind: SyntaxKind.PrefixUnaryExpression;\n  operator: PrefixUnaryOperator;\n  operand: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PostfixUnaryExpression",
    "signature": "interface PostfixUnaryExpression {\n  kind: SyntaxKind.PostfixUnaryExpression;\n  operand: LeftHandSideExpression;\n  operator: PostfixUnaryOperator;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "LeftHandSideExpression",
    "signature": "interface LeftHandSideExpression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MemberExpression",
    "signature": "interface MemberExpression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PrimaryExpression",
    "signature": "interface PrimaryExpression {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NullLiteral",
    "signature": "interface NullLiteral {\n  kind: SyntaxKind.NullKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "BooleanLiteral",
    "signature": "interface BooleanLiteral {\n  kind: SyntaxKind.TrueKeyword | SyntaxKind.FalseKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ThisExpression",
    "signature": "interface ThisExpression {\n  kind: SyntaxKind.ThisKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SuperExpression",
    "signature": "interface SuperExpression {\n  kind: SyntaxKind.SuperKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportExpression",
    "signature": "interface ImportExpression {\n  kind: SyntaxKind.ImportKeyword;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "DeleteExpression",
    "signature": "interface DeleteExpression {\n  kind: SyntaxKind.DeleteExpression;\n  expression: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeOfExpression",
    "signature": "interface TypeOfExpression {\n  kind: SyntaxKind.TypeOfExpression;\n  expression: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "VoidExpression",
    "signature": "interface VoidExpression {\n  kind: SyntaxKind.VoidExpression;\n  expression: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "AwaitExpression",
    "signature": "interface AwaitExpression {\n  kind: SyntaxKind.AwaitExpression;\n  expression: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "YieldExpression",
    "signature": "interface YieldExpression {\n  kind: SyntaxKind.YieldExpression;\n  asteriskToken?: AsteriskToken;\n  expression?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SyntheticExpression",
    "signature": "interface SyntheticExpression {\n  kind: SyntaxKind.SyntheticExpression;\n  isSpread: boolean;\n  type: Type;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "BinaryExpression",
    "signature": "interface BinaryExpression {\n  kind: SyntaxKind.BinaryExpression;\n  left: Expression;\n  operatorToken: BinaryOperatorToken;\n  right: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "AssignmentExpression",
    "signature": "interface AssignmentExpression {\n  left: LeftHandSideExpression;\n  operatorToken: TOperator;\n  kind: SyntaxKind.BinaryExpression;\n  right: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ObjectDestructuringAssignment",
    "signature": "interface ObjectDestructuringAssignment {\n  left: ObjectLiteralExpression;\n  operatorToken: TOperator;\n  kind: SyntaxKind.BinaryExpression;\n  right: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ArrayDestructuringAssignment",
    "signature": "interface ArrayDestructuringAssignment {\n  left: ArrayLiteralExpression;\n  operatorToken: TOperator;\n  kind: SyntaxKind.BinaryExpression;\n  right: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ConditionalExpression",
    "signature": "interface ConditionalExpression {\n  kind: SyntaxKind.ConditionalExpression;\n  condition: Expression;\n  questionToken: QuestionToken;\n  whenTrue: Expression;\n  colonToken: ColonToken;\n  whenFalse: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "FunctionExpression",
    "signature": "interface FunctionExpression {\n  kind: SyntaxKind.FunctionExpression;\n  name?: Identifier;\n  body: FunctionBody;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n}"
  },
  {
    "name": "ArrowFunction",
    "signature": "interface ArrowFunction {\n  kind: SyntaxKind.ArrowFunction;\n  equalsGreaterThanToken: EqualsGreaterThanToken;\n  body: ConciseBody;\n  name: never;\n  asteriskToken?: AsteriskToken;\n  questionToken?: QuestionToken;\n  exclamationToken?: ExclamationToken;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n}"
  },
  {
    "name": "LiteralLikeNode",
    "signature": "interface LiteralLikeNode {\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "LiteralExpression",
    "signature": "interface LiteralExpression {\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "RegularExpressionLiteral",
    "signature": "interface RegularExpressionLiteral {\n  kind: SyntaxKind.RegularExpressionLiteral;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NoSubstitutionTemplateLiteral",
    "signature": "interface NoSubstitutionTemplateLiteral {\n  kind: SyntaxKind.NoSubstitutionTemplateLiteral;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NumericLiteral",
    "signature": "interface NumericLiteral {\n  kind: SyntaxKind.NumericLiteral;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "BigIntLiteral",
    "signature": "interface BigIntLiteral {\n  kind: SyntaxKind.BigIntLiteral;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TemplateHead",
    "signature": "interface TemplateHead {\n  kind: SyntaxKind.TemplateHead;\n  parent: TemplateExpression;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TemplateMiddle",
    "signature": "interface TemplateMiddle {\n  kind: SyntaxKind.TemplateMiddle;\n  parent: TemplateSpan;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TemplateTail",
    "signature": "interface TemplateTail {\n  kind: SyntaxKind.TemplateTail;\n  parent: TemplateSpan;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TemplateExpression",
    "signature": "interface TemplateExpression {\n  kind: SyntaxKind.TemplateExpression;\n  head: TemplateHead;\n  templateSpans: NodeArray<TemplateSpan>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TemplateSpan",
    "signature": "interface TemplateSpan {\n  kind: SyntaxKind.TemplateSpan;\n  parent: TemplateExpression;\n  expression: Expression;\n  literal: TemplateMiddle | TemplateTail;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ParenthesizedExpression",
    "signature": "interface ParenthesizedExpression {\n  kind: SyntaxKind.ParenthesizedExpression;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ArrayLiteralExpression",
    "signature": "interface ArrayLiteralExpression {\n  kind: SyntaxKind.ArrayLiteralExpression;\n  elements: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SpreadElement",
    "signature": "interface SpreadElement {\n  kind: SyntaxKind.SpreadElement;\n  parent: ArrayLiteralExpression | CallExpression | NewExpression;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ObjectLiteralExpressionBase",
    "signature": "interface ObjectLiteralExpressionBase {\n  properties: NodeArray<T>;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ObjectLiteralExpression",
    "signature": "interface ObjectLiteralExpression {\n  kind: SyntaxKind.ObjectLiteralExpression;\n  properties: NodeArray<T>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertyAccessExpression",
    "signature": "interface PropertyAccessExpression {\n  kind: SyntaxKind.PropertyAccessExpression;\n  expression: LeftHandSideExpression;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SuperPropertyAccessExpression",
    "signature": "interface SuperPropertyAccessExpression {\n  expression: SuperExpression;\n  kind: SyntaxKind.PropertyAccessExpression;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "PropertyAccessEntityNameExpression",
    "signature": "interface PropertyAccessEntityNameExpression {\n  expression: EntityNameExpression;\n  kind: SyntaxKind.PropertyAccessExpression;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ElementAccessExpression",
    "signature": "interface ElementAccessExpression {\n  kind: SyntaxKind.ElementAccessExpression;\n  expression: LeftHandSideExpression;\n  argumentExpression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SuperElementAccessExpression",
    "signature": "interface SuperElementAccessExpression {\n  expression: SuperExpression;\n  kind: SyntaxKind.ElementAccessExpression;\n  argumentExpression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CallExpression",
    "signature": "interface CallExpression {\n  kind: SyntaxKind.CallExpression;\n  expression: LeftHandSideExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  arguments: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SuperCall",
    "signature": "interface SuperCall {\n  expression: SuperExpression;\n  kind: SyntaxKind.CallExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  arguments: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportCall",
    "signature": "interface ImportCall {\n  expression: ImportExpression;\n  kind: SyntaxKind.CallExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  arguments: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExpressionWithTypeArguments",
    "signature": "interface ExpressionWithTypeArguments {\n  kind: SyntaxKind.ExpressionWithTypeArguments;\n  parent: HeritageClause | JSDocAugmentsTag;\n  expression: LeftHandSideExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NewExpression",
    "signature": "interface NewExpression {\n  kind: SyntaxKind.NewExpression;\n  expression: LeftHandSideExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  arguments?: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TaggedTemplateExpression",
    "signature": "interface TaggedTemplateExpression {\n  kind: SyntaxKind.TaggedTemplateExpression;\n  tag: LeftHandSideExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  template: TemplateLiteral;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "AsExpression",
    "signature": "interface AsExpression {\n  kind: SyntaxKind.AsExpression;\n  expression: Expression;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeAssertion",
    "signature": "interface TypeAssertion {\n  kind: SyntaxKind.TypeAssertionExpression;\n  type: TypeNode;\n  expression: UnaryExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NonNullExpression",
    "signature": "interface NonNullExpression {\n  kind: SyntaxKind.NonNullExpression;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MetaProperty",
    "signature": "interface MetaProperty {\n  kind: SyntaxKind.MetaProperty;\n  keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxElement",
    "signature": "interface JsxElement {\n  kind: SyntaxKind.JsxElement;\n  openingElement: JsxOpeningElement;\n  children: NodeArray<JsxChild>;\n  closingElement: JsxClosingElement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxTagNamePropertyAccess",
    "signature": "interface JsxTagNamePropertyAccess {\n  expression: JsxTagNameExpression;\n  kind: SyntaxKind.PropertyAccessExpression;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxAttributes",
    "signature": "interface JsxAttributes {\n  parent: JsxOpeningLikeElement;\n  properties: NodeArray<T>;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxOpeningElement",
    "signature": "interface JsxOpeningElement {\n  kind: SyntaxKind.JsxOpeningElement;\n  parent: JsxElement;\n  tagName: JsxTagNameExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  attributes: JsxAttributes;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxSelfClosingElement",
    "signature": "interface JsxSelfClosingElement {\n  kind: SyntaxKind.JsxSelfClosingElement;\n  tagName: JsxTagNameExpression;\n  typeArguments?: NodeArray<TypeNode>;\n  attributes: JsxAttributes;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxFragment",
    "signature": "interface JsxFragment {\n  kind: SyntaxKind.JsxFragment;\n  openingFragment: JsxOpeningFragment;\n  children: NodeArray<JsxChild>;\n  closingFragment: JsxClosingFragment;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxOpeningFragment",
    "signature": "interface JsxOpeningFragment {\n  kind: SyntaxKind.JsxOpeningFragment;\n  parent: JsxFragment;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxClosingFragment",
    "signature": "interface JsxClosingFragment {\n  kind: SyntaxKind.JsxClosingFragment;\n  parent: JsxFragment;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxAttribute",
    "signature": "interface JsxAttribute {\n  kind: SyntaxKind.JsxAttribute;\n  parent: JsxAttributes;\n  name: Identifier;\n  initializer?: StringLiteral | JsxExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxSpreadAttribute",
    "signature": "interface JsxSpreadAttribute {\n  kind: SyntaxKind.JsxSpreadAttribute;\n  parent: JsxAttributes;\n  expression: Expression;\n  name?: PropertyName;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxClosingElement",
    "signature": "interface JsxClosingElement {\n  kind: SyntaxKind.JsxClosingElement;\n  parent: JsxElement;\n  tagName: JsxTagNameExpression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxExpression",
    "signature": "interface JsxExpression {\n  kind: SyntaxKind.JsxExpression;\n  parent: JsxElement | JsxAttributeLike;\n  dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;\n  expression?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsxText",
    "signature": "interface JsxText {\n  kind: SyntaxKind.JsxText;\n  containsOnlyTriviaWhiteSpaces: boolean;\n  parent: JsxElement;\n  text: string;\n  isUnterminated?: boolean;\n  hasExtendedUnicodeEscape?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Statement",
    "signature": "interface Statement {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NotEmittedStatement",
    "signature": "interface NotEmittedStatement {\n  kind: SyntaxKind.NotEmittedStatement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CommaListExpression",
    "signature": "interface CommaListExpression {\n  kind: SyntaxKind.CommaListExpression;\n  elements: NodeArray<Expression>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "EmptyStatement",
    "signature": "interface EmptyStatement {\n  kind: SyntaxKind.EmptyStatement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "DebuggerStatement",
    "signature": "interface DebuggerStatement {\n  kind: SyntaxKind.DebuggerStatement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "MissingDeclaration",
    "signature": "interface MissingDeclaration {\n  kind: SyntaxKind.MissingDeclaration;\n  name?: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Block",
    "signature": "interface Block {\n  kind: SyntaxKind.Block;\n  statements: NodeArray<Statement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "VariableStatement",
    "signature": "interface VariableStatement {\n  kind: SyntaxKind.VariableStatement;\n  declarationList: VariableDeclarationList;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExpressionStatement",
    "signature": "interface ExpressionStatement {\n  kind: SyntaxKind.ExpressionStatement;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "IfStatement",
    "signature": "interface IfStatement {\n  kind: SyntaxKind.IfStatement;\n  expression: Expression;\n  thenStatement: Statement;\n  elseStatement?: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "IterationStatement",
    "signature": "interface IterationStatement {\n  statement: Statement;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "DoStatement",
    "signature": "interface DoStatement {\n  kind: SyntaxKind.DoStatement;\n  expression: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "WhileStatement",
    "signature": "interface WhileStatement {\n  kind: SyntaxKind.WhileStatement;\n  expression: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ForStatement",
    "signature": "interface ForStatement {\n  kind: SyntaxKind.ForStatement;\n  initializer?: ForInitializer;\n  condition?: Expression;\n  incrementor?: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ForInStatement",
    "signature": "interface ForInStatement {\n  kind: SyntaxKind.ForInStatement;\n  initializer: ForInitializer;\n  expression: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ForOfStatement",
    "signature": "interface ForOfStatement {\n  kind: SyntaxKind.ForOfStatement;\n  awaitModifier?: AwaitKeywordToken;\n  initializer: ForInitializer;\n  expression: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "BreakStatement",
    "signature": "interface BreakStatement {\n  kind: SyntaxKind.BreakStatement;\n  label?: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ContinueStatement",
    "signature": "interface ContinueStatement {\n  kind: SyntaxKind.ContinueStatement;\n  label?: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ReturnStatement",
    "signature": "interface ReturnStatement {\n  kind: SyntaxKind.ReturnStatement;\n  expression?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "WithStatement",
    "signature": "interface WithStatement {\n  kind: SyntaxKind.WithStatement;\n  expression: Expression;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SwitchStatement",
    "signature": "interface SwitchStatement {\n  kind: SyntaxKind.SwitchStatement;\n  expression: Expression;\n  caseBlock: CaseBlock;\n  possiblyExhaustive?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CaseBlock",
    "signature": "interface CaseBlock {\n  kind: SyntaxKind.CaseBlock;\n  parent: SwitchStatement;\n  clauses: NodeArray<CaseOrDefaultClause>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CaseClause",
    "signature": "interface CaseClause {\n  kind: SyntaxKind.CaseClause;\n  parent: CaseBlock;\n  expression: Expression;\n  statements: NodeArray<Statement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "DefaultClause",
    "signature": "interface DefaultClause {\n  kind: SyntaxKind.DefaultClause;\n  parent: CaseBlock;\n  statements: NodeArray<Statement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "LabeledStatement",
    "signature": "interface LabeledStatement {\n  kind: SyntaxKind.LabeledStatement;\n  label: Identifier;\n  statement: Statement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ThrowStatement",
    "signature": "interface ThrowStatement {\n  kind: SyntaxKind.ThrowStatement;\n  expression?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TryStatement",
    "signature": "interface TryStatement {\n  kind: SyntaxKind.TryStatement;\n  tryBlock: Block;\n  catchClause?: CatchClause;\n  finallyBlock?: Block;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "CatchClause",
    "signature": "interface CatchClause {\n  kind: SyntaxKind.CatchClause;\n  parent: TryStatement;\n  variableDeclaration?: VariableDeclaration;\n  block: Block;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ClassLikeDeclarationBase",
    "signature": "interface ClassLikeDeclarationBase {\n  kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression;\n  name?: Identifier;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  heritageClauses?: NodeArray<HeritageClause>;\n  members: NodeArray<ClassElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ClassDeclaration",
    "signature": "interface ClassDeclaration {\n  kind: SyntaxKind.ClassDeclaration;\n  name?: Identifier;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  heritageClauses?: NodeArray<HeritageClause>;\n  members: NodeArray<ClassElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ClassExpression",
    "signature": "interface ClassExpression {\n  kind: SyntaxKind.ClassExpression;\n  name?: Identifier;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  heritageClauses?: NodeArray<HeritageClause>;\n  members: NodeArray<ClassElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ClassElement",
    "signature": "interface ClassElement {\n  name?: PropertyName;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeElement",
    "signature": "interface TypeElement {\n  name?: PropertyName;\n  questionToken?: QuestionToken;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "InterfaceDeclaration",
    "signature": "interface InterfaceDeclaration {\n  kind: SyntaxKind.InterfaceDeclaration;\n  name: Identifier;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  heritageClauses?: NodeArray<HeritageClause>;\n  members: NodeArray<TypeElement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "HeritageClause",
    "signature": "interface HeritageClause {\n  kind: SyntaxKind.HeritageClause;\n  parent: InterfaceDeclaration | ClassLikeDeclaration;\n  token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;\n  types: NodeArray<ExpressionWithTypeArguments>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TypeAliasDeclaration",
    "signature": "interface TypeAliasDeclaration {\n  kind: SyntaxKind.TypeAliasDeclaration;\n  name: Identifier;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "EnumMember",
    "signature": "interface EnumMember {\n  kind: SyntaxKind.EnumMember;\n  parent: EnumDeclaration;\n  name: PropertyName;\n  initializer?: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "EnumDeclaration",
    "signature": "interface EnumDeclaration {\n  kind: SyntaxKind.EnumDeclaration;\n  name: Identifier;\n  members: NodeArray<EnumMember>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ModuleDeclaration",
    "signature": "interface ModuleDeclaration {\n  kind: SyntaxKind.ModuleDeclaration;\n  parent: ModuleBody | SourceFile;\n  name: ModuleName;\n  body?: ModuleBody | JSDocNamespaceDeclaration;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamespaceDeclaration",
    "signature": "interface NamespaceDeclaration {\n  name: Identifier;\n  body: NamespaceBody;\n  kind: SyntaxKind.ModuleDeclaration;\n  parent: ModuleBody | SourceFile;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocNamespaceDeclaration",
    "signature": "interface JSDocNamespaceDeclaration {\n  name: Identifier;\n  body?: JSDocNamespaceBody;\n  kind: SyntaxKind.ModuleDeclaration;\n  parent: ModuleBody | SourceFile;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ModuleBlock",
    "signature": "interface ModuleBlock {\n  kind: SyntaxKind.ModuleBlock;\n  parent: ModuleDeclaration;\n  statements: NodeArray<Statement>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportEqualsDeclaration",
    "signature": "interface ImportEqualsDeclaration {\n  kind: SyntaxKind.ImportEqualsDeclaration;\n  parent: SourceFile | ModuleBlock;\n  name: Identifier;\n  moduleReference: ModuleReference;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExternalModuleReference",
    "signature": "interface ExternalModuleReference {\n  kind: SyntaxKind.ExternalModuleReference;\n  parent: ImportEqualsDeclaration;\n  expression: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportDeclaration",
    "signature": "interface ImportDeclaration {\n  kind: SyntaxKind.ImportDeclaration;\n  parent: SourceFile | ModuleBlock;\n  importClause?: ImportClause;\n  moduleSpecifier: Expression;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportClause",
    "signature": "interface ImportClause {\n  kind: SyntaxKind.ImportClause;\n  parent: ImportDeclaration;\n  name?: Identifier;\n  namedBindings?: NamedImportBindings;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamespaceImport",
    "signature": "interface NamespaceImport {\n  kind: SyntaxKind.NamespaceImport;\n  parent: ImportClause;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamespaceExportDeclaration",
    "signature": "interface NamespaceExportDeclaration {\n  kind: SyntaxKind.NamespaceExportDeclaration;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExportDeclaration",
    "signature": "interface ExportDeclaration {\n  kind: SyntaxKind.ExportDeclaration;\n  parent: SourceFile | ModuleBlock;\n  exportClause?: NamedExports;\n  moduleSpecifier?: Expression;\n  name?: Identifier | StringLiteral | NumericLiteral;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamedImports",
    "signature": "interface NamedImports {\n  kind: SyntaxKind.NamedImports;\n  parent: ImportClause;\n  elements: NodeArray<ImportSpecifier>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "NamedExports",
    "signature": "interface NamedExports {\n  kind: SyntaxKind.NamedExports;\n  parent: ExportDeclaration;\n  elements: NodeArray<ExportSpecifier>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ImportSpecifier",
    "signature": "interface ImportSpecifier {\n  kind: SyntaxKind.ImportSpecifier;\n  parent: NamedImports;\n  propertyName?: Identifier;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExportSpecifier",
    "signature": "interface ExportSpecifier {\n  kind: SyntaxKind.ExportSpecifier;\n  parent: NamedExports;\n  propertyName?: Identifier;\n  name: Identifier;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "ExportAssignment",
    "signature": "interface ExportAssignment {\n  kind: SyntaxKind.ExportAssignment;\n  parent: SourceFile;\n  isExportEquals?: boolean;\n  expression: Expression;\n  name?: Identifier | StringLiteral | NumericLiteral;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTypeExpression",
    "signature": "interface JSDocTypeExpression {\n  kind: SyntaxKind.JSDocTypeExpression;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocType",
    "signature": "interface JSDocType {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocAllType",
    "signature": "interface JSDocAllType {\n  kind: SyntaxKind.JSDocAllType;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocUnknownType",
    "signature": "interface JSDocUnknownType {\n  kind: SyntaxKind.JSDocUnknownType;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocNonNullableType",
    "signature": "interface JSDocNonNullableType {\n  kind: SyntaxKind.JSDocNonNullableType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocNullableType",
    "signature": "interface JSDocNullableType {\n  kind: SyntaxKind.JSDocNullableType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocOptionalType",
    "signature": "interface JSDocOptionalType {\n  kind: SyntaxKind.JSDocOptionalType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocFunctionType",
    "signature": "interface JSDocFunctionType {\n  kind: SyntaxKind.JSDocFunctionType;\n  name?: PropertyName;\n  typeParameters?: NodeArray<TypeParameterDeclaration>;\n  parameters: NodeArray<ParameterDeclaration>;\n  type?: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocVariadicType",
    "signature": "interface JSDocVariadicType {\n  kind: SyntaxKind.JSDocVariadicType;\n  type: TypeNode;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDoc",
    "signature": "interface JSDoc {\n  kind: SyntaxKind.JSDocComment;\n  parent: HasJSDoc;\n  tags?: NodeArray<JSDocTag>;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTag",
    "signature": "interface JSDocTag {\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocUnknownTag",
    "signature": "interface JSDocUnknownTag {\n  kind: SyntaxKind.JSDocTag;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocAugmentsTag",
    "signature": "interface JSDocAugmentsTag {\n  kind: SyntaxKind.JSDocAugmentsTag;\n  class: ExpressionWithTypeArguments & {\n            expression: Identifier | PropertyAccessEntityNameExpression;\n        };\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocClassTag",
    "signature": "interface JSDocClassTag {\n  kind: SyntaxKind.JSDocClassTag;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocEnumTag",
    "signature": "interface JSDocEnumTag {\n  kind: SyntaxKind.JSDocEnumTag;\n  typeExpression?: JSDocTypeExpression;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocThisTag",
    "signature": "interface JSDocThisTag {\n  kind: SyntaxKind.JSDocThisTag;\n  typeExpression?: JSDocTypeExpression;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTemplateTag",
    "signature": "interface JSDocTemplateTag {\n  kind: SyntaxKind.JSDocTemplateTag;\n  constraint: JSDocTypeExpression | undefined;\n  typeParameters: NodeArray<TypeParameterDeclaration>;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocReturnTag",
    "signature": "interface JSDocReturnTag {\n  kind: SyntaxKind.JSDocReturnTag;\n  typeExpression?: JSDocTypeExpression;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTypeTag",
    "signature": "interface JSDocTypeTag {\n  kind: SyntaxKind.JSDocTypeTag;\n  typeExpression: JSDocTypeExpression;\n  parent: JSDoc | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTypedefTag",
    "signature": "interface JSDocTypedefTag {\n  parent: JSDoc;\n  kind: SyntaxKind.JSDocTypedefTag;\n  fullName?: JSDocNamespaceDeclaration | Identifier;\n  name?: Identifier;\n  typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocCallbackTag",
    "signature": "interface JSDocCallbackTag {\n  parent: JSDoc;\n  kind: SyntaxKind.JSDocCallbackTag;\n  fullName?: JSDocNamespaceDeclaration | Identifier;\n  name?: Identifier;\n  typeExpression: JSDocSignature;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocSignature",
    "signature": "interface JSDocSignature {\n  kind: SyntaxKind.JSDocSignature;\n  typeParameters?: ReadonlyArray<JSDocTemplateTag>;\n  parameters: ReadonlyArray<JSDocParameterTag>;\n  type: JSDocReturnTag | undefined;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocPropertyLikeTag",
    "signature": "interface JSDocPropertyLikeTag {\n  parent: JSDoc;\n  name: EntityName;\n  typeExpression?: JSDocTypeExpression;\n  isNameFirst: boolean;\n  isBracketed: boolean;\n  tagName: Identifier;\n  comment?: string;\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocPropertyTag",
    "signature": "interface JSDocPropertyTag {\n  kind: SyntaxKind.JSDocPropertyTag;\n  parent: JSDoc;\n  name: EntityName;\n  typeExpression?: JSDocTypeExpression;\n  isNameFirst: boolean;\n  isBracketed: boolean;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocParameterTag",
    "signature": "interface JSDocParameterTag {\n  kind: SyntaxKind.JSDocParameterTag;\n  parent: JSDoc;\n  name: EntityName;\n  typeExpression?: JSDocTypeExpression;\n  isNameFirst: boolean;\n  isBracketed: boolean;\n  tagName: Identifier;\n  comment?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JSDocTypeLiteral",
    "signature": "interface JSDocTypeLiteral {\n  kind: SyntaxKind.JSDocTypeLiteral;\n  jsDocPropertyTags?: ReadonlyArray<JSDocPropertyLikeTag>;\n  isArrayType?: boolean;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SourceFile",
    "signature": "interface SourceFile {\n  kind: SyntaxKind.SourceFile;\n  statements: NodeArray<Statement>;\n  endOfFileToken: Token<SyntaxKind.EndOfFileToken>;\n  fileName: string;\n  text: string;\n  amdDependencies: ReadonlyArray<AmdDependency>;\n  moduleName?: string;\n  referencedFiles: ReadonlyArray<FileReference>;\n  typeReferenceDirectives: ReadonlyArray<FileReference>;\n  libReferenceDirectives: ReadonlyArray<FileReference>;\n  languageVariant: LanguageVariant;\n  isDeclarationFile: boolean;\n  hasNoDefaultLib: boolean;\n  languageVersion: ScriptTarget;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "Bundle",
    "signature": "interface Bundle {\n  kind: SyntaxKind.Bundle;\n  prepends: ReadonlyArray<InputFiles | UnparsedSource>;\n  sourceFiles: ReadonlyArray<SourceFile>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "InputFiles",
    "signature": "interface InputFiles {\n  kind: SyntaxKind.InputFiles;\n  javascriptPath?: string;\n  javascriptText: string;\n  javascriptMapPath?: string;\n  javascriptMapText?: string;\n  declarationPath?: string;\n  declarationText: string;\n  declarationMapPath?: string;\n  declarationMapText?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedSource",
    "signature": "interface UnparsedSource {\n  kind: SyntaxKind.UnparsedSource;\n  fileName: string;\n  text: string;\n  prologues: ReadonlyArray<UnparsedPrologue>;\n  helpers: ReadonlyArray<UnscopedEmitHelper> | undefined;\n  referencedFiles: ReadonlyArray<FileReference>;\n  typeReferenceDirectives: ReadonlyArray<string> | undefined;\n  libReferenceDirectives: ReadonlyArray<FileReference>;\n  hasNoDefaultLib?: boolean;\n  sourceMapPath?: string;\n  sourceMapText?: string;\n  syntheticReferences?: ReadonlyArray<UnparsedSyntheticReference>;\n  texts: ReadonlyArray<UnparsedSourceText>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedSection",
    "signature": "interface UnparsedSection {\n  kind: SyntaxKind;\n  data?: string;\n  parent: UnparsedSource;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedPrologue",
    "signature": "interface UnparsedPrologue {\n  kind: SyntaxKind.UnparsedPrologue;\n  data: string;\n  parent: UnparsedSource;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedPrepend",
    "signature": "interface UnparsedPrepend {\n  kind: SyntaxKind.UnparsedPrepend;\n  data: string;\n  parent: UnparsedSource;\n  texts: ReadonlyArray<UnparsedTextLike>;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedTextLike",
    "signature": "interface UnparsedTextLike {\n  kind: SyntaxKind.UnparsedText | SyntaxKind.UnparsedInternalText;\n  parent: UnparsedSource;\n  data?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "UnparsedSyntheticReference",
    "signature": "interface UnparsedSyntheticReference {\n  kind: SyntaxKind.UnparsedSyntheticReference;\n  parent: UnparsedSource;\n  data?: string;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsonSourceFile",
    "signature": "interface JsonSourceFile {\n  statements: NodeArray<JsonObjectExpressionStatement>;\n  kind: SyntaxKind.SourceFile;\n  endOfFileToken: Token<SyntaxKind.EndOfFileToken>;\n  fileName: string;\n  text: string;\n  amdDependencies: ReadonlyArray<AmdDependency>;\n  moduleName?: string;\n  referencedFiles: ReadonlyArray<FileReference>;\n  typeReferenceDirectives: ReadonlyArray<FileReference>;\n  libReferenceDirectives: ReadonlyArray<FileReference>;\n  languageVariant: LanguageVariant;\n  isDeclarationFile: boolean;\n  hasNoDefaultLib: boolean;\n  languageVersion: ScriptTarget;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "TsConfigSourceFile",
    "signature": "interface TsConfigSourceFile {\n  extendedSourceFiles?: string[];\n  statements: NodeArray<JsonObjectExpressionStatement>;\n  kind: SyntaxKind.SourceFile;\n  endOfFileToken: Token<SyntaxKind.EndOfFileToken>;\n  fileName: string;\n  text: string;\n  amdDependencies: ReadonlyArray<AmdDependency>;\n  moduleName?: string;\n  referencedFiles: ReadonlyArray<FileReference>;\n  typeReferenceDirectives: ReadonlyArray<FileReference>;\n  libReferenceDirectives: ReadonlyArray<FileReference>;\n  languageVariant: LanguageVariant;\n  isDeclarationFile: boolean;\n  hasNoDefaultLib: boolean;\n  languageVersion: ScriptTarget;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsonMinusNumericLiteral",
    "signature": "interface JsonMinusNumericLiteral {\n  kind: SyntaxKind.PrefixUnaryExpression;\n  operator: SyntaxKind.MinusToken;\n  operand: NumericLiteral;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "JsonObjectExpressionStatement",
    "signature": "interface JsonObjectExpressionStatement {\n  expression: ObjectLiteralExpression | ArrayLiteralExpression | JsonMinusNumericLiteral | NumericLiteral | StringLiteral | BooleanLiteral | NullLiteral;\n  kind: SyntaxKind.ExpressionStatement;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  },
  {
    "name": "SyntaxList",
    "signature": "interface SyntaxList {\n  kind: SyntaxKind;\n  flags: NodeFlags;\n  decorators?: NodeArray<Decorator>;\n  modifiers?: ModifiersArray;\n  parent: Node;\n  pos: number;\n  end: number;\n}"
  }
]