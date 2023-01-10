const BASE_URL = 'https://restcountries.com/v3.1';
const filters = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?${filters}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    return response.json();
  });
}

export { fetchCountries };
