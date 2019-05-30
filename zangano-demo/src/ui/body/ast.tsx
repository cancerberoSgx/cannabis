import { tsMorph } from 'zangano'
import { AbstractComponent, AbstractProps } from '../component'

interface P extends AbstractProps {
  // node?: ASTNode
}

export class Ast extends AbstractComponent<P> {
  // componentWillMount() {
  //   this.forceUpdate()
  // }

  // shouldComponentUpdate(nextProps: any, nextState: Readonly<State>, nextContext: any) {
  //   return nextState.currentEditorAst !== this.state.currentEditorAst && this.state.astAutoUpdate || nextState.astAutoUpdate !== this.state.astAutoUpdate
  // }

  render() {
    // let node: tsMorph.Node = this.props.node as tsMorph.Node
    // if (!node) {
    //   node = this.state.currentEditorAst
    // }
    // return <Segment basic>
    //   <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props) => {
    //     this.setState({ astAutoUpdate: !!props.checked })
    //   }}></Checkbox>
    //   <Space />
    //   {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e => this.forceUpdate()}>Update</Button>}
    //   <List>
    //     {this.renderNode(node)}
    //   </List>
    // </Segment>
    return 'not imple'
  }
  renderNode(node: tsMorph.Node) {
    //   const children = getASTNodeChildren(node)
    //   return (<List.Item onClick={e => {
    //     e.stopPropagation()
    //     highlightNodesInEditor([node])
    //   }}>
    //     <List.Icon name={iconForNodeKind(node.getKindName())} />
    //     <List.Content>
    //       <List.Header as="a">{getASTNodeKindName(node)} {getASTNodeName(node) ? <Label size="small"><strong>{getASTNodeName(node)}</strong></Label> : ''}
    //       </List.Header>
    //       <List.Description>
    //         {getASTNodeName(node) ? <><Label size="small"><strong>{getASTNodeName(node)}</strong></Label><Space /></> : ''}
    //         "<code>{shorter(getASTNodeText(node), 100)}</code>"
    // </List.Description>
    //       {children.length ? <List.List>{children.filter(tsMorph.TypeGuards.isNode).map(c => this.renderNode(c))}</List.List> : <></>}
    //     </List.Content>
    //   </List.Item>)
  }
}
