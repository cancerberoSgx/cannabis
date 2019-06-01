// import ASTQ from 'astq'

// class Node {
//   constructor(public nodeType: string, 
//     public attrs: { [name: string]: any } = {}, public childNodes: Node[] = []) {
//       childNodes.forEach(c=>{
//         c.parentNode = this
//       })
//   }
//   parentNode: Node|undefined
//   get outerHTML(): string{
//     return `<${this.nodeType} ${Object.keys(this.attrs).map(k=>`${k}="${this.attrs[k]}"`).join(' ')}>${this.childNodes.map(c=>c.outerHTML).join('')}</${this.nodeType}>`
//   }
// }

// var astq = new ASTQ<Node>()

// astq.adapter({
//   taste(node: any) {
//     return node && typeof node.nodeType==='string' && node.attrs && Array.isArray(node.childNodes)
//   },
//   getParentNode(node: Node) {
//     return node && node.parentNode
//   },
//   getChildNodes(node: Node) {
//     return node && node.childNodes
//   },
//   getNodeType(node: Node) {
//     return node && node.nodeType 
//   },
//   getNodeAttrNames(node: Node) {
//     return node && Object.keys(node.attrs||{})
//   },
//   getNodeAttrValue(node: Node, attr: string) {
//     return node && node.attrs&& node.attrs[attr]
//   }
// })

// const doc1 = new Node('document', {foo: 'bar'}, [
//   new Node('body', {id: 'id33', style: {border: '2px solid pink'}}, [
//     new Node('text', {textContent: 'TODO list'}),
//     new Node('ul', {}, [
//       new Node('li',{textContent: 'Do the dishes'}, []),
//       new Node('li',{textContent: 'Backup photos'}, [])
//     ])
//   ])
// ])

// let q = '// li '
// console.log('RESULTS for query ', q);
// astq.query(doc1, q).forEach(n=> {
//   console.log(' * ' + n.outerHTML)
// })

// console.log(typeof astq.compile('// ul').dump());
