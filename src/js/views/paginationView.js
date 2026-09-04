class PaginationView {
  #parentEl = document.querySelector(".pagination");
  #data;
  _numOfPages

  renderPaginators(data) {
    const numOfPages = data.length /  10;
    const markup = this.#generateMarkup(numOfPages);
    this.#parentEl.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup(num) {
        let markup = ``

  for (let i = 0; i < num; i++) {
    markup += `<button class="pag__btn" data-page="${i+1}">${i+1}</button>`
  }
    return markup
  }

    clear(){
      this.#parentEl.innerHTML = ''
    }
}

export default new PaginationView();
