const notificationList = document.querySelector('.notifications');
const successBtn = document.querySelector('#success'),
    errorBtn = document.querySelector('#error'),
    warningBtn = document.querySelector('#warning'),
    infoBtn = document.querySelector('#info');


// Functions
function successToast() {
    const toast = document.createElement('li');
    toast.innerHTML = `<div class="column">
    <i class="fa-solid fa-circle-check"></i>
    <span>Success: This is a success toast.</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;

    toast.classList.add('toast', 'success');
    notificationList.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}
function errorToast() {
    const toast = document.createElement('li');
    toast.innerHTML = `<div class="column">
    <i class="fa-solid fa-circle-xmark"></i>
    <span>Error: This is an error toast.</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;

    toast.classList.add('toast', 'error');
    notificationList.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}
function warningToast() {
    const toast = document.createElement('li');
    toast.innerHTML = `<div class="column">
    <i class="fa-solid fa-circle-check"></i>
    <span>Success: This is a success toast.</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;

    toast.classList.add('toast', 'warning');
    notificationList.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}
function infoToast() {
    const toast = document.createElement('li');
    toast.innerHTML = `<div class="column">
    <i class="fa-solid fa-circle-check"></i>
    <span>Success: This is a success toast.</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;

    toast.classList.add('toast', 'info');
    notificationList.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}

function removeToast(toast) {
    toast.classList.add('hide');
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 300);
}

// Events
successBtn.addEventListener('click', successToast);
errorBtn.addEventListener('click', errorToast);
warningBtn.addEventListener('click', warningToast);
infoBtn.addEventListener('click', infoToast);