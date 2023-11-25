const template2 = document.createElement('template');

template2.innerHTML = `
<style>
    div {
        display: flex;
        align-items: center;
        gap: 3px;
    }

    .counter {
        font-size: 21px;
        font-weight: bold;
    }
</style>

<div>
    <p class="counter"></p>
    <span>Words</span>
</div>

`;

class TextCount extends HTMLElement {
    constructor() {
        super();
        const parent = this.parentElement;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template2.content.cloneNode(true));

        this.shadowRoot.querySelector('.counter').textContent = `${this.countWords(parent)}`;

        setInterval(() => {
            this.shadowRoot.querySelector('.counter').textContent = `${this.countWords(parent)}`;
        });

    }

    countWords(node) {
        const text = node.innerText || node.textContent;

        return text.split(/\s+/g).length;
    }

}

customElements.define('text-count', TextCount);