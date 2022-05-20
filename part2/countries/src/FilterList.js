import ListItem from "./ListItem";

const FilterList = ({ countryList }) => {
  return (
    <>
      {countryList.map((country) => {
        return (
          <ListItem key={`${country.cca2}-${country.ccn3}`} country={country} />
        );
      })}
    </>
  );
};

export default FilterList;
