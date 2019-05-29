const postcss = require('postcss');
const { parse } = require('postcss-values-parser');

export function parseCss(s: string) {
  let root = postcss.parse(s);
  root = JSON.parse(JSON.stringify(root));
  addParent(root);
  return root;
}
function addParent(n: any, parent?: any) {
  visit(n, (n, parent)=>{
    n.parent = parent
    if(n.value){
      n.nodes = n.nodes ||[]
      n.valueLiteral = n.value
      n.value = parse(n.value)
      n.nodes.push(n.value)
      // n.value.type = 'value'
    }
  }) 
}

export function visit(n: any, v: (n:any, parent: any, level: number)=>boolean|undefined|void, childrenFirst=true, parent?: any, level=0) {
  if(!n){
    return
  }
  if(!childrenFirst&&v(n, parent, level)){
    return true
  }
  if( Array.isArray(n.nodes) && n.nodes.some((c: any) => visit(c, v, childrenFirst, n, level+1))) {
    return true
  }
  return childrenFirst&&v(n, parent, level)
}