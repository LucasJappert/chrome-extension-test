


function GetTotals() {
    // Obtén todas las tablas en el documento
    let tables = document.getElementsByTagName('table');

    // Itera sobre las tablas
    for (let table of tables) {
        // Comprueba si la tabla tiene la clase deseada
        if (table.classList.contains('backlog-tree')) {
            
            const ths_of_thead = Array.from(table.getElementsByTagName('th'));

            const indexOfOrder = ths_of_thead.findIndex(th => th.innerText === 'Order');
            const indexOfID = ths_of_thead.findIndex(th => th.innerText === 'ID');
            const indexOfTitle = ths_of_thead.findIndex(th => th.innerText === 'Title');
            const indexOfState = ths_of_thead.findIndex(th => th.innerText === 'State');
            const indexOfAssignedTo = ths_of_thead.findIndex(th => th.innerText === 'Assigned To');
            const indexOfEffort = ths_of_thead.findIndex(th => th.innerText === 'Effort');
            const indexOfRealEffort = ths_of_thead.findIndex(th => th.innerText === 'Real Effort');

            const trs = Array.from(table.getElementsByTagName('tr'));
            const totals = {
                effort: 0,
                realEffort: 0
            };
            trs.forEach((tr, index) => {
                const tds = Array.from(tr.getElementsByTagName('td'));
                if (tds.length < 5) return;
                if (tds[indexOfEffort].innerText !== '') {
                    totals.effort += parseFloat(tds[indexOfEffort].innerText);
                }
                if (tds[indexOfRealEffort].innerText !== '') {
                    totals.realEffort += parseFloat(tds[indexOfRealEffort].innerText);
                }
            });
            console.log('Totals:', totals);
            // alert(`Effort: ${totals.effort}\nReal Effort: ${totals.realEffort}`);
            return totals;
        }
    }
}

const PrintTotals = () => {
    totals = GetTotals();
    alert(`Effort: ${totals.effort}\nReal Effort: ${totals.realEffort}`);
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: PrintTotals
        });
    }
});