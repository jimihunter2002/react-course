import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Language from './Language';
import WeatherInfo from './WeatherInfo';

const Country = props => {
  const languages = Object.values(props.country.languages);
  const [datas, setDatas] = useState({
    loading: true,
    weatherObj: {},
  });
  console.log(props.country.capital, 'HERE COUNTRY');
  const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL;
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (props.isWeatherData === true) {
      axios
        .get(`${baseUrl}${props.country.capital}&APPID=${api_key}`)
        //.get('http://localhost:3001/data')
        .then(response => {
          setDatas({
            loading: false,
            weatherObj: response.data,
          });
        });
    }
  }, [api_key, baseUrl, props.country.capital, props.isWeatherData]);

  // this is very important for data loading
  const { loading, weatherObj } = datas;
  if (loading) {
    return null;
  } // ensures that data is completely loaded

  if (props.isWeatherData === true) {
    return (
      <div>
        <h2>{props.country.name.common}</h2>

        <div>
          <p>capital {props.country.capital}</p>
          <p>area {props.country.area}</p>
        </div>
        <div>
          <h3>languages</h3>
          <ul>
            {languages.map((lang, index) => (
              <Language key={`${lang}-${index}`} language={lang} />
            ))}
          </ul>
          <div>
            <img
              src={props.country.flags.svg}
              alt={props.country.name.common}
              width='200'
              height='150'
            />
          </div>
        </div>
        <div>
          <h2>Weather in {props.country.capital}</h2>
          <WeatherInfo weatherObj={weatherObj} />
        </div>
      </div>
    );
  }
};
export default Country;
