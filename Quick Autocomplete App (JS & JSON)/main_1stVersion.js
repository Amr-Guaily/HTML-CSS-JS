// Selectors
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Events
search.addEventListener('input', () => filterData(search.value));

// Functions
function filterData(searchText) {
  fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
      let matches = data.filter((state) => {
        const regx = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regx) || state.abbr.match(regx);
      });

      outputHtml(matches);

      if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
      }
    });
}

function outputHtml(matches) {
  if (matches.length > 0) {
    let output = '';
    matches.forEach((match) => {
      output += `<div class='card card-body mb-1'>
                <h4>${match.name} (${match.abbr})
                <span class='text-primary'>${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>`;
      matchList.innerHTML = output;
    });
  }
}
