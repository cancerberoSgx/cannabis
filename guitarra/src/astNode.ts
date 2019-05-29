export const astNodeAttributeNames = ['prop','value','important','name','params','selector','text']
/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export interface  ASTNode extends Partial<AtRule>, Partial<Decl>, Partial<Rule>,Partial<Comment>, Partial<WithParent> {
  raws: {
    before?: string,
    between?: string,
    semicolon?: boolean,
    after?: string
    important?: string
    left?: string
    right?: string
  }
  source: {
    start: {
    line: number,
    column: number
  }
  input: {
    css: string
    hasBOM: boolean,
    id: string
  },
  /** undefined means the end of file */
  end?: {
    line: number,
    column: number
  }
}
  type: 'rule'|'decl'|'root'|'atrule'|'comment'
  nodes: ASTNode[]
}
interface Decl {
  prop: string
  value: string
  important?: boolean
}
interface AtRule {
  name: string,
  params: string
}
interface Rule {
  selector: string
}
interface Comment {
text: string
}
interface WithParent {
  parent?: ASTNode
}

export function isASTNode(a: any): a is ASTNode{
  return a && a.type && a.source && a.source.start
}
