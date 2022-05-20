const FilterList = ({ countryList }) => {
  return (
    <>
      {countryList.map((country) => {
        return (
          <p key={`${country.cca2}-${country.ccn3}`}>{country.name.common}</p>
        );
      })}
    </>
  );
};

export default FilterList;
