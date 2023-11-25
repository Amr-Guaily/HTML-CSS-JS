const template = document.createElement('template');

template.innerHTML = `
    <style>
        select {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            border: 1px solid #ccc;
            margin-bottom: 0.5rem;
        }
    </style>

    <select></select>
`;

class DriverList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.driverListElement = this.shadowRoot.querySelector('select');
    }

    connectedCallback() {
        this.driverListElement.addEventListener('change', () => {
            const driverId = this.driverListElement.value;
            const driver = this.drivers.find((driver) => driver.driverId === driverId);

            this.dispatchEvent(new CustomEvent('driver-selected', { detail: driver }));
        });
    }

    get drivers() {
        return this._drivers;
    }
    set drivers(value) {
        this._drivers = value;
        this.#render();
    }

    #render() {
        this.drivers.forEach((driver) => {
            const option = document.createElement('option');
            option.value = driver.driverId;
            option.textContent = `${driver.givenName} ${driver.familyName}`;
            this.driverListElement.appendChild(option);
        });
    }
}

customElements.define('driver-list', DriverList);;