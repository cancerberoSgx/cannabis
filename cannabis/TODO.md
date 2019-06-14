## ISSUES

- [ ] issue trailingComments not working
- [x] issue: debug() I think it won't work debugging more than once. check!
- [x] there are two functions, includes() and contains() - decide with one and drop the other

## Road map

- [ ] trace/tracer API
- [ ] async api for queryAstShortcuts
- [ ] Onmipresent debug() dont need to be installed - it alls debug(before and after all functions and attributes.)
- [ ] `returnType(type: string)`: will compare current (function-like) node return type with given type , as
  string, inferring it if not explicitly declared. `//FunctionDeclaration [ hasReturnType('number[]') ]`.
  Example: `//MethodDeclaration [ hasReturnType('boolean') ]` will match `method1(n:number){return n>.5  }`.
- [ ] function isDeclaration()
- [ ] `implementedByNamed()` and `extendedByNamed()`: the opposite to extendsAnyNamed and implementsAnyNamed :
- [ ] `hasTypeParameter(type: string, index?: number)` : `//InterfaceDeclaration [ hasTypeParameter('T[]', 1)
  ]` . The type is compared as string.
- [ ] TODO test that getConfig('visitChildrenFirst') really works by queryOne 
- [ ] `hasParameter(type: string, index?: number)`: If no index is given, returns true if any parameter of
  current (function-like) node as given type ( compared as string). If index is given the parameter's type in
  that index must match the string . Example: `//MethodDeclaration [ hasParameter('number[]', 1) ]` will match
  `function f(a: string, b: number[])`.
- [ ] localNames()
- [ ] typeNames() 
- [ ] `hasParameterList()` : `//MethodDeclaration [ hasParameterList('number[],boolean,Foo<Apple>[]') ]`. The
- [x] add cache / memoize costly functoins and attrs, like: findReferences, extendsNamed, implementsNamed,
  @type since these could be ended up called lots of times in a query. In general we expect the Project /
  files to be read only, but just in case we should provide with a setDirty-like API for users makeing
  changes. 
- [x] async api to execute search/compile so we can call from browser bit without blocking
- [x] search text in comments : //LineComment [@text =~ ]
- [x] define functions separately and document their signatures so we have documentation.
- [x] getASTNodePath() should cache/memoize (?)
  type is compared as string.
- [x] function that filter w glob-like expressions, by default using the type. Could ba also node index, node
  name, etc. Example: `//VariableDeclaration [matchAttributePatter('name',
  'src/**/area45/**/*Model.ts*/**/MethodDeclaration/**/IfStatement/VariableDeclaration') == true]` meaning
  get all variable declaration in files matching`src/**/area45/**/*Model.ts*/` and direct children of
  statement matching `**/MethodDeclaration/**/IfStatement/VariableDeclaration`,   `// ClassDeclaration
  [implements({IDNode})]`. Example: ```ts var touchable = queryOne('//InterfaceDeclaration [@path ~=
  'src/touch' && @name=='Touchable]'); var classes = queryAll('//ClassDeclaration [@path~= src/**/*area48/
  implements({touchable})])', {params: {touchable}})
      ```

## query ideas / examples / 

to implement and see how good is the language / syntax

- [ ] given an interface declaration, get all methods and properties, recursively, from types it extends. In
     other words, imagine I have an interface with methods which signatures I want to document in a TXT and I
     need to extract not only its, but its super interfaces too, recursively.  Could be something like: // *
     [(type()=='PropertySignature'||type()=='MethodSignature') && [..// InterfaceDeclaration [@name=='Foo']]]

- [ ]  real us files matching src/**/*Test.ts that doesn't contain a class implementing (recursively) an the
  interface import('src/service/login/loginService.ts').LoginService
- [ ] // files in src/** referencing type import('old-library').Obsolete


## Ideas

 * we could implement adapter for https://github.com/here-be/snapdragon-node  - seems good quality but I don't
   think it has a syntax implemented - only glob/regex - prhaps astq syntax plug those Node implementations is
   a good one.

 * Performance: compile a project into a static AST. 
   * currently we cannot, since we are accessing the ts nodes directly - not ghouth the adapter . (For example
     findReferences- ). But if we don't use those ops and identify them - we could dump the whole ast to an
     object and even use other implementations like asty or snapdragon-node  to query it offline.

 * query on names and types present on the context of some nodes. context
   https://github.com/jonschlinkert/parse-code-context - we couls also use typescript compiler for this.

 <!-- * docs say "function parameters can be any expression, so I shulld be able to flat / map an expression. problem: // InterfaceDeclaration [@name=='Foo'] -->
 * idea  : git integration

```ts
var luisSuarezArea48Functions = queryAll(`//FunctionDeclaration [match(@path, 'src/**/*area48/**/*.ts')==true && git('lastModifiedBy')=='luisSuarez']`)
```
 * https://isomorphic-git.org/docs/en/fs

## attributes and functions: 

research what else we can add as functions or attributes:

possible functions
```ts
Get Implementations

isTypeParameteredNode, isAbstractableNode, isAmbientableNode, isArgumentedNode, isAsyncableNode,
isAwaitableNode, isBodiedNode, isBodyableNode, DecoratableNode, ScopedNode, staticableNode,
PropertyNamedNode, OverloadableNode, GeneratorableNode, ModifierableNode, JSDocableNode, ReadonlyableNode,
ExclamationTokenableNode, QuestionTokenableNode, InitializerExpressionableNode, PropertyNamedNode
 isAmbient():classDeclaration.isAmbient();classDeclaration.hasDeclareKeyword()
```

possible attributes:
```ts
initializer
 // TODO: body, expression, symbol, type, pos, start, fullStart, fuillText, width, fullWIdth,
 leadingtriviaWidth, trailingTriviaWidth, trailingTriviaEnd, getCombinedModifierFlags, getLastToken,
 childIndex, getIndentationLevel, getChildIndentationLevel, getIndentationText, getChildIndentationText,
 getStartLinePos, getStartLineNumber, getEndLineNumber, isFirstNodeOnLine, getLeadingCommentRanges,
 getTrailingCommentRanges, getScope, getReturnType, isStatic, getTypeArguments, getTypeParameters,
 getProperties, getStaticProperties, getInstanceProperties, getGetAccessors, getSetAccessors, getMethods,
 getStaticMethods, getInstanceMethods, getStaticMembers, getInstanceMembers, getMembers, getBaseTypes,.
 getBaseClass, getDerivedClasses, children, childCount

    type FunctionLikeDeclaration = FunctionDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration | FunctionExpression | ArrowFunction;

isKeyword

type VariableLikeDeclaration = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertyAssignment | PropertySignature | JsxAttribute | ShorthandPropertyAssignment | EnumMember | JSDocPropertyTag | JSDocParameterTag;

    type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;

type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;




    getSymbol(): Symbol | undefined;
    getType(): Type;
    containsRange(pos: number, end: number): boolean;
    isInStringAtPos(pos: number): boolean;
    getChildSyntaxList(): SyntaxList | undefined;
    getChildAtPos(pos: number): Node | undefined;
    getDescendantAtPos(pos: number): Node | undefined;
    getDescendantAtStartWithWidth(start: number, width: number): Node | undefined;
    getLastToken(): Node;
    getChildIndex(): number;
```


<!-- // ClassDeclaration [ 
  ./Identifier [

    includes(debug(kindName(parent(parent(findReferences())))), 'HeritageClause')
    
  ]
] -->
<!-- 
// * [ 
  /HeritageClause/ExpressionWithTypeArguments/Identifier [@text=='I2' ||   
    includes(debug(text(../*/../*)), name(..//InterfaceDeclaration))
    
  ]
] -->