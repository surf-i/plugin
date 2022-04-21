function UserInput(object) {
    return(
    ` 
    <div class="UserInput_item " id=${object.id}>
      <label htmlFor="">${object.title}</label>
      <input type=${object.type} />
    </div>
    `
    )
}

export default UserInput