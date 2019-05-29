export const astNodeAttributeNames = ['prop', 'value', 'important', 'name', 'params', 'selector', 'text', 'isColor', 'isHex', 'isUrl', 'isVariable', 'unit', 'prefix', 'inline', 'quote']

/**
 * General definition of nodes that contemplate everything, directories, sourceFiles, and nodes, with a common minimal API
 */
export interface ASTNode extends Partial<AtRule>, Partial<Decl>, Partial<Rule>, Partial<Comment>, Partial<WithParent>, Partial<Values> {
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
  type: 'rule' | 'decl' | 'root' | 'atrule' | 'comment' | 'atWord' | 'comment' | 'func' | 'interpolation' | 'numeric' | 'operator' | 'punctuation' | 'quoted' | 'unicodeRange' | 'word'
  nodes: ASTNode[]
}
interface Decl {
  prop: string
  value: string
  important?: boolean
}
interface Values {
  isColor: boolean
  isHex: boolean
  isUrl: boolean
  isVariable: boolean
  unit: '%' | 'ch' | 'cm' | 'em' | 'ex' | 'in' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'vh' | 'vmax' | 'vmin' | 'vw'
  params: string
  prefix: string
  name: string
  inline: boolean
  quote: string
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

export function isASTNode(a: any): a is ASTNode {
  return a && a.type && a.source && a.source.start
}
