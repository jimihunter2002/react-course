import { useState } from 'react';
import SingleCountryView from './SingleCountryView';

const ShowButton = ({ country, id, weatherData }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    console.log('Clicked');
    setIsClicked(!isClicked);
  };
  if (isClicked) {
    return (
      <>
        <input type='button' id={id} onClick={handleClick} value='dismiss' />
        <SingleCountryView country={country} />
      </>
    );
  } else {
    return (
      <>
        <input type='button' id={id} onClick={handleClick} value='show' />
      </>
    );
  }
};

export default ShowButton;
