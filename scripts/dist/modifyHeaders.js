var extraInfoSpec = ['blocking', 'responseHeaders'];
var filter = {
    urls: ['https://www.skroutz.gr/*']
};

// Bypass X-Frame-Options
browser.webRequest.onHeadersReceived.addListener(
    modifyHeadersCallback,
    filter,
    extraInfoSpec
);


// onHeadersReceived Callback
function modifyHeadersCallback(details) {
    let modifiedResponseHeaders = details.responseHeaders.filter(
        header => !(header.name.toLowerCase() == 'x-frame-options' || header.name.toLowerCase() == 'content-security-policy')
    );

    return {responseHeaders: modifiedResponseHeaders};
};