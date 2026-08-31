class CountriesView {
  #parentEl = document.querySelector(".countries");
  #data;

  renderCountries(data) {
    this.#data = data;
    const markup = this.#generateMarkup(data);
    this.#parentEl.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup(data) {
    return `<div class="country" data-name="${data.name}">
      <img src="${data.flags.png}" alt="${data.flags.alt}'s flag" />    

      <div class="country__info">
        <h2>${data.name}</h2>

        <h3>
          Population:
          <span class="population">
            ${new Intl.NumberFormat().format(data.population)}
          </span>
        </h3>
        <h3>
          Region: <span class="region">${data.region}</span>
        </h3>
        <h3>
          Capital: <span class="capital">${data.capital}</span>
        </h3>
      </div>
    </div>`;
  }

    clear(){
      this.#parentEl.innerHTML = ''
    }
}

export default new CountriesView();
