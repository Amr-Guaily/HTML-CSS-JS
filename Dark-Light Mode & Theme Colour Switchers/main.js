const colorSwitcher = document.querySelector('.icons'),
  colorBox = document.querySelector('.color-box'),
  colorBtns = document.querySelectorAll('.btn');

colorSwitcher.addEventListener('click', () => {
  colorBox.classList.toggle('open');
});

colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    colorBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');
    colorBox.classList.remove('open');

    const root = document.querySelector(':root'),
      dataColor = btn.getAttribute('data-color').split(' ');

    root.style.setProperty('--white', dataColor[0]);
    root.style.setProperty('--black', dataColor[1]);
    root.style.setProperty('--nav-main', dataColor[2]);
    root.style.setProperty('--switchers-main', dataColor[3]);

    let moonIcon = btn.className.split(' ')[2];
    if (btn.classList.contains('fa-moon')) {
      btn.classList.replace(moonIcon, 'fa-sun');
      colorSwitcher.parentElement.style.display = 'none';
    } else if (btn.classList.contains('fa-sun')) {
      btn.classList.replace('fa-sun', 'fa-moon');
      document.querySelector('.btn.blue').click();
      colorSwitcher.parentElement.style.display = 'block';
    }
  });
});
