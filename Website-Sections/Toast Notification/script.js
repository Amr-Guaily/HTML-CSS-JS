const notificationList = document.querySelector(".notifications"),
    buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success: This is a success toast.',
    },
    error: {
        icon: 'fa-circle-xmark',
        text: 'Error: This is an error toast.',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning: This is a warning toast.',
    },
    info: {
        icon: 'fa-circle-info',
        text: 'Info: This is an information toast.',
    }
};

// Functions
function createToast(type) {
    const { icon, text } = toastDetails[type];

    const toast = document.createElement('li');
    toast.innerHTML = `<div class="column">
    <i class="fa-solid ${icon}"></i>
    <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;

    toast.classList.add('toast', `${type}`);
    notificationList.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}

function removeToast(toast) {
    toast.classList.add('hide');
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 300);
}

// Events
buttons.forEach(btn => btn.addEventListener('click', () => createToast(btn.id)));