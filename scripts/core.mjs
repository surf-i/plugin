// this is a ligth vanilla javascript framwork based on components paradigm
//Parse from String to HTML
function StringHTML(string) {
    const div = document.createElement('div');
    string = string.replace(/\>/g, ">")
    div.innerHTML = string;
    return div.children[0];
}

export {Component, Surfen}//export all functions

// SURFI 2.0
const Surfen ={
    addComponent(component, element){
        if(!(component instanceof Component) || element == null){
            let message =  element == null ? '[addComponent] Element is null ' :'[addComponent] first argument is not a Type Component'
            console.error(message) 
            return false
        }
        if(component.state == Component.State.Declared || component.state == Component.State.Updated){
            component.initialize()
        }
        element.insertAdjacentHTML("afterbegin",component.template);
        component.mount(element);
    },
    deleteComponent(component){
        if(!(component instanceof Component)){
            let message =  '[deleteComponent] element is not a Type Component'
            console.error(message) 
            return false
        }
        if(component.state === Component.State.Initialized){
            let message = `[deleteComponent: ${component.constructor.name}] component is not Initialized`
            console.error(message) 
            return false
        }
        component.unmount()
        component = null
        return true
    },
    updateComponent(component, element){
        if(!(component instanceof Component) || element == null){
            let message =  element == null ? '[addComponent] Element is null ' :'[addComponent] first argument is not a Type Component'
            console.error(message) 
            return false
        }
        if(component.state === Component.State.Initialized){
            let message = `[addComponent: ${component.constructor.name}] component is not Initialized`
            console.error(message) 
            return false
        }
        element.insertAdjacentHTML("afterbegin",component.template);
        component.unmount();
    },
    navegate(oldComponent, newComponent){
        let parent = oldComponent.parent 
        if(!(oldComponent instanceof Component) || !(newComponent instanceof Component)){
            let message = '[navegate] component argument is not a Type Component'
            console.error(message) 
            return false
        }
        oldComponent.unmount()
        oldComponent = null
        if(newComponent.state == Component.State.Declared || newComponent.state == Component.State.Updated){
            newComponent.initialize()
        }
        parent.insertAdjacentHTML("afterbegin",newComponent.template);
        newComponent.mount(parent);
    }
}
class Component{

    #id
    #state
    #parent_id
    #template
    //About State
    static get State()  {
        return{
            Declared: 'Declared',
            Initialized: 'Initialized',
            Mounted: 'Mounted',
            Updated: 'Updated',
            Unmounted: 'Unmounted'  
        }
    }

    static genId(){
        const HEX = 16, MAX = 1200
        let sum = (Math.floor(Math.random()*MAX))
        let id = (Math.floor(Math.random()*MAX))
        return id.toString(HEX)+(new Date()).getTime().toString(HEX)+(sum++).toString(HEX)
    }
    constructor(props){
        this.props = props
        this.dynamics = new Map()
        this.components = new Map()
        this.#state = Component.State.Declared 
    }
    initialize(){
        //sets the template of the component this make a component diferent than other
        console.error(`[Component: ${this.constructor.name}] Component can\'t initialize an abstract class set template through html method`)
    }
    mount(element){
        this.parent = element.id
        this.id = element.children[0].id ? element.children[0].id : Component.genId()
        element.children[0].id = this.id
        this.state = Component.State.Mounted;
        this.render();
    }
    update(){
        console.error(`[Component: ${this.constructor.name}] Component can\'t update an abstract class`)
    }
    unmount(){
        this.remove()
        this.state = Component.State.Unmounted
    }
    //Getters and Setters
    get state(){
        return this.#state
    }
    set state(state){
        if (Object.values(Component.State).includes(state)) {
            this.#state = state 
        }
        else{
            console.error(`[Component: ${this.constructor.name}] argument is not a valid state`)
        }
    }
    get id(){
        return this.#id
    }
    set id(id){
        this.#id = id
    }
    get element(){
        if(this.#state === Component.State.Mounted){
            return document.getElementById(this.id)
        }else{
            console.error(`[Component: ${this.constructor.name}] Element is not Mounted`)
            return null
        }
    }
    get template(){
        if(this.#state === Component.State.Initialized){
            return this.#template
        }else{
            console.error(`[Component: ${this.constructor.name}] Element is not Initialized`)
            return ''
        }
    }
    get parent(){
        if(this.#state === Component.State.Mounted){
            return document.getElementById(this.#parent_id)
        }else{
            console.error(`[Component: ${this.constructor.name}] Parent doesn\'t exist`)
        }      
    }
    set parent(parent_id){
        let a = document.getElementById(parent_id)
        if(a != null){
            this.#parent_id = parent_id
        }else{
            console.error(`[Component: ${this.constructor.name}] Parent doesn\'t exist`)
        }
    }

    //Rendering and other functions

    render(){
        //Here you put every varible or eventListener
        console.warn(`[Component: ${this.constructor.name}] Component is render in abstract class method`)
    }

    html(a, ...keys){
        let string = ''
        keys.forEach((e,i) => {
            string +=a[i]
            if(e instanceof Component){
                this.components.set(e.id, e)
                e.initialize()
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
        this.element.remove()
    }

    //Event management
    removeEvent(e){
        e.remove()
        this.dynamics.delete(e.id)
    }
    addEvent(event_id,type, event_function, params, extra){
        let event = new Event(event_id, type, event_function, params, extra)
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
    #event_function
    #parent_id
    constructor(elementId, type=undefined, eventFunction, params=[], extra=false){
        this.#id = elementId
        this.type = type
        this.#event_function = eventFunction
        this.#createEvent(this.type,this.eventFunction, params, extra)
    }
    #createEvent(type,eventFunction, params, extra){
        this.element.addEventListener(type,function(e){ e.preventDefault();eventFunction(...params)}, extra)
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
        if (this.#event_function == null) console.error('Surfi Event failure', 'element:', this.element, 'type:', this.type)
        return this.#event_function
    }
    remove(){
        this.element.removeEventListener(this.type, this.eventFunction)
    }
}