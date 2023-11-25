
class TurboStream extends HTMLElement {
    constructor() {
        super();

        this[this.action]();

        // Execute our action => update the target elem => then remove our web comp
        this.remove();
    }

    get action() {
        return this.getAttribute('action');
    }

    get target() {
        return this.getAttribute('target');
    }

    get template() {
        return this.firstElementChild;
    }

    update() {
        const target = document.getElementById(this.target);

        target.innerHTML = '';

        target.append(this.template.content);
    }
}
customElements.define('turbo-stream', TurboStream);