import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [weather, setWeather] = useState()

  const api_key = process.env.REACT_APP_API_KEY


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  },[])

  useEffect(() => {
    let filter = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setFilterCountries(filter)
  }, [search])

  useEffect(() => {
    if(filterCountries.length === 1) {
      const country = filterCountries[0];
      const lat = country.latlng[0]
      const lng = country.latlng[1]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
        .then(res => setWeather(res.data))
    }
  }, [filterCountries])
  

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={filterCountries} setFilterCountries={setFilterCountries} weather={weather} />
    </div>
  )
}

export default App;
