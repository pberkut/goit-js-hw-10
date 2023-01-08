import './css/styles.css';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
  const queryCountries = e.target.value.trim();

  if (queryCountries) {
    fetchCountries(queryCountries).then(countries => {
      if (countries.length === 1) {
        markupCountryInfo(...countries);
      } else if (countries.length >= 2 && countries.length <= 10) {
        markupCountryList(countries);
      } else if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    });
  }
}

function markupCountryInfo(country) {
  const {
    name: { official: name },
    capital,
    population,
    flags: { svg: flags },
    languages,
  } = country;

  return;
}

function markupCountryList(countries) {
  const markup = countries
    .map(({ name: { official: name }, flags: { svg: flags } }) => {
      return ` <li><img class="flag-img" src="${flags}" alt="${name}"> <span class="name-country">${name}</span></li>`;
    })
    .join('');

  countryListRef.innerHTML = markup;
}
