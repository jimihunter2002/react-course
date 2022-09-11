import React from 'react';

const WeatherInfo = ({ weatherObj }) => {
  const weatherIconBaseUrl = process.env.REACT_APP_WEATHER_ICON_URL;
  const urlEnd = '@2x.png';
  const iconIdentifier = weatherObj.weather[0].icon;
  const iconUrl = `${weatherIconBaseUrl}${iconIdentifier}${urlEnd}`;
  const tempInCentigrade = (parseFloat(weatherObj.main.temp) - 273.15).toFixed(
    2,
  );
  console.log(iconUrl, 'ICON_URL');
  return (
    <div>
      <p>temperature {tempInCentigrade} Celcius</p>

      <div>
        <img src={iconUrl} alt='weather-icon' width='100' height='100' />
      </div>
      <p>wind {weatherObj.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherInfo;
