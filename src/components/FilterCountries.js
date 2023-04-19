function filterCountries({ countries, search }) {
  const filteredCountries = countries
    .filter((country) => country.name.common.toLowerCase().startsWith(search.toLowerCase()));

  return filteredCountries;
}

export default filterCountries;
