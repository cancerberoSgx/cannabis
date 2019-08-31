import { ASTNode } from './astNode';
import { QueryResult } from './query';
import { visitDescendants } from './parse';

export function stringify(result: QueryResult<ASTNode>|{result:ASTNode[]}, withValue=false) {
  const f = (n: ASTNode) => { 
    delete n.parent; 
    if(!withValue && n.attributes){ 
    delete n.attributes.value;
    } 
  return false; 
  };
  (result.result||[]).forEach(n => f(n) || visitDescendants(n, f));
  const s = JSON.stringify(result.result!);
  return s;
}
