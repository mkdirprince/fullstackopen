import { useState, useEffect } from "react"
import axios from "axios"



const Country = ({country}) => {

  const {capital, area, languages, flags} = country

  return (
    <>
      <h2>{country.name.common}</h2>
      <p> capital {capital[0]}</p>
      <p> area {area}</p>
      <h4>languages</h4>
      <ul>
        {Object.keys(languages).map(code => 
          <li key = {code}>
            {languages[code]}
          </li>
        )}
      </ul>
      <img src={flags.png} alt="" />
    </>
  )
}

const Countries = ({countriesToShow, showButton}) => {



  if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]}/>
    )
  }

  else if (countriesToShow.length > 10 )
  {
    return (
      <p>Too many countries, specify another filter</p>
    )
  }

  else {
    return countriesToShow.map( country => 
      <p key={country.cca3}>{country.name.common} <button onClick={ () => showButton(country)}>show</button></p>  
    )
  }

}

const Filter = ({filterValue, handleFilterChange}) => {
  return (
    <p>
        find countries <input 
          type="text" 
          name="filter"
          value={filterValue} 
          onChange={handleFilterChange}
        />
      </p>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])



  const handleFilterChange = (event) => {
    setFilterValue(event.target.value.toLowerCase())
    setSelectedCountry(null)
  }

  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().startsWith(filterValue))

  const showButton = (country) => {
   setSelectedCountry(country)
  }


  return (
    <>
      <Filter 
        filterValue={filterValue} 
        handleFilterChange={handleFilterChange}
      />
      {
        selectedCountry 
        ? <Country country={selectedCountry}/>
        : <Countries 
        countriesToShow={countriesToShow}
        showButton={showButton}
      />
      }
      
    </>
  )
}


export default App
