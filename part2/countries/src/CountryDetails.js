const CountryDetails = ({ country }) => {
  const languages = Object.keys(country.languages);
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;

  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h4>Languages:</h4>
      <ul>
        {languages.map((elementKey) => {
          return <li key={elementKey}>{country.languages[elementKey]}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={`${name} flag`} width={200} />
    </>
  );
};

export default CountryDetails;
