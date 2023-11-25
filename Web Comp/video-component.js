const template3 = document.createElement('template');

template3.innerHTML = `
    <style>
        video {
            width: 100%;
        }
    </style>

    <div></div>
`;

class VideoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template3.content.cloneNode(true));
        this.videoElement = this.shadowRoot.querySelector('div');
    }

    static get observedAttributes() {
        return ['youtube', 'vimeo', 'html5'];
    }
    /**
     * @param {any} value
     */
    set youtube(value) {
        this.videoElement.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }

    /**
     * @param {any} value
     */
    set vimeo(value) {
        this.videoElement.innerHTML = `<iframe src="https://player.vimeo.com/video/${value}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }

    /**
     * @param {any} value
     */
    set html5(value) {
        this.videoElement.innerHTML = `<video src="${value}" controls type="video/mp4" muted></video>`;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // This method is called when an observed attribute changes
        switch (attrName) {
            case 'youtube':
                this.youtube = newValue;
                break;
            case 'vimeo':
                this.vimeo = newValue;
                break;
            case 'html5':
                this.html5 = newValue;
                break;
            default:
                break;
        }
    }
}

customElements.define('video-component', VideoComponent);

const container = document.querySelector('section.categories-section .container');

function fetchCategories() {
    if (!container) return;

    const result = [];

    const anchors = container.querySelectorAll('a');
    anchors.forEach(item => {
        const href = item.href;
        const img = item.querySelector('.categories-col-img-container img').src;
        const name = item.querySelector('h2');
        result.push({ href, img, name });
    });

    return result;
}

(function renderCategories() {
    const categories = fetchCategories();

    if (categories.length < 1) return;

    console.log(categories);

    container.innerHTML = `
    <div>
        <h2 class="text-center text-3xl font-medium text-[#1b1b2b]">تسـوق الآن</h2>
        <p class="text-center text-2xl text-[#1b1b2b] pb-8 !pt-4">تميّز بتشكيلتنا المميزة</p>
    </div>`;

    const categoriesWrapper = document.createElement('div');
    categoriesWrapper.classList.add('categories-wrapper');
    categories.forEach(({ href, img, name }) => {
        const category = document.createElement('div');
        category.classList.add('category-item');

        category.innerHTML = `
            <a href="${href}">
                <img src="${img}" alt="${name}" class="w-[90px] h-[90px] rounded-full object-cover sm:w-[120px] sm:h-[120px]"/>
                <h3>${name}</h3>
            </a>
        `;
        categoriesWrapper.appendChild(category);
    });

    container.appendChild(categoriesWrapper);
})();