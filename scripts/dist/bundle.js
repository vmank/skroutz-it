'use strict';

// console.log(o.getQuery());


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.greeting === "hi") {
            console.log("hello");
        }
    }
);
