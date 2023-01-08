import './css/styles.css';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const queryCountries = e.target.value.trim();

  if (!queryCountries) {
    clearMarkup();
    return;
  }
  fetchCountries(queryCountries).then(getCountries).catch(fetchError);
}

function getCountries(countries) {
  if (countries.length === 1) {
    clearMarkup();
    markupCountryInfo(...countries);
  } else if (countries.length >= 2 && countries.length <= 10) {
    clearMarkup();
    markupCountryList(countries);
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function fetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function markupCountryInfo(country) {
  const {
    name: { official: name },
    capital,
    population,
    flags: { svg: urlFlags },
    languages,
  } = country;

  const languagesCountry = Object.values(languages).join(', ');

  const markup = `<p class="country"><img class="flag-img" src="${urlFlags}" alt="${name}"> <span class="name-country">${name}</span></p>
  <ul>
  <li class="item">Capital: <span class="text">${capital}</span></li>
  <li class="item">Population: <span class="text">${population}</span></li>
  <li class="item">Languages: <span class="text">${languagesCountry}</span></li>
  </ul>`;

  countryInfoRef.innerHTML = markup;
}

function markupCountryList(countries) {
  const markup = countries
    .map(({ name: { official: name }, flags: { svg: flags } }) => {
      return ` <li><img class="flag-img" src="${flags}" alt="${name}"> <span class="name-country">${name}</span></li>`;
    })
    .join('');

  countryListRef.innerHTML = markup;
}

function clearMarkup() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
