import SearchWindow from './SearchWindow.js'; // Or it could be simply `hello.js`

let o = new SearchWindow('hi');
// console.log(o.getQuery());


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.greeting === "hi") {
            console.log("hello");
        }
    }
);