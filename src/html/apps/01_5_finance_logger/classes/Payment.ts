import { HasFormatter } from "../interfaces/hasFormatter.js";

// Classes
export class Payment implements HasFormatter {
  constructor(
    public id: number,
    public type: string,
    readonly recipient: string,
    private details: string,
    public amount: number
  ) {}
  format() {
    return ` I have to give €${this.amount} to ${this.recipient} for ${this.details}`;
  }
}
