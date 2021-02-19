// Create ContextMenu
browser.contextMenus.create( {
    id: "skroutz-search",
    title: "SkroutzIt",
    contexts: ["selection"]
} );


// Context menu onClicked listener
browser.contextMenus.onClicked.addListener( (info, tab) => {
    if (info.menuItemId = "skroutz-search") {
        sendMessageToTab(tab, info);
    }
} );


function sendMessageToTab(tab, info) {
    browser.tabs.sendMessage(
        tab.id,
        { query: info.selectionText }
    );
}