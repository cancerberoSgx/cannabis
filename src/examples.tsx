export interface Example {
  query: string;
  description: string;
}
export const examples: Example[] = [
  {
    query: '// *',
    description: 'All nodes'
  },
  {
    query: '// Identifier [../ClassDeclaration] ',
    description: 'Identifiers direct children of a class declaration. Result: Identifier "C"'
  },
  {
    query: '// Identifier [ ../ClassDeclaration || ../MethodDeclaration || ../PropertyDeclaration ] ',
    description: 'Identifiers direct children of a class declaration. Result: Identifier "C" , Identifier "attribute1", Identifier "method1"'
  },
];
