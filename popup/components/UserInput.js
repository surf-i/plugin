import { Component } from "../../scripts/core.mjs"

function UserInput(object) {
    return(
    Component.html` 
    <div class="UserInput_item " id=${object.id}>
      <label htmlFor="">${object.title}</label>
      <input type=${object.type} id=${object.name} name=${object.name} />
    </div>
    `    
    )
}
export default UserInput