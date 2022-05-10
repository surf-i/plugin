// this is a ligth vanilla javascript framwork based on components paradigm
//Parse from String to HTML
function StringHTML(string) {
    const div = document.createElement('div');
    string = string.replace(/\>/g, ">")
    div.innerHTML = string;
    return div.children[0];
}

function addElement(object, template, place){
    const string = template(object)
    const element = StringHTML(string)
    place.insertBefore(element, place.firstChild)
}


function deleteElement(element){
    element.remove()
}

export {addElement, deleteElement, Component, Surfen}//export all functions

// SURFI 2.0
const Surfen ={
    addComponent(component, element){
        if(!(component instanceof Component) || element == null){
            let message =  element == null ? '[addComponent] Element is null ' :'[addComponent] first argument is not a Type Component'
            console.error(message) 
            return false
        }
        if(component.state === Component.State.Initialized){
            let message = '[addComponent] component is not Initialized'
            console.error(message) 
            return false
        }
        if(component.state == Component.State.Declared || component.state == Component.State.Updated){
            component.initialize()
        }
        element.insertAdjacentHTML("afterbegin",component.template);
        component.state = Component.State.Mounted;
        component.render();
    }
}
class Component{
    static get State()  {
        return{
            Declared: 'Declared',
            Initialized: 'Initialized',
            Mounted: 'Mounted',
            Updated: 'Updated',
            Unmounted: 'Unmounted'  
        }
    }
    #id
    #state
    #parent_id
    #template
    constructor(parent_id=null){
        this.#parent_id = parent_id
        this.dynamics = new Map()
        this.components = new Map()
        this.#state = Component.State.Declared 
    }
    get state(){
        return this.#state
    }
    set state(state){
        if (Object.values(Component.State).includes(state)) {
            this.#state = state 
        }
        else{
            console.error('[Component] that is not a valid state')
        }
    }
    get id(){
        return this.#id
    }
    get element(){
        if(this.#state === this.State.Mounted){
            return document.getElementById(this.id)
        }else{
            console.error('[Component] Element is not Mounted')
            return null
        }
    }
    get template(){
        if(this.#state === Component.State.Initialized){
            return this.#template
        }else{
            console.error('[Component] Element is not Initialized')
            return ''
        }
    }
    render(){
        console.error('[Component] Component can\'t render an abstract class')
    }
    initialize(){
        console.error('[Component] Component can\'t initialize an abstract class')
    }
    html(a, ...keys){
        let string = ''
        keys.forEach((e,i) => {
            string +=a[i]
            if(e instanceof Component){
                this.components.set(e.id, e)
                string+=e.template
            }else{
                string+=e
            }
        })
        string += a[keys.length]
        this.#template = string
        this.#state = Component.State.Initialized
    }
    remove(){
        this.#removeEvents()
        this.element.remove()
    }
    removeEvent(e){
        e.remove()
        this.dynamics.delete(e.id)
    }
    addEvent(event_id,type, event_function){
        let event = new Event(this.#id, event_id, type, event_function)
        this.dynamics.set(event_id, event)
    }
    #removeEvents(){
        this.dynamics.forEach(e => {
            this.removeEvent(e)
        })
    }
}

class Event{
    #id
    #eventFunction
    #parent_id
    constructor(elementId, type, eventFunction){
        this.#id = elementId
        this.type = type || undefined
        this.#eventFunction = eventFunction
        this.element.addEventListener(type, eventFunction)
    }
    get parent(){
        return document.getElementById(this.#parent_id)
    }
    get element(){
        return document.getElementById(this.#id)
    }
    get id(){
        return this.#id
    }
    get eventFunction(){
        if (this.#eventFunction == null) console.error('Surfi Event failure', 'element:', this.element, 'type:', this.type)
        return this.#eventFunction
    }
    remove(){
        this.element.removeEventListener(this.type, this.eventFunction)
    }
}