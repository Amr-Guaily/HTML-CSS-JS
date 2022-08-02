// Selectors
const form = document.querySelector('form'),
  submitBtn = document.querySelector('form button');

// Events
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // input fields
  const fName = form['fName'],
    lName = form['lName'],
    email = form['email'],
    password = form['password'];

  // validation
  if (!fName.value) {
    addError(fName, 'First Name cannot be empty');
  } else {
    removeError(fName);
  }

  if (!lName.value) {
    addError(lName, 'Last Name cannot be empty');
  } else {
    removeError(lName);
  }

  if (!email.value) {
    addError(email, 'Email is required');
  } else if (!isValid(email.value)) {
    addError(email, 'Email is not valid');
  } else {
    removeError(email);
  }

  if (!password.value) {
    addError(password, 'Password cannot be empty');
  } else {
    removeError(password);
  }
});

// Functions
function addError(inputField, msg) {
  inputField.classList.add('error');
  inputField.placeholder = '';
  inputField.nextElementSibling.innerText = msg;
  const errorIcon = inputField.parentElement.querySelector('i');
  errorIcon.style.display = 'block';
}

function isValid(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

function removeError(inputField) {
  inputField.classList.remove('error');
  inputField.nextElementSibling.innerText = '';
  const errorIcon = inputField.parentElement.querySelector('i');
  errorIcon.style.display = 'none';
}
