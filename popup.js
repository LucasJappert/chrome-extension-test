console.log("El archivo popup.js se ha cargado correctamente.");

// // Agregar un listener para cuando el documento esté completamente cargado
// document.addEventListener("DOMContentLoaded", function() {
//     // Obtener el contenido length del sitio actual
//     const htmlContent = document.documentElement.innerHTML;
//     // Imprimir el contenido length en la consola
//     console.log("Contenido length del sitio actual:", htmlContent.length);
//     console.log("Contenido del sitio actual:", htmlContent);
// });


// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     console.log("tabs", tabs);
//     chrome.tabs.sendMessage(tabs[0].id, { action: "getContent" }, function (response) {
//         console.log(response);
//         // console.log("Contenido del sitio actual:", response.content);
//     });
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    alert("¡Hola, este es mi mensaje!")
    console.log("Contenido del sitio actual:", request.content);
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
});

document.getElementById('message').textContent = "¡Hola, este es mi mensaje!";
