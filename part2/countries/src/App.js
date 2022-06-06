import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";
import FilterList from "./FilterList";

function App() {
  const [findInput, setFindInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearch = (event) => {
    const input = event.target.value;
    const result = filterCountriesByName(input);
    setFilteredCountries(result);
    setFindInput(input);
  };

  const filterCountriesByName = (name) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <p>
        Find countries: <input value={findInput} onChange={handleSearch} />
      </p>
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
      {filteredCountries.length > 1 && filteredCountries.length < 11 && (
        <FilterList countryList={filteredCountries} />
      )}
    </div>
  );
}

export default App;
