import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/countryCardTpl.hbs';
import countriesListTpl from './templates/countriesListTpl.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/getRefs';
// import { error } from '../../node_modules/@pnotify/core/dist/PNotify';

// console.dir(debounce);
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.value;
  console.log(searchQuery);

  refs.cardContainer.innerHTML = '';

  API.fetchCountries(searchQuery).then(countries => {
    if (!countries) {
      return;
    }
    console.log(countries);

    if (countries.length === 1) {
      countries.map(renderCountryCard);
      return;
    } else if (countries.length > 10) {
      console.log('Введите больше букв');
    } else {
      countries.map(renderCountriesList);
    }
  });
}

function renderCountryCard(countries) {
  const markup = countryCardTpl(countries);
  console.log(markup);

  refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
}

function renderCountriesList(countries) {
  const markupList = countriesListTpl(countries);
  console.log(markupList);

  refs.cardContainer.insertAdjacentHTML('afterbegin', markupList);
}

// const BASE_URL = 'https://restcountries.eu/rest/v2';
// function fetchCountry(searchQuery) {
//   const url = `${BASE_URL}/name/${searchQuery}`;
//   return fetch(url).then(r => r.json());
// }

// API.fetchCountries(name).then(console.log);
