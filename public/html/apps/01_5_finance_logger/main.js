import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
// Selectors
const formFinanceElem = document.querySelector(".new-item-form");
const typeFinanceElem = document.querySelector("#payment-type");
const toFromElem = document.querySelector("#payment-tofrom");
const detailsFinanceElem = document.querySelector("#payment-details");
const amountFinanceElem = document.querySelector("#payment-amount");
const errFinanceElem = document.querySelector('.finance-errorContainer');
const ulFinanceElem = document.querySelector('.paymentList');
// Tuples
let financeTupObj;
// Functions
const getFinanceLogs = () => {
    // is there a finance in local storage?
    ulFinanceElem.innerText = "";
    let savedFinance = [];
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
        savedFinance.forEach((el) => {
            let doc;
            financeTupObj = [el.id, el.type, el.client, el.details, el.amount];
            if (el.type === "invoice") {
                doc = new Invoice(...financeTupObj);
                const listFinance = new ListTemplate(ulFinanceElem);
                listFinance.render(doc, "start");
            }
            else {
                doc = new Payment(...financeTupObj);
                const listFinance = new ListTemplate(ulFinanceElem);
                listFinance.render(doc, "start");
            }
        });
    }
};
getFinanceLogs();
const removeFinance = (val) => {
    // is there a finance in local storage?
    let savedFinance;
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
    }
    savedFinance.splice(savedFinance.findIndex((el) => el.id === val), 1);
    localStorage.setItem("finance", JSON.stringify(savedFinance));
    getFinanceLogs();
};
// Events
// Add Finance log
formFinanceElem.addEventListener('submit', (e) => {
    e.preventDefault();
    // is there a finance in local storage?
    let savedFinance;
    if (localStorage.getItem('finance') === null) {
        savedFinance = [];
    }
    else {
        savedFinance = JSON.parse(localStorage.getItem("finance") || "[]");
    }
    if (toFromElem.value.replace(/\ /g, "").length > 0 && detailsFinanceElem.value.replace(/\ /g, "").length > 0) {
        let financeLog;
        financeLog = { id: Date.now(), type: typeFinanceElem.value, client: toFromElem.value.trim(), details: detailsFinanceElem.value.trim(), amount: amountFinanceElem.valueAsNumber || 0 };
        savedFinance.push(financeLog);
        localStorage.setItem("finance", JSON.stringify(savedFinance));
        getFinanceLogs();
        toFromElem.value = "";
        detailsFinanceElem.value = "";
        amountFinanceElem.value = "";
    }
    else {
        errFinanceElem.innerText = "Please complete all fields!";
        setTimeout(() => {
            errFinanceElem.innerText = "";
        }, 1500);
    }
});
ulFinanceElem.addEventListener('click', (e) => {
    var _a;
    const item = e.target;
    const selectedLi = (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const selectedId = Number(selectedLi.children[0].childNodes[0].textContent);
    if (item.classList[0] === 'deleteFinance') {
        removeFinance(selectedId);
    }
});
