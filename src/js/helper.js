export function addCountries(countryArr, view) {
  countryArr.forEach((c) => view(c));
}
