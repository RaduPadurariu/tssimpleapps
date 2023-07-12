// Classes
export class Invoice {
    constructor(id, type, client, details, amount) {
        this.id = id;
        this.type = type;
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client} owes €${this.amount} for ${this.details}`;
    }
}
