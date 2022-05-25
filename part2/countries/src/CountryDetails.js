import WeatherInfo from "./WeatherInfo";

const CountryDetails = ({ country }) => {
  const {
    name: { common: name },
    capital,
    capitalInfo: { latlng },
    languages,
    area,
  } = country;
  const languagesKeys = Object.keys(languages);

  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h4>Languages:</h4>
      <ul>
        {languagesKeys.map((elementKey) => {
          return <li key={elementKey}>{country.languages[elementKey]}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        alt={`${name} flag`}
        width={200}
        style={{ border: "1px solid" }}
      />
      <WeatherInfo capital={capital} location={latlng} />
    </>
  );
};

export default CountryDetails;
