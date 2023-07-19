import { Calculator } from "./classes/calculator.js";
// Selectors
const numberButtonsElem = document.querySelectorAll('[data-number]');
const operationButtonsElem = document.querySelectorAll('[data-operation]');
const advanceOpButtonElem = document.querySelectorAll('[data-advanceOp]');
const equalButtonElem = document.querySelector('[data-equals]') as HTMLDataElement;
const deleteButtonElem = document.querySelector('[data-delete]') as HTMLDataElement;
const allClearButtonElem = document.querySelector('[data-all-clear]') as HTMLDataElement;
const previousOperandTextElem = document.querySelector('[data-previous-operand]') as HTMLDataElement;
const currentOperandTextElem = document.querySelector('[data-current-operand]') as HTMLDataElement;

const advanceButtonElem = document.querySelector('#advanceBtn') as HTMLSpanElement;
const advanceCalcContainerElem = document.querySelector('.calcAdv-container') as HTMLDivElement;
const calcContainerElem = document.querySelector('.calculator-container') as HTMLDivElement;
const xSquareYButtonElem = document.querySelector('[data-squareY]') as HTMLDataElement;


const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem)

numberButtonsElem.forEach(button => {
    button.addEventListener('click', (e:Event) => {
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

advanceOpButtonElem.forEach(button => {
    button.addEventListener('click', () => {
        calculator.advanceCalc(button.innerHTML)
        calculator.updateDisplayCalc()
    })
    
}) 


equalButtonElem.addEventListener('click', button => {
    calculator.computeCalc(true)
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

// Add keywords events
document.body.addEventListener('keyup', (e) => {
    if (/\d|\./g.test(e.key)) {
        calculator.appendNrCalc(e.key)
        calculator.updateDisplayCalc()
    }
    if (/[\+\-\*\/]/g.test(e.key)) {
        calculator.chooseOperationCalc(e.key)
        calculator.updateDisplayCalc()
    }
    if(e.key === "Enter") {
        calculator.computeCalc(true)
        calculator.updateDisplayCalc()
    }

    if(e.key === "Backspace") {
        calculator.deleteCalc()
        calculator.updateDisplayCalc()
    }
    if(e.key === "Delete") {
        calculator.clearCalc()
        calculator.updateDisplayCalc()
    }
    console.log(e.key)
})  


advanceButtonElem.addEventListener('click', () => {
    advanceCalcContainerElem.classList.toggle('showAdvCalc');
    calcContainerElem.classList.toggle('hideAdvCalc');
})