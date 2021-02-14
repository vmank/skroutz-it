class SearchWindow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let query = this.getAttribute( 'query' );
        let icon = chrome.runtime.getURL( "assets/icons/logo.png" );

        this.className = "";
        this.innerHTML = `
            <div class="wrapper">
                <div class="header">
                    <img class="logo" src='${ icon }'>
                    <h1 class="title"> You are searching for: ${ query } </h1>
                    <a class="close"></a>
                </div>
                <div class="content">
                </div>
            </div>
        `;

        this.addEventListener( 'click', (e) => {
            e.target.className;


            if( "close" ) {
                e.target.closest("search-window").remove();
            }
        } );


        let shadowRoot = this.querySelector('.content').attachShadow({mode: 'open'});
        shadowRoot.innerHTML = "";
    }

}

window.customElements.define( 'search-window', SearchWindow );


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if ( request.query != "" ) {
            let e = document.createElement('search-window');

            e.setAttribute( 'query', request.query );
            e.setAttribute( 'status', 'open' );

            document.body.appendChild( e );
        }
    }
);
