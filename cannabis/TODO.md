## ISSUES

- [ ] issue trailingComments not working
- [ ] issue: debug() I think it won't work debugging more than once. check!

## Road map

- [ ] define functions separately and document their signatures so we have documentation.
- [ ] getASTNodePath() should cache/memoize
- [ ] async api to execute search/compile so we can clal from browser bit without blocking
- [ ] `implementedByNamed()` and `extendedByNamed()`: the opposite to extendsAnyNamed and implementsAnyNamed : 
- [x] search text in comments : //LineComment [@text =~ ]
- [ ] `hasTypeParameter(type: string, index?: number)` : `//InterfaceDeclaration [ hasTypeParameter('T[]', 1) ]` . The type is compared as string.
- [ ] function isDeclaration()
- [ ] function that filter w glob-like expressions, by default using the type. Could ba also node index, node name, etc. Example: 
`//VariableDeclaration [matchAttributePatter('name', 'src/**/area45/**/*Model.ts*/**/MethodDeclaration/**/IfStatement/VariableDeclaration') == true]` 
meaning get all variable declaration in files matching`src/**/area45/**/*Model.ts*/` and direct children of statement matching `**/MethodDeclaration/**/IfStatement/VariableDeclaration`
- [x]`// ClassDeclaration [implements({IDNode})]`. Example: 
    ```ts
    var touchable = queryOne('//InterfaceDeclaration [@path ~= 'src/touch' && @name=='Touchable]'); 
    var classes = queryAll('//ClassDeclaration [@path~= src/**/*area48/implements({touchable})])', {params: {touchable}})
    ```

- [ ] `returnType(type: string)`: will compare current (function-like) node return type with given type , as string, inferring it if not explicitly declared. `//FunctionDeclaration [ hasReturnType('number[]') ]`. Example: `//MethodDeclaration [ hasReturnType('boolean') ]` will match `method1(n:number){return n>.5  }`.

- [ ] `hasParameter(type: string, index?: number)`: If no index is given, returns true if any parameter of current (function-like) node as given type ( compared as string). If index is given the parameter's type in that index must match the string . Example: `//MethodDeclaration [ hasParameter('number[]', 1) ]` will match `function f(a: string, b: number[])`.

- [ ] `hasParameterList()` : `//MethodDeclaration [ hasParameterList('number[],boolean,Foo<Apple>[]') ]`. The type is compared as string.


## query examples:

- [ ]  real us files matching src/**/*Test.ts that doesn't contain a class implementing (recursively) an the interface import('src/service/login/loginService.ts').LoginService
- [ ] // files in src/** referencing type import('old-library').Obsolete


## Ideas

 * idea  : git integration

```ts
var luisSuarezArea48Functions = queryAll(`//FunctionDeclaration [match(@path, 'src/**/*area48/**/*.ts')==true && git('lastModifiedBy')=='luisSuarez']`)
```
 * https://isomorphic-git.org/docs/en/fs

## attributes and functions: 

research what else we can add as functions or attributes:

possible functions
```ts
isTypeParameteredNode, isAbstractableNode, isAmbientableNode, isArgumentedNode, isAsyncableNode,
isAwaitableNode, isBodiedNode, isBodyableNode, DecoratableNode, ScopedNode, staticableNode,
PropertyNamedNode, OverloadableNode, GeneratorableNode, ModifierableNode, JSDocableNode, ReadonlyableNode,
ExclamationTokenableNode, QuestionTokenableNode, InitializerExpressionableNode, PropertyNamedNode
```


possible attributes:
```ts
 // TODO: body, expression, symbol, type, pos, start, fullStart, fuillText, width, fullWIdth,
 leadingtriviaWidth, trailingTriviaWidth, trailingTriviaEnd, getCombinedModifierFlags, getLastToken,
 childIndex, getIndentationLevel, getChildIndentationLevel, getIndentationText, getChildIndentationText,
 getStartLinePos, getStartLineNumber, getEndLineNumber, isFirstNodeOnLine, getLeadingCommentRanges,
 getTrailingCommentRanges, getScope, getReturnType, isStatic, getTypeArguments, getTypeParameters,
 getProperties, getStaticProperties, getInstanceProperties, getGetAccessors, getSetAccessors, getMethods,
 getStaticMethods, getInstanceMethods, getStaticMembers, getInstanceMembers, getMembers, getBaseTypes,.
 getBaseClass, getDerivedClasses, children, childCount

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
