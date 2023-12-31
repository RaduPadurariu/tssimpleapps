import {Invoice} from './classes/Invoice';
import {Payment} from './classes/Payment';
import { HasFormatter } from './interfaces/hasFormatter';
import { ListTemplate } from './classes/ListTemplate';

// Selectors
const formFinanceElem = document.querySelector(".new-item-form") as HTMLFormElement;
const typeFinanceElem = document.querySelector("#payment-type") as HTMLSelectElement;
const toFromElem = document.querySelector("#payment-tofrom") as HTMLInputElement;
const detailsFinanceElem = document.querySelector("#payment-details") as HTMLInputElement;
const amountFinanceElem = document.querySelector("#payment-amount") as HTMLInputElement;
const errFinanceElem = document.querySelector('.finance-errorContainer') as HTMLSpanElement
const ulFinanceElem = document.querySelector('.paymentList') as HTMLUListElement;

// Aliases

// Interfaces
interface IsFinanceObj {
    id: number,
    type: string,
    client: string,
    details: string,
    amount: number
}

// Tuples

let financeTupObj: [number, string, string, string, number]

// Functions Signatures

let getFinanceLogs: () => void;
let removeFinance: (a: number) => void;

// Functions
getFinanceLogs = () => {
    // is there a finance in local storage?
    ulFinanceElem.innerText = ""
    let savedFinance:[] = [];
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
        savedFinance.forEach((el:IsFinanceObj) => {
            let doc:HasFormatter;
            
            financeTupObj = [el.id, el.type, el.client, el.details, el.amount]
            if (el.type === "invoice") {
                doc = new Invoice(...financeTupObj);
                const listFinance = new ListTemplate(ulFinanceElem);
                listFinance.render(doc, "start");
            }
            else {
                doc = new Payment(...financeTupObj)
                const listFinance = new ListTemplate(ulFinanceElem);
                listFinance.render(doc, "start");
            }

            
        })
        
    }
};

getFinanceLogs();

removeFinance = (val:number) => {
    // is there a finance in local storage?
    let savedFinance;
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
    }
    savedFinance.splice(savedFinance.findIndex((el:IsFinanceObj) => el.id === val), 1);
    localStorage.setItem("finance", JSON.stringify(savedFinance));
    getFinanceLogs()
}



// Events

// Add Finance log
formFinanceElem.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    // is there a finance in local storage?
    let savedFinance;
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
    }
    if( toFromElem.value.replace(/\ /g, "").length > 0 && detailsFinanceElem.value.replace(/\ /g, "").length > 0) {
        let financeLog:IsFinanceObj;
        financeLog = {id: Date.now(), type: typeFinanceElem.value, client:toFromElem.value.trim(), details: detailsFinanceElem.value.trim(), amount: amountFinanceElem.valueAsNumber || 0};
        savedFinance.push(financeLog);
        localStorage.setItem("finance", JSON.stringify(savedFinance));
        getFinanceLogs();
        toFromElem.value = ""
        detailsFinanceElem.value = "";
        amountFinanceElem.value = "";
    }
    else {
        errFinanceElem.innerText = "Please complete all fields!"
        setTimeout(() => {
            errFinanceElem.innerText = ""
        }, 1500)
    }
    


})

ulFinanceElem.addEventListener('click', (e) => {
    const item = e.target as HTMLSpanElement;
    const selectedLi = item.parentElement?.parentElement as HTMLLIElement
    const selectedId = Number(selectedLi.children[0].childNodes[0].textContent)
    if(item.classList[0] === 'deleteFinance') {
        removeFinance(selectedId)
    }
    
})