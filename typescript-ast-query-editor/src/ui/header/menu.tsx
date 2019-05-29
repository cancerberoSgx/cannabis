import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Menu } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
// interface S extends State {
//   activeItem?: string
// }
export default class MenuExampleMenus extends AbstractComponent {
  // constructor(p: any, s: any) {
  //   super(p, s)
  //   this.state = { ...this.state, activeItem: undefined }
  // }

  render() {
    console.log('menut', this.state.sidebarVisibility)

    return (
      <Menu floated={"right"}>
        <Menu.Menu position='right'>
          <Menu.Item small name='ShowMenu'>


            <input type="checkbox"
              checked={this.state.sidebarVisibility}
              onChange={e => {
                this.setState({ sidebarVisibility: !this.state.sidebarVisibility })
              }}></input> Menu
        {/* <Checkbox 
        // toggle 
        // label="Show menu"
        checked={this.state.sidebarVisibility} 
        onChange={e=>{
          this.setState({ sidebarVisibility: !this.state.sidebarVisibility})
        }}
//         onMouseDown={
//           // throttle(
//           (e, props)=>{
//             // if(this.state.sidebarVisibility){
//             //   document.getElementById("editor-container")!.click()
//             // }
//             // else {
//               debugger
// //               if(props.checked&&!this.state.sidebarVisibility){
// // return 
// //               }
// e.stopPropagation()
// e.preventDefault()
//                 this.setState({ sidebarVisibility: !this.state.sidebarVisibility})
//             // }
//           // e.currentTarget.checked=!this.state.sidebarVisibility
//           // e.currentTarget.checked=!this.state.sidebarVisibility
//           // props.checked=!this.state.sidebarVisibility
//         //  setTimeout(() => {
//           // console.log('menutonChangeBefore', this.state.sidebarVisibility);
//           // this.setState({ sidebarVisibility: !this.state.sidebarVisibility})
//           // console.log('menutonChangeAfter', this.state.sidebarVisibility);
         
//         //  }, 220);


//         }
        // , 1000)
        // }
        /> */}

          </Menu.Item>


          {/* <Button small toggle  onClick={e => this.setState({ sidebarVisibility: this.state.activeItem === 'signup-active' ? false : true })}>Menu
      </Button> */}
          <Menu.Item small name='help'>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
