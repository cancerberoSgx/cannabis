import * as React from 'react'
import { Segment, Header, Checkbox, Button, List, Label } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { debug } from '../../app/dispatchers';
import { Space } from '../uiUtil';
import { highlightNodesInEditor } from '../../editor/codeEditor';
import {ASTQQuery, ASTYNode} from 'astq'
import { setEditorText } from '../../editor/monaco';
import { State } from '../../app/store';


export class QueryAst extends AbstractComponent {
  // shouldComponentUpdate(nextProps:any, nextState: Readonly<State>, nextContext: any){
  //   return nextState.currentEditorQueryAst!==this.state.currentEditorQueryAst && this.state.queryAstAutoUpdate ||  nextState.astAutoUpdate!==this.state.astAutoUpdate 
  // }
  componentWillMount(){
    setEditorText(this.state.selectedExample.query)
    // this.state.q
    // this.setState({getASTNodeText: this.state.selectedExample.query})
    this.forceUpdate()
  }
  render() {
    // const node = this.sta
    return <Segment basic>    
    <Checkbox defaultChecked={this.state.astAutoUpdate} label="Auto Update" onChange={(e, props)=>{
      this.setState({astAutoUpdate: props.checked})
    }}/>
    <Space/>
    {this.state.astAutoUpdate ? '' : <Button size="small" onClick={e=> this.forceUpdate()}>Update</Button>}
    <List>
    {this.renderNode(this.state.queryAst)}
    </List>
    <Segment className="queryDump" basic>
      <Header as="h3">Query Analysis</Header>
      <pre>
        {this.state.queryDump}
      </pre>
    </Segment>
    </Segment>
  }
  renderNode(node: ASTYNode) {
    // debugger
    // const children = getASTNodeChildren(node)
    return (<List.Item onClick={e =>  {}}>
      {/* <List.Icon name={iconForNodeKind(node.getKindName())} /> */}
      <List.Icon icon="home"/>
      <List.Content>
        <List.Header as="a" >
        {node.type()}  
        </List.Header>
        {node.attrs().length ? <List.Description>
        {/* <List.Description>  */}
          {node.attrs().map(a=><><Label>{a}</Label>: <code>{node.get(a)}</code></> )}
          {/* TODO */}
          {/* {getASTNodeName(node) ? <><Label size="small"><strong>{getASTNodeName(node)}</strong></Label><Space /></> : ''}
          "<code>{shorter(getASTNodeText(node), 100)}</code>" */}
  </List.Description> : <></>}
  {/* {node.attrs().map(a=><><Label>{a}</Label>: <code>{node.get(a)}</code></> )} */}
  {/* </List.Description> */}
        {node.childs().length ? <List.List>{node.childs(). map(c => this.renderNode(c))}</List.List> : <></>}
      </List.Content>
    </List.Item>)
  }
}
