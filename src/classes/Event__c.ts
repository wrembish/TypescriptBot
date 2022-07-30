export default class Event__c {
    public name : string
    public once : boolean
    public execute : Function
    
    constructor(name : string, once : boolean, execute : Function) {
        this.name = name
        this.once = once
        this.execute = execute
    }
}