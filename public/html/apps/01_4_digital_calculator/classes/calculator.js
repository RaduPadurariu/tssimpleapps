export class Calculator {
    constructor(previousOpElem, currentOpElem) {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
        this.equalFlag = false;
        this.previousOpElem = previousOpElem;
        this.currentOpElem = currentOpElem;
        this.clearCalc();
    }
    clearCalc() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }
    deleteCalc() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    appendNrCalc(number) {
        if (number === "." && this.currentOperand.includes("."))
            return;
        if (this.equalFlag) {
            this.currentOperand = "" + (number === "π" ? Math.PI.toString() : number);
            this.equalFlag = false;
        }
        else
            this.currentOperand = this.currentOperand + (number === "π" ? Math.PI.toString() : number);
    }
    computeCalc(value) {
        if (value)
            this.equalFlag = true;
        let computation;
        const prevValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);
        if (isNaN(prevValue) || isNaN(currentValue))
            return;
        switch (this.operation) {
            case "+":
                computation = prevValue + currentValue;
                break;
            case "-":
                computation = prevValue - currentValue;
                break;
            case "*":
                computation = prevValue * currentValue;
                break;
            case "/":
                computation = prevValue / currentValue;
                break;
            default: return;
        }
        this.currentOperand = computation + "";
        this.operation = "";
        this.previousOperand = "";
    }
    chooseOperationCalc(operation) {
        if (this.currentOperand === "")
            return;
        if (this.previousOperand !== "") {
            this.computeCalc(false);
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    getDisplayNumberCalc(number) {
        const stringNumber = number;
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplayCalc() {
        this.currentOpElem.innerText = this.getDisplayNumberCalc(this.currentOperand);
        if (this.operation != null) {
            this.previousOpElem.innerText = `${this.getDisplayNumberCalc(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOpElem.innerText = "";
        }
    }
    advanceCalc(advOp) {
        if (this.currentOperand === "")
            return;
        console.log(advOp);
        let computation;
        const prevValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);
        switch (advOp) {
            case "%":
                computation = (isNaN(prevValue) ? 0 : (prevValue * (currentValue / 100)));
                break;
            case "x<sup>2</sup>":
                computation = Math.pow(currentValue, 2);
                break;
            case "2√x":
                computation = Math.sqrt(currentValue);
                break;
            default: return;
        }
        this.currentOperand = computation + "";
    }
}
