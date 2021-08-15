import './sass/main.scss';
// import _ from 'lodash.debounce';
import countryCardTpl from './templates/countryCardTpl.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/getRefs';

const refs = getRefs();
// debounce(console.log('Debounce console log:', refs), 500);
// const name = 'ukraine';

refs.input.addEventListener('input', onSearch);

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.value;
  console.log(searchQuery);

  // API.fetchCountries(searchQuery).then(console.log);
  // API.fetchCountries(searchQuery).then(countries => countries.map(renderCountryCard));
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  console.log(markup);

  refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
}

// const BASE_URL = 'https://restcountries.eu/rest/v2';
// function fetchCountry(searchQuery) {
//   const url = `${BASE_URL}/name/${searchQuery}`;
//   return fetch(url).then(r => r.json());
// }

// API.fetchCountries(name).then(console.log);
