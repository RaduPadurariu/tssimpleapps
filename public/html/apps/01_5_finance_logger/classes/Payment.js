// Classes
export class Payment {
    constructor(id, type, recipient, details, amount) {
        this.id = id;
        this.type = type;
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.recipient} is owed €${this.amount} for ${this.details}`;
    }
}
