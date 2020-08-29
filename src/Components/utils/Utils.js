export function filterCountries(countryList,CountryInput){
  let displayCountryList = [];
  for(let country of countryList){
    if(country.indexOf(CountryInput) > -1){
      displayCountryList.push(country);
    }
  }
  return displayCountryList;
}