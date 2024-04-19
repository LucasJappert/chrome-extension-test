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

function reddenPage() {
    console.log(document.documentElement.innerHTML.length);
    // console.log(document.getElementById('app').textContent);
    const aElements = document.getElementsByTagName('a');
    for (let aElement of aElements) {
        console.log(aElement.innerHTML);
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: reddenPage
        });
    }
});