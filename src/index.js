import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/countryCardTpl.hbs';
import countriesListTpl from './templates/countriesListTpl.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/getRefs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { notice } from '@pnotify/core';

// console.dir(debounce);
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.value;
  console.log(searchQuery);

  if (searchQuery === '') {
    refs.cardContainer.innerHTML = '';
    return;
  }

  refs.cardContainer.innerHTML = '';

  API.fetchCountries(searchQuery)
    .then(countries => {
      if (countries.status === 404) {
        notice({
          text: `Error: enter more correctly`,
          styling: `brighttheme`,
          delay: 2000,
        });
        return;
      }
      if (countries.length > 10) {
        error({
          title: `Too many matches found.`,
          text: `We found ${countries.length} countries. Please enter a more specific query!`,
          styling: 'brighttheme',
          delay: 2000,
        });
        return;
      }
      if (countries.length > 1 && countries.length <= 10) {
        const markupList = countriesListTpl(countries);
        refs.cardContainer.insertAdjacentHTML('afterbegin', markupList);
        return;
      }
      if (countries.length === 1) {
        const markup = countryCardTpl(countries);
        refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
        return;
      }
    })
    .catch(() => {
      notice({
        text: `Error: enter more correctly`,
        styling: `brighttheme`,
        delay: 2000,
      });
      return;
    });

  // if (!countries) {
  //   return;
  // }
  // console.log(countries);
  // if (countries.length === 1) {
  //   countries.map(renderCountryCard);
  //   return;
  // } else if (countries.length > 10) {
  //   console.log('Введите больше букв');
  // } else {
  //   countries.map(renderCountriesList);
  // }
}

// function renderCountryCard(countries) {
//   const markup = countryCardTpl(countries);
//   console.log(markup);

//   refs.cardContainer.insertAdjacentHTML('afterbegin', markup);
// }

// function renderCountriesList(countries) {
//   const markupList = countriesListTpl(countries);
//   console.log(markupList);

//   refs.cardContainer.insertAdjacentHTML('afterbegin', markupList);
// }

// const BASE_URL = 'https://restcountries.eu/rest/v2';
// function fetchCountry(searchQuery) {
//   const url = `${BASE_URL}/name/${searchQuery}`;
//   return fetch(url).then(r => r.json());
// }

// API.fetchCountries(name).then(console.log);
