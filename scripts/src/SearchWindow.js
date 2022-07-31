export default class SearchWindow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let query = this.getAttribute( 'query' );
        let icon = browser.runtime.getURL( 'assets/icons/search_window_logo.png' )

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


        let mouseUp = true;

        let movementState = {
            targetIsHeader: false,
            position: {
                x: 0,
                y: 0
            }
        }


        let mouseUpToggle = () => {
            mouseUp = !mouseUp;
        }


        let onMouseDown = (e) => {
            movementState.targetIsHeader = false;

            if( mouseUp ) {
                mouseUpToggle();
            }

            let originalTarget = e.originalTarget.className;
            let targetParentNode = e.target.parentNode.className;

            movementState.targetIsHeader = originalTarget == 'header' || targetParentNode == 'header';

            if( movementState.targetIsHeader ) {
                movementState.position.x = Math.abs(this.offsetLeft - e.clientX);
                movementState.position.y = Math.abs(this.offsetTop - e.clientY);
            }
        }


        let onMouseMove = (e) => {
            // While user is holding click
            if ( !mouseUp ) {
                if( movementState.targetIsHeader ) {
                    this.style.left = `${e.clientX - movementState.position.x}px`;
                    this.style.top = `${e.clientY - movementState.position.y}px`;
                }
            }
        }


        // Capture mousedown only on search-window
        this.addEventListener( 'mousedown', onMouseDown );

        // Capture mousemove on body for smooth movement
        document.body.addEventListener( 'mousemove', onMouseMove );

        // Capture mouseup on body to ensure that if a user
        // releases the MB1-2 the search-window will stop moving
        document.body.addEventListener( 'mouseup', e => {
            if( mouseUp == false ) {
                mouseUpToggle();
            }
        });


        // Attach Shadow DOM
        let shadowRoot = this.querySelector( '.content' ).attachShadow( {mode: 'open'} );

        let searchIframeStyles = document.createElement( 'style' );

        searchIframeStyles.textContent = `
            iframe {
                border: unset;
                height: 100%;
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

customElements.define( 'search-window', SearchWindow );