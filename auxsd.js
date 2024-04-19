{
    "manifest_version": 3,
    "name": "Mi Extensión",
    "version": "1.0",
    "description": "Esta es una extensión para recorrer y leer el DOM de la página actual.",
    "permissions": [
        "activeTab", "storage", "scripting"
    ],
    "action": {
        "default_popup": "popup.html",
        "default_icon": "icon.png"
    },
    "icons": {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
    },
    "background": {
        "service_worker": "service_worker.js"
    },
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
                "content.js"
            ]
        }
    ]
}