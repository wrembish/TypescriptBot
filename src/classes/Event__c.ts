export default class Event__c {
    public name : string
    public execute : Function
    public once : boolean
    
    constructor(name : string, once : boolean, execute : Function) {
        this.name = name
        this.execute = execute
        this.once = once
    }
}