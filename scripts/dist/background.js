// Create ContextMenu
browser.contextMenus.create( {
    id: "skroutz-search",
    title: "SkroutzIt",
    contexts: ["selection"]
} );

// Event Listener
browser.contextMenus.onClicked.addListener( (info, tab) => {
    if (info.menuItemId = "skroutz-search") {
        sendMessageToTab(tab, info);
    }
} );



function sendMessageToTab(tab, info) {
    chrome.tabs.sendMessage(
        tab.id,
        { query: info.selectionText }
    );
}