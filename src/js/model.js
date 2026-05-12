export const state = {
  allCountriesData: [],
};

export async function getAllCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,languages,flags,borders,topleveldomain,subregion",
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
}
