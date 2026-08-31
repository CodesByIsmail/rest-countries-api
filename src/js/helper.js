export function addCountries(countryArr, view) {
  countryArr.forEach((c) => view(c));
}

export function storeTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function getTheme() {
  return localStorage.getItem("theme");
}
