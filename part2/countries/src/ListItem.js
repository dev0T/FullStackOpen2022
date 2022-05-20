import { useState } from "react";
import CountryDetails from "./CountryDetails";

const ListItem = ({ country }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const handleShow = (event) => {
    setDisplayInfo((displayInfo) => {
      return !displayInfo;
    });
  };
  return (
    <div key={`${country.cca2}-${country.ccn3}`}>
      {country.name.common}
      <button id={country.name.common} onClick={handleShow}>
        {displayInfo ? "Hide" : "Show"}
      </button>
      {displayInfo && <CountryDetails country={country} />}
    </div>
  );
};

export default ListItem;
