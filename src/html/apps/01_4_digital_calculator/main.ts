import { Calculator } from "./classes/calculator.js";
// Selectors
const numberButtonsElem = document.querySelectorAll('[data-number]');
const operationButtonsElem = document.querySelectorAll('[data-operation]');
const equalButtonElem = document.querySelector('[data-equals]') as HTMLDataElement;
const deleteButtonElem = document.querySelector('[data-delete]') as HTMLDataElement;
const allClearButtonElem = document.querySelector('[data-all-clear]') as HTMLDataElement;
const previousOperandTextElem = document.querySelector('[data-previous-operand]') as HTMLDataElement;
const currentOperandTextElem = document.querySelector('[data-current-operand]') as HTMLDataElement;

console.log(previousOperandTextElem)

const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem)

numberButtonsElem.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNrCalc(button.innerHTML)
        calculator.updateDisplayCalc()
    })
})

operationButtonsElem.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperationCalc(button.innerHTML)
        calculator.updateDisplayCalc()
    })
})

equalButtonElem.addEventListener('click', button => {
    calculator.computeCalc()
    calculator.updateDisplayCalc()
})

allClearButtonElem.addEventListener('click', button => {
    calculator.clearCalc()
    calculator.updateDisplayCalc()
})

deleteButtonElem.addEventListener('click', button => {
    calculator.deleteCalc()
    calculator.updateDisplayCalc()
})