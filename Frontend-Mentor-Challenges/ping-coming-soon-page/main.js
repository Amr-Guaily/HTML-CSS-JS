const submitBtn = document.querySelector('.input-field button'),
  emailInput = document.querySelector('.input-field input'),
  errorMsg = document.querySelector('.input-field small');

submitBtn.addEventListener('click', () => {
  if (!emailInput.value || !isValid(emailInput.value)) {
    emailInput.classList.add('error');
    errorMsg.style.display = 'block';
  } else {
    emailInput.classList.remove('error');
    errorMsg.style.display = 'none';
  }
});

function isValid(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}
