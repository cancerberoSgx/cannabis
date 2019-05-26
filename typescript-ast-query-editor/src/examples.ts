export interface Example {
  query: string;
  name: string
  description: string;
}
export const examples: Example[] = [
  {
    name: 'All nodes',
    query: '// *',
    description: 'All nodes'
  },
  {
    name: 'Class identifier',
    query: '// Identifier [../ClassDeclaration] ',
    description: 'Identifiers direct children of a class declaration'
  },
  {
    name: 'Methods and properties identifiers',
    query: '// Identifier [ ../MethodDeclaration || ../PropertyDeclaration ] ',
    description: 'Identifiers that are direct children of method or properties declaration.'
  },
  {
    name: 'Function-like containing for-in statements',
    query: '//* [ //ForInStatement &&  (type()=="MethodDeclaration" || type()=="FunctionDeclaration" || type()=="Constructor") ] ',
    description: 'Functions methods or constructors that contain a ForInStatement (for(var i in obj){})'
  },

]
