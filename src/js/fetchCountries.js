import { error } from '../../node_modules/@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
// https://restcountries.eu/rest/v2/name/{name}
const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
  const url = `${BASE_URL}/name/${searchQuery}`;
  return fetch(url).then(response => {
    // if (!response.ok) {
    // error({ text: 'Country named does not exist' });
    // return;
    // }
    return response.json();
  });
  // .catch(e => {
  //   error({ text: 'Country named does not exist' });
  //   return;
  // });
}

export default { fetchCountries };

// fetch('https://restcountries.eu/rest/v2/all')
//   .then(response => {
//     return response.json();
//   })
//   .then(country => {
//     console.log(country);
//   })
//   .catch(error => {
//     console.log(error);
//   });
