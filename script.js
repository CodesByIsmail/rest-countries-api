const countriesContainer = document.querySelector(".countries");
const filterContainer = document.querySelector(".filter__region");
const filterListWrapper = document.querySelector(".filter__wrapper");
const searchInput = document.querySelector(".search__input");

let allCountriesData = [];

async function getAllCountry() {
  const res = await fetch("./data.json");
  const data = await res.json();

  allCountriesData = data;

  console.log(allCountriesData);
  addCountries(allCountriesData);
}

getAllCountry();

function addCountries(countryArr) {
  countriesContainer.innerHTML = "";
  countryArr.forEach((c) => render(c));
}

function render(country) {
  const html = `
    <div class="country" data-name='${country.name}'>
      <img src="${country.flag}" alt="${country.name}'s flag" />
      
      <div class="country__info">
              <h2>${country.name}</h2>
      
      <h3>Population: <span class="population">${new Intl.NumberFormat().format(country.population)}</span></h3>
      <h3>Region: <span class="region">${country.region}</span></h3>
      <h3>Capital: <span class="capital">${country.capital}</span></h3>

      </div>
    </div>`;
  // countriesContainer.prepend(html)
  countriesContainer.insertAdjacentHTML("beforeend", html);
}

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
  const countriesInRegion = allCountriesData.filter(
    (country) => country.region === region,
  );
  return countriesInRegion;
}

function getCountriesBySearch(textInput) {
  const countriesBySearch = allCountriesData.filter((country) =>
    country.name.toLowerCase().includes(textInput),
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

  const countryToShow = allCountriesData.find(
    (c) => c.name === countryToShowName,
  );

  renderDetails(countryToShow);
});

const countryDetails = document.querySelector(".details");

function renderDetails(country) {
  const languages = [...country.languages.map((l) => l.name)];
  const currencies = [...country.currencies.map((c) => c.code)];
  // console.log(typeof(borders))

  const html = `
  <img class="country__flag__detail" src="${country.flag}" alt="" />

        <div class="country__detail">
          <h3>${country.name}</h3>

          <div class="infos">
            <div class="basic__info">
              <p>Native Name: <span>${country.nativeName}</span></p>
              <p>Population : <span>${new Intl.NumberFormat().format(country.population)}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>

            <div class="more__info">
              <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
              <p>Currencies: <span>${currencies}</span></p>
              <p>Languages: <span>${languages}</span></p>
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

  if (!country.borders) return;
  const borders = [...country.borders];

  const bordersDiv = countryDetails.querySelector(".borders__name");
  borders.forEach((b) => {
    fetch(`https://restcountries.com/v2/alpha/${b}`)
      .then((res) => res.json())
      .then((data) => {
        const borderHtml = ` <span class="border__country" data-name="${data.name}">${data.name}</span> `;
        bordersDiv.innerHTML += borderHtml;
      });
  });
}


countryDetails.addEventListener("click", (e) => {
  const countryToShowEl = e.target.closest(".border__country");
  if (!countryToShowEl) return;
  const countryToShowName = countryToShowEl.dataset.name;

  const countryToShow = allCountriesData.find(
    (c) => c.name === countryToShowName,
  );

  renderDetails(countryToShow);
});