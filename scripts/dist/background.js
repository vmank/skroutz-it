// Create ContextMenu
browser.contextMenus.create( {
    id: "skroutz-search",
    title: "SkroutzIt",
    contexts: ["selection"]
} );

// Event Listener
browser.contextMenus.onClicked.addListener( (info, tab) => {
    if (info.menuItemId = "skroutz-search") {
        // console.log(tab, info)
        sendMessageToTab(tab);
    }
} );



function sendMessageToTab(tab) {
    chrome.tabs.sendMessage(
        tab.id,
        {greeting: "hi"}
    );
}