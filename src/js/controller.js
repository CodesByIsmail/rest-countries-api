import { getAllCountries, state } from "./model.js";
import countriesView from "./views/countriesView.js";
import { addCountries } from "./helper.js";

const countriesContainer = document.querySelector(".countries");
const filterContainer = document.querySelector(".filter__region");
const filterListWrapper = document.querySelector(".filter__wrapper");
const searchInput = document.querySelector(".search__input");

// let allCountriesData = [];

async function controlCountries() {
  const data = await getAllCountries();
  state.allCountriesData = data;
  console.log(state.allCountriesData);
  addCountries(state.allCountriesData, countriesView.renderCountries); //takes the data of
  // countries to add and also the view to add it to
}

controlCountries();

async function controlFilterCountries() {}

filterContainer.addEventListener("click", (e) => {
  filterListWrapper.classList.toggle("hidden");
  if (!e.target.classList.contains("filter__list")) return;
  const filter = e.target.dataset.value;
  console.log(filter);
  const countries = getCountryByFilter(filter);
  addCountries(countries);
  console.log(countries);
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
    (c) => c.name.official === countryToShowName,
  );

  console.log(countryToShow);

  renderDetails(countryToShow);
});

const countryDetails = document.querySelector(".details");

function renderDetails(country) {
  const html = `
  <img class="country__flag__detail" src="${country.flags.png}" alt="${country.flags.alt}" />

        <div class="country__detail">
          <h3>${country.name.official}</h3>

          <div class="infos">
            <div class="basic__info">
              <p>Native Name: <span>${Object.values(country.name.nativeName)[0].official}</span></p>
              <p>Population : <span>${new Intl.NumberFormat().format(country.population)}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>

            <div class="more__info">
              <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
              <p>Currencies: <span>${Object.keys(country.currencies).join(",")}</span></p>
              <p>Languages: <span>${Object.values(country.languages).join(", ")}</span></p>
            </div>
          </div>

           <div class="borders">
            <h4 class="tittle">Border Countries:</h4>
            <div class="borders__name">
      
            </div>
          </div>
          
        </div>
        `;
  countryDetails.innerHTML = html;

  const bordersDiv = countryDetails.querySelector(".borders__name");

  if (!country.borders) {
    const borderHtml = `<p class='no__border'>Has no border countries</p>`;
    console.log("no border");
    bordersDiv.innerHTML += borderHtml;
    return;
  }
  const borders = [...country.borders];

  borders.forEach((b) => {
    fetch(`https://restcountries.com/v2/alpha/${b}`)
      .then((res) => res.json())
      .then((data) => {
        let borderHtml = ` <span class="border__country" data-name="${data.name}">${data.name}</span> `;

        bordersDiv.innerHTML += borderHtml;
      });
  });
}

countryDetails.addEventListener("click", (e) => {
  const countryToShowEl = e.target.closest(".border__country");
  if (!countryToShowEl) return;
  const countryToShowName = countryToShowEl.dataset.name;

  const countryToShow = state.allCountriesData.find(
    (c) => c.name.official === countryToShowName,
  );
  console.log(countryToShow);

  renderDetails(countryToShow);
});
