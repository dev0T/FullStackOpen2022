import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ capital, location }) => {
  const [weatherInfo, setWeatherInfo] = useState();
  const [lat, lon] = location;
  const [apiError, setApiError] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      })
      .catch((err) => setApiError(err));
  }, [lat, lon]);

  if (weatherInfo) {
    return (
      <>
        <h3>Weather in {capital}</h3>
        <p> Temperature: {weatherInfo.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={"Weather condition icon"}
        />
        <p>{weatherInfo.weather[0].description}</p>
        <p>Wind: {weatherInfo.wind.speed} m/s</p>
      </>
    );
  } else {
    return apiError ? (
      <p>Temperature information unable at this time.</p>
    ) : (
      <p>Loading temperature information.</p>
    );
  }
};

export default WeatherInfo;
