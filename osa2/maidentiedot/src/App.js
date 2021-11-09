import axios from 'axios'
import Country from './Country.js'
import React, { useState, useEffect } from 'react'
import './index.css'

function App() {

  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState([])
  const [weather, setWeather] = useState('')

  useEffect(() => {
    
    axios 
      .get('https://restcountries.com/v2/all')
      .then(response => {
          
          
        setCountries(response.data)
      })
  },[selected,weather])

  const handleShow = (country) => {
      
    setSelected([country]);
    //Fetch weather data
    let query
    if (country.capital) {
      query = country.capital
    } else {
      query = country.name
    }
    
    axios 
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`)
      .then(response => {
          
          
        setWeather(response.data)
      })
  }

  return (
    <div>
      <h1>Search countries</h1>
      <form>
        <label>find countries </label>
        <input 
        type='search'
        onChange={(e) => {
          
          const matches = []
          const search = e.target.value
          for (const country of countries) {
            const name = country.name.toLowerCase()
            search.toLowerCase()
            if (name.startsWith(search)){
              matches.push(country)
            }
          }
            
          if (matches.length === 1) {
            handleShow(matches[0])
          }
          if (matches.length < 10) {
            setSelected(matches)
            return
          }
          setSelected(['Too many matches, specify another filter.'])
        }}
        />
      </form>
      
        <ul>
          {selected.map( (item) => {
            return(
            <Country className='country' key={item.numericCode} country={item} weather={weather} show={handleShow} amountOfCountries={selected.length}/>
            )
          })}
        </ul>

    </div>
  );
}

export default App;
