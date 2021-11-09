import React, { useState, useEffect } from "react";

const Country = (props) => {
  const [country, setCountry] = useState();

  useEffect(() => {
    setCountry(props.country);
  }, [props.country, props.weather]);

  if (props.country === "Too many matches, specify another filter.") {
    return <p>Search for a country!</p>;
  }

  if (
    props.amountOfCountries === 1 &&
    props.country !== "Too many matches, specify another filter." &&
    props.weather !== ""
  ) {
    return (
      <div className='country'>
        <div>
          <h1>{props.country.name}</h1>
          <p>{`Capital: ${props.country.capital}`}</p>
          <p>{`Population: ${props.country.population}`}</p>
          <h2>Spoken languages</h2>
          <ul>
            {props.country.languages.map((lang) => {
              return <li key={lang.name}> {lang.name} </li>;
            })}
          </ul>
        </div>

        <img src={props.country.flag} alt="Flag" height={200} width={300} />
        <div>      
          <h2>Weather in {props.country.capital}</h2>
          <p><b>temperature</b>: {props.weather.current.temperature} Celcius</p>
          <img src={props.weather.current.weather_icons[0]} alt="Weather icon" />
          <p><b>wind:</b> {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <p>
        {props.country.name}{" "}
        <button onClick={() => props.show(country)}>show</button>
      </p>
    </>
  );
};

export default Country;
