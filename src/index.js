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
  const nameCountries = e.target.value.trim();

  clearMarkup();

  if (!nameCountries) {
    return;
  }
  fetchCountries(nameCountries).then(getCountries).catch(fetchError);
}

function getCountries(countries) {
  const amountCountries = countries.length;

  if (amountCountries === 1) {
    markupCountryInfo(...countries);
  } else if (amountCountries >= 2 && amountCountries <= 10) {
    markupCountryList(countries);
  } else if (amountCountries > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Amount: ${amountCountries} Please enter a more specific name.`
    );
  }
}

function fetchError() {
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

  const markup = `
  <p class="country">
  <img class="flag-img" src="${urlFlags}" alt="${name}">
  <span class="name-country">${name}</span>
  </p>
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
      return `
      <li>
      <img class="flag-img" src="${flags}" alt="${name}">
      <span class="name-country">${name}</span>
      </li>`;
    })
    .join('');

  countryListRef.innerHTML = markup;
}

function clearMarkup() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
