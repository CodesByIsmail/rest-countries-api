import { getAllCountries, state } from "./model.js";
import countriesView from "./views/countriesView.js";
import countryInfoView from "./views/countryInfoView.js";
import {
  addCountries,
  storeTheme,
  getTheme,
  storeThemetTheme,
  setTheme,
} from "./helper.js";

import data from "../data.json";

const countriesContainer = document.querySelector(".countries");
const filterContainer = document.querySelector(".filter__region");
const filterListWrapper = document.querySelector(".filter__wrapper");
const searchInput = document.querySelector(".search__input");
const themeToggler = document.querySelector(".theme__toggler");

// let allCountriesData = [];

async function controlCountries() {
  state.allCountriesData = data;
  console.log(state.allCountriesData);
  countriesView.clear();
  state.allCountriesData.forEach((data) => {
    countriesView.renderCountries(data);
  });
}

controlCountries();

async function controlFilterCountries() {}

filterContainer.addEventListener("click", (e) => {
  filterListWrapper.classList.toggle("hidden");
  if (!e.target.classList.contains("filter__list")) return;
  const selectedFilter = e.target.dataset.value;
  console.log(selectedFilter);
  const countries = getCountryByFilter(selectedFilter);
  console.log(countries);
  countriesView.clear();
  countries.forEach((country) => {
    countriesView.renderCountries(country);
  });
});

function getCountryByFilter(region) {
  const countriesInRegion = state.allCountriesData.filter(
    (country) => country.region === region,
  );
  return countriesInRegion;
}

function getCountriesBySearch(textInput) {
  const countriesBySearch = state.allCountriesData.filter((country) =>
    country.name.official.toLowerCase().includes(textInput),
  );
  return countriesBySearch;
}

const errorText = document.querySelector(".error__text");

searchInput.addEventListener("input", () => {
  const countries = getCountriesBySearch(searchInput.value);

  addCountries(countries);
});

const navigatorBtn = document.querySelector(".detail__btn");
const homeView = document.querySelector(".home__view");
const detailView = document.querySelector(".detail__view");

navigatorBtn.addEventListener("click", () => {
  detailView.style.display = "none";
  homeView.classList.remove("hidden");
});

countriesContainer.addEventListener("click", (e) => {
  const countryToShowEl = e.target.closest(".country");
  if (!countryToShowEl) return;
  const countryToShowName = countryToShowEl.dataset.name;

  homeView.classList.add("hidden");
  detailView.style.display = "flex";

  const countryToShow = state.allCountriesData.find(
    (c) => c.name === countryToShowName,
  );

  console.log(countryToShow);
  countryInfoView.showDetails(countryToShow);

  // renderDetails(countryToShow);
});

themeToggler.addEventListener("click", (e) => {
  let theme = state.theme;

  state.isDark = !state.isDark;

  if (state.isDark) {
    storeTheme("dark");
    theme = getTheme();
    setTheme(theme);
    console.log(getTheme());
  } else {
    storeTheme("light");
    theme = getTheme();
    setTheme(theme);
    console.log(getTheme());
  }

  e.target.closest("button").innerHTML =
    `<i class="uil uil-${theme === "dark" ? "sun" : "moon"}"></i>
          <p>${theme === "dark" ? "Light" : "Dark"} mode</p>`;
});

window.onload = () =>{
  state.theme = getTheme()
  let theme = state.theme
  setTheme(theme)
  themeToggler.innerHTML =
    `<i class="uil uil-${theme === "dark" ? "sun" : "moon"}"></i>
          <p>${theme === "dark" ? "Light" : "Dark"} mode</p>`;
}