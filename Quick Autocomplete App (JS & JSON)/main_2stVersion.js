// Selectors
const searchInput = document.querySelector('.form-group input'),
  matchList = document.querySelector('#match-list');

// Events
searchInput.addEventListener('keyup', () => dataHandler(searchInput.value));

// Functions
function dataHandler(searchText) {
  fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
      let matches = data
        .filter((state) => {
          const regx = new RegExp(`^${searchText}`, 'gi');
          return state.name.match(regx) || state.abbr.match(regx);
        })
        .map((state) => {
          return `<div class='card card-body mb-1'>
                    <h4>${state.name} (${state.abbr})
                    <span class='text-primary'>${state.capital}</span></h4>
                    <small>Lat: ${state.lat} / Long: ${state.long}</small>
                </div>`;
        })
        .join('');
      matchList.innerHTML = matches;

      if (searchText.length == 0) {
        matchList.innerHTML = '';
      }
    });
}
