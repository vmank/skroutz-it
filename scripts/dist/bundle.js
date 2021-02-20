class SearchWindow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let query = this.getAttribute( 'query' );
        let icon = browser.runtime.getURL( 'assets/icons/logo.png' );

        this.className = "";
        this.innerHTML = `
            <div class="wrapper">
                <div class="header">
                    <img class="logo" src='${ icon }' draggable="false">
                    <h1 class="title"> You are searching for: ${ query } </h1>
                    <div class="buttons-container">
                        <a class="minimize"></a>
                        <a class="close"></a>
                    </div>
                </div>
                <div class="content">
                </div>
            </div>
        `;


        this.addEventListener( 'click', e => {
            let targetElementClass = e.target.className;

            switch (targetElementClass) {
                case 'close':
                    e.target.closest("search-window").remove();
                    break;
                case 'minimize':
                    console.log('minimize');
                    break;
            }
        } );


        this.addEventListener( 'mousedown', e => {
            let cursorFromTargetX = e.layerX;
            let cursorFromTargetY = e.layerY;

            let originalTarget = e.originalTarget.className;
            let targetParentNode = e.target.parentNode.className;

            let mouseUp = false;
            let mouseUpToggle = () => { mouseUp = !mouseUp; };

            console.log( e );

            // On mousemove
            this.addEventListener( 'mousemove', e => {

                // While user is holding click
                if ( !mouseUp ) {
                    if( originalTarget == 'header' || targetParentNode == 'header' ) {
                        let cursorFromWindowX = e.pageX;
                        let cursorFromWindowY = e.pageY;

                        this.style.left = `${cursorFromWindowX - cursorFromTargetX}px`;
                        this.style.top = `${cursorFromWindowY - cursorFromTargetY}px`;
                    }
                } else {
                    this.removeEventListener( 'mouseup', mouseUpToggle );
                }
            } );


            this.addEventListener( 'mouseup', mouseUpToggle );

        } );



        let shadowRoot = this.querySelector( '.content' ).attachShadow( {mode: 'open'} );

        let searchIframeStyles = document.createElement( 'style' );

        searchIframeStyles.textContent = `
            iframe {
                border: unset;
                width: 100%;
            }
        `;


        let searchIframe = document.createElement( 'iframe' );

        shadowRoot.appendChild( searchIframeStyles );
        shadowRoot.appendChild( searchIframe );

        searchIframe.setAttribute( 'name', 'skroutz-search' );
        searchIframe.setAttribute( 'src', `https://www.skroutz.gr/search?keyphrase=${ query.replace( /\s/g, '' ) }#sku-list` );

    }


}

window.customElements.define( 'search-window', SearchWindow );


browser.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if ( request.query != "" ) {
            let e = document.createElement('search-window');

            e.setAttribute( 'query', request.query );
            e.setAttribute( 'status', 'open' );

            document.body.appendChild( e );
        }
    }
);
