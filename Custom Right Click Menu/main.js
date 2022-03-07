const contextMenu = document.querySelector('.container'),
  subMenu = document.querySelector('.sub-menu');

document.addEventListener('contextmenu', (e) => {
  // preventing default context menu of the browser
  e.preventDefault();

  // ** If i click to the right corner, then overflowing or hiding!?
  let x = e.offsetX,
    y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;

  x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
  y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

  // ** Move submMenu to the left side, if there is no space!?
  if (x > winWidth - cmWidth - subMenu.offsetWidth) {
    subMenu.style.left = '-200px';
  } else {
    subMenu.style.left = '';
    subMenu.style.right = '-200px';
  }

  contextMenu.style.visibility = 'visible';
  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;
});
