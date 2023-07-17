import { Calculator } from "./classes/calculator.js";
// Selectors
const numberButtonsElem = document.querySelectorAll('[data-number]');
const operationButtonsElem = document.querySelectorAll('[data-operation]');
const equalButtonElem = document.querySelector('[data-equals]');
const deleteButtonElem = document.querySelector('[data-delete]');
const allClearButtonElem = document.querySelector('[data-all-clear]');
const previousOperandTextElem = document.querySelector('[data-previous-operand]');
const currentOperandTextElem = document.querySelector('[data-current-operand]');
console.log(previousOperandTextElem);
const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem);
numberButtonsElem.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNrCalc(button.innerHTML);
        calculator.updateDisplayCalc();
    });
});
operationButtonsElem.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperationCalc(button.innerHTML);
        calculator.updateDisplayCalc();
    });
});
equalButtonElem.addEventListener('click', button => {
    calculator.computeCalc();
    calculator.updateDisplayCalc();
});
allClearButtonElem.addEventListener('click', button => {
    calculator.clearCalc();
    calculator.updateDisplayCalc();
});
deleteButtonElem.addEventListener('click', button => {
    calculator.deleteCalc();
    calculator.updateDisplayCalc();
});
