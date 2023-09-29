import { useState, useEffect } from "react"
import axios from "axios"


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

const Countries = ({countriesToShow}) => {
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
      <p key={country.cca3}>{country.name.common}</p>  
    )
  }

}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])



  const handleFilterChange = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().startsWith(filterValue))


  return (
    <>
      <Filter 
        filterValue={filterValue} 
        handleFilterChange={handleFilterChange}
      />
      <Countries 
        countriesToShow={countriesToShow}
      />
    </>
  )
}


export default App
