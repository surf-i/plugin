function UserInput(object) {
    return(
    ` 
    <div class="UserInput_item " id=${object.id}>
      <label htmlFor="">${object.title}</label>
      <input type=${object.type} id=${object.name} name=${object.name} />
    </div>
    `    
    )
}
export default UserInput