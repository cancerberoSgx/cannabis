import { ASTNode, getASTNodeDescendants, getASTNodeParent, getASTNodeAncestors, getASTNodeChildren, getASTNodeSiblings } from './astNode';
import micromatch, {Options as MicroMatchOptions} from 'micromatch';
import { RemoveProperties, PropertyOptional, notUndefined, objectFilter } from 'misc-utils-of-mine-generic';
import { getASTNodeIndexPath, getASTNodeKindPath, getASTNodeNamePath } from './path';


interface MatchStringOptions {

  // verb?: 'contains'| 'not'| 'every' |'any'|'some'
  // /**
  //  * alternative to give a root node and directions, user can give an array of already existing input paths. this way the AST doesnt' to be re-generated / traversed for this query.
  //  */
  // inputPaths?: string[];

  /**
   * The patterns input paths match. Example: `'** /*method*1* /** /*Statement* /** /push']`   */
  include: string[];


  /**
   * Exclude nodes matchint this pattern
   */
  exclude?: string[];

  /**
   * internally it uses micromatch library so options can be also given using this param.
   * See https://github.com/micromatch/nanomatch#options
   */
  micromatch?: MicroMatchOptions


  // /**
  //  * Break search when this number of results matched.
  //  */
  // resultLimit?: number;
  
}

interface Source<T> {
  path: string
  data: T
}

export function searchSource<T>(p: Source<T>[],  options:  MatchStringOptions= {include: [] }): Source<T>[] {
  let m = micromatch(p.map(p=>p.path), options.include, options.micromatch)
  if(options.exclude){
    m=micromatch(p.map(p=>p.path), options.exclude, options.micromatch)
  }
  return p.map(p=>m.includes(p.path) ? p : undefined).filter(notUndefined)
}



interface MatchNodeOptions extends MatchStringOptions {

  /**
   * By default `/`
   */
  levelSeparator?: string;
  
  // * If omitted and [[[inputPaths]]] is given then it will filter those paths and return the result as array of paths.
  /**
   * The node from which search in the AST.By default it search on its ascendants including it. 
   */
  root: ASTNode;

  /**
   * The path mode to build for input nodes. Alternative [[pathCreator]] function can be pass to build a custom path.
   */
  path?: 'index' | 'kind' | 'name';

  /**
   * Function to build a custom path. It must return a single node representation in the path (not all the
   * path). This way custom semantics for queries is supported. Remember that performance is important and the
   * function call runs a lot of times and probably for the same input. Tip: memoize / cache.
   *
   * Example: n=>isExportedDescendant(n) ? 'exported' : isDeclaration(n) ? 'declaration' : 'isTypeOnly(n) ? :
   * 'type' : 'other'
   */
  pathBuilder?: (n: ASTNode) => 'string';

  /**
   * Defines from given root node, which nodes take as input of the query. By default will be its decendants.
   */
  selectNodeDirection?:SelectNodeDirection


}

interface SelectNodeDirection {
  ancestors?: boolean;
  descendants?: boolean;
  children?: boolean;
  siblings?: boolean;
}


interface Result {
  /**
   * When true means all the input paths were filtered.
   */
  searchFinished?: boolean;

  timingSafeEqual?: {
    total: number;
  };

  results: Source<ASTNode>[];

  // /**
  //  * in case no root node was given but an arrays of inputPaths.
  //  */
  // resultPaths?: string[];

}

function selectNodes(root: ASTNode, d: SelectNodeDirection){
  let a : ASTNode[] = []
  if(d.ancestors){
    a.push(...getASTNodeAncestors(root))
  }
  if(d.descendants){
    a.push(...getASTNodeDescendants(root))
  }
  else if (d.children){
    a.push(...getASTNodeChildren(root))
  }
  if(d.siblings){
    a.push(...getASTNodeSiblings(root))
  }
  return a
}

export function matchNodesv(o: MatchNodeOptions): Result{
 const input = selectNodes(o.root, o.selectNodeDirection||{descendants: true})
 const source : Source<ASTNode>[] = input.map(n=>({
  data: n, 
  path: o.path==='index'?getASTNodeIndexPath(n): o.path==='kind' ? getASTNodeKindPath(n) : getASTNodeNamePath(n)
 }))
 const results = searchSource(source, o)
 return {
   results
 }
}


// export function selectNode(options: MatcNodeOptions): Result {
//   const result = {}
//   return result
// }

