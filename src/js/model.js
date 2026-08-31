export const state = {
  allCountriesData: [],
};

export async function getAllCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca2",
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch countries: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
