import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Country from './components/Country';
import ShowButton from './components/ShowButton';

const App = () => {
  const [countriesInfo, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isWeatherData = false;

  const hook = () => {
    axios.get(`${process.env.REACT_APP_COUNTRIES}`).then(response => {
      setCountries(response.data);
    });
  };
  useEffect(hook, []);
  console.log(countriesInfo, 'Stage1');

  const filterOperation = () => {
    const results = countriesInfo.filter(countryInfo =>
      countryInfo.name.common
        .substring(0, 10)
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );

    setFilteredCountries(results);
  };
  useEffect(filterOperation, [countriesInfo, searchText]);

  console.log(isWeatherData, 'Stage1');

  const handleSearch = event => {
    setSearchText(event.target.value);
    //filterOperation();
  };

  return (
    <div>
      find countries <input onChange={handleSearch} value={searchText} />
      {filteredCountries.length === 0 ? null : filteredCountries.length ===
        1 ? (
        <Country country={filteredCountries[0]} isWeatherData={true} />
      ) : filteredCountries.length <= 10 ? (
        <ul style={{ display: 'contents' }}>
          {filteredCountries.map((country, index) => (
            <li key={index} style={{ listStyle: 'none', marginLeft: 0 }}>
              {country.name.common}{' '}
              <ShowButton
                country={country}
                id={`button-${index}`}
                isWeatherData={false}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
