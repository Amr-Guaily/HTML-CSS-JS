const submitBtn = document.querySelector('.input-field button'),
  emailInput = document.querySelector('.input-field input'),
  errorMsg = document.querySelector('.input-field small'),
  errorIcon = document.querySelector('.error-icon');

submitBtn.addEventListener('click', () => {
  if (!emailInput.value || !isValid(emailInput.value)) {
    emailInput.classList.add('error');
    errorIcon.style.display = 'block';
    errorMsg.innerText = 'Please provide a vaild email';
    errorMsg.style.display = 'block';
  } else {
    emailInput.classList.remove('error');
    errorIcon.style.display = 'none';
    errorMsg.innerText = '';
    errorMsg.style.display = 'none';
    // clear field
    emailInput.value = '';
  }
});

function isValid(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}
