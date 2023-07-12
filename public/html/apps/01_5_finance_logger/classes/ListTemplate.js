export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, pos) {
        const liElem = document.createElement('li');
        liElem.classList.add('li-finance');
        const headingContainerElem = document.createElement('div');
        liElem.append(headingContainerElem);
        const idFinanceElem = document.createElement('span');
        idFinanceElem.style.display = "none";
        headingContainerElem.appendChild(idFinanceElem);
        idFinanceElem.innerText = item.id.toString();
        const h4Elem = document.createElement('h4');
        h4Elem.innerText = item.type;
        item.type === "invoice" ? h4Elem.style.color = "darkgreen" : h4Elem.style.color = "rgb(196, 79, 79)";
        headingContainerElem.appendChild(h4Elem);
        const deleteFinanceElem = document.createElement('span');
        deleteFinanceElem.innerText = "x";
        deleteFinanceElem.classList.add('deleteFinance');
        headingContainerElem.appendChild(deleteFinanceElem);
        const p = document.createElement('p');
        p.innerText = item.format();
        liElem.append(p);
        if (pos === "start") {
            this.container.prepend(liElem);
        }
        else {
            this.container.append(liElem);
        }
    }
}
