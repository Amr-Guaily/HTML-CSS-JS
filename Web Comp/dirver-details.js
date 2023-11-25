class DeiverDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get driver() {
        return this._driver;
    }

    set driver(value) {
        this._driver = value;
        this.#render();
    }

    #render() {
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    padding-bottom: 0.5rem;
                }
            </style>
            <h2>${this.driver.givenName} ${this.driver.familyName}</h2>
            <ul>
                <li>Permanent Number: ${this.driver.permanentNumber}</li>
                <li>Date of Birth: ${this.driver.dateOfBirth}</li>
                <li>Nationality: ${this.driver.nationality}</li>
            </ul>
        `;
    }
}

customElements.define('driver-details', DeiverDetails);