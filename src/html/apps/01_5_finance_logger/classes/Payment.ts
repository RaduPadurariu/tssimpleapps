import {HasFormatter} from '../interfaces/hasFormatter.js'


// Classes
export class Payment implements HasFormatter{

    constructor(
        public id: number,
        public type: string,
        readonly recipient:string, 
        private details: string, 
        public amount: number) {
    }
    format() {
        return `${this.recipient} is owed €${this.amount} for ${this.details}`;
    }

}