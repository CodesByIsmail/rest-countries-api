class CountryInfoView {
    #parentEl = document.querySelector('.details');
    #data

    showDetails(data){
        this.#data = data;
      this.clear();
      const markup = this.generateMarkup(data);
      this.#parentEl.insertAdjacentHTML("beforeend", markup);
    }

    generateMarkup(data){
        return `
          <img class="country__flag__detail" src="${data.flags.png}" alt="" />
        <div class="country__detail">
          <h3>${data.name}</h3>

          <div class="infos">
            <div class="basic__info">
              <p>Native Name: <span>${data.nativeName}</span></p>
              <p>Population : <span>${data.population}</span></p>
              <p>Region: <span>${data.region}</span></p>
              <p>Sub Region: <span>${data.subregion}</span></p>
              <p>Capital: <span>${data.capital}</span></p>
            </div>

            <div class="more__info">
              <p>Top Level Domain: <span>${data.topLevelDomain.join(',')}</span></p>
              <p>Currencies: <span>${data.currencies[0].code}</span></p>
              <p>Languages: <span>${data.languages[0].name}</span></p>
            </div>
          </div>

          <div class="borders">
            <h4 class="tittle">Border Countries:</h4>
            <div class="borders__name">${
                !data.borders ? '<span class="no__border">Has no border countries</span>' : 
                data.borders.map(element => {
                   this.borders(element)
                })
            }
                
              
            </div>
          </div>
        </div> 
        `
    }

    borders(border){
        return `<span>${border}</span> `
    }

    clear(){
      this.#parentEl.innerHTML = '';
    }
}

export default new CountryInfoView();