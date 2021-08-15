// https://restcountries.eu/rest/v2/name/{name}
const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
  const url = `${BASE_URL}/name/${searchQuery}`;
  return fetch(url)
    .then(response => response.json())
    .catch(x => console.log(`Это ошибка кетч!`));
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
