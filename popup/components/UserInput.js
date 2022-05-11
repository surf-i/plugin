import { Component } from "../../scripts/core.mjs"

class UserInput extends Component {
    initialize(){
      let object = this.props
      this.html`
      <div class="UserInput_item " id=${object.id}>
        <label htmlFor="">${object.title}</label>
        <input type=${object.type} id=${object.name} name=${object.name} />
      </div>
      `    
  }
  
}

export default UserInput