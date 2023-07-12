import {HasFormatter} from '../interfaces/hasFormatter.js'


// Classes
export class Invoice implements HasFormatter{

    constructor(
        public id: number,
        public type: string,
        readonly client:string, 
        private details: string, 
        public amount: number) {
    }
    format() {
        return `${this.client} owes €${this.amount} for ${this.details}`;
    }

}