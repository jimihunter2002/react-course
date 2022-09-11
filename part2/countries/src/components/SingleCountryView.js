import React from 'react';
import Language from './Language';

const SingleCountryView = props => {
  const languages = Object.values(props.country.languages);
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
    </div>
  );
};

export default SingleCountryView;
