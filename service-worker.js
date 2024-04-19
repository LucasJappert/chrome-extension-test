// console.log("El archivo background.js se ha cargado correctamente.");

// // background.js
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("onInstalled...");
//     chrome.action.onClicked.addListener((tab) => {
//         console.log("Tab", tab);
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             function: getContent,
//         }).then(results => {
//             // results is an array of results from each frame in the tab where the script was injected
//             for (let result of results) {
//                 chrome.runtime.sendMessage({ content: result.result });
//             }
//         });
//     });
// });

// function getContent() {
//     return document.documentElement.innerHTML;
// }

// function ReadTable() {
//     console.log(document.documentElement.innerHTML.length);



//     // console.log(document.getElementById('app').textContent);
//     const aElements = document.getElementsByTagName('a');
//     for (let aElement of aElements) {
//         console.log(aElement.innerHTML);
//     }
// }

function ReadTable() {
    // Obtén todas las tablas en el documento
    let tables = document.getElementsByTagName('table');

    // Itera sobre las tablas
    for (let table of tables) {
        // Comprueba si la tabla tiene la clase deseada
        if (table.classList.contains('backlog-tree')) {
            
            const ths_of_thead = Array.from(table.getElementsByTagName('th'));
            ths_of_thead.forEach((th, index) => {
                console.log(index, th.innerText);
            });

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
                // console.log(tds[indexOfOrder].innerText, tds[indexOfID].innerText, tds[indexOfTitle].innerText, tds[indexOfState].innerText, tds[indexOfAssignedTo].innerText, tds[indexOfEffort].innerText, tds[indexOfRealEffort].innerText);
                if (tds[indexOfEffort].innerText !== '') {
                    totals.effort += parseFloat(tds[indexOfEffort].innerText);
                }
                if (tds[indexOfRealEffort].innerText !== '') {
                    totals.realEffort += parseFloat(tds[indexOfRealEffort].innerText);
                }
            });
            console.log('Totals:', totals);

            return;

        }
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: ReadTable
        });
    }
});