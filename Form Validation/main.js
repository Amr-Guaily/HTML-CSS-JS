let id = (id) => document.getElementById(id);

// Selectors
let username = id('username'),
  email = id('email'),
  password = id('password'),
  confirmPassword = id('confirmPassword');

let form = document.querySelector('form');
let submitBtn = document.querySelector(".register-btn");
let errorDivs = document.getElementsByClassName('error'),
  success = document.querySelector('.success');

// Functions
function emailValidation(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
function emailHandler() {
  if (emailValidation(email.value)) {
    setSucess(email, 1);
    return true;
  } else if (email.value.trim() === '') {
    setError(email, "Email can't be a blank..");
  } else {
    setError(email, 'please enter a vaild email..');
  }
}

function usernameHandler() {
  var regex = /^[a-z][a-zA-Z0-9]{5,15}[a-z]$/;
  if (regex.test(username.value)) {
    setSucess(username, 0);
    return true;
  } else {
    setError(username, 'The userName must consist (5-15) characters, only letters and numbers are allowed, No number at the begining or the end');
  }
}

function passwordHandler() {
  if (password.value.length < 8) {
    setError(password, 'Password must be at least 8 characters');
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "password didn't match...");
    setSucess(password, 2);
  } else {
    setSucess(confirmPassword, 3);
    return true;
  }
}

function setSucess(input, idx) {
  input.style.border = '2px solid green';
  errorDivs[idx].textContent = '';
}
function setError(input, mesg) {
  input.style.border = '2px solid red';

  if (input.id === 'username') errorDivs[0].textContent = mesg;
  if (input.id === 'email') errorDivs[1].textContent = mesg;
  if (input.id === 'password') errorDivs[2].textContent = mesg;
  if (input.id === 'confirmPassword') errorDivs[3].textContent = mesg;
}

function validationHandler() {
  let isValidEmail = emailHandler(),
    isValidName = usernameHandler(),
    isValidPassword = passwordHandler();

  if (isValidName && isValidEmail && isValidPassword) return true;
}

function submitHandler(e) {
  e.preventDefault();

  // Check if form is valid or not before send the request
  const isValidForm = validationHandler();

  // If validation passed successfully, then collect form data and send post req to an API
  if (isValidForm) {
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };
    // send Post Request
    fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        // Check response.ok
        if (res.ok) {
          return res.json();
        }
        // reject if not OK, instead of throw an error
        return Promise.reject(res);
      })
      .then((data) => {
        // successfully Signed up, then navigate to home page and store user data in local storage
        localStorage.setItem('userData', JSON.stringify(data));
        window.location = './home.html';
      })
      .catch((res) => {
        console.log(res.status, res.statusText);
        // get error message, if any
        res.json().then(({ errors }) => serverErrorHandler(errors));
      });
  }
}
function serverErrorHandler(errors) {
  let keys = Object.keys(errors);
  keys.forEach((key) => {
    // Select error input
    let input = id(key);
    setError(input, errors[key][0]);
  });
}
// Events
form.addEventListener('submit', (e) => submitHandler(e));
