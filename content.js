console.log("El archivo content.js se ha cargado correctamente.");

// // content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Contenido del sitio actual:", request.content);
    if (request.action === "getContent") {
        sendResponse({ content: document.documentElement.innerHTML });
    }
});