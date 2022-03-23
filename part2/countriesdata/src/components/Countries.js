import React from 'react'

const Country = ({ country, weather }) => {
    const imgUrl = weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ''

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.values(country.languages).map(leng =>
                    <li key={leng}>{leng}</li>
                )}
            </ul>
            <img src={country.flags.png}></img>
            <h2>Weather in {country.name.common}</h2>
            {
                weather
                    ?   <div>
                            <p>temperature {Math.round(weather.main.temp - 273.15)}°C</p>
                            <img src={imgUrl}></img>
                            <p>wind {weather.wind.speed} m/s</p>
                        </div>
                    : ''
                
            }
            
        </div>
    )
}

const CountryList = ({ country, setFilterCountries }) => (
    <div>
        <strong>{country.name.common}</strong>
        <button onClick={() => setFilterCountries([country])}>show</button>
    </div>
)

const Countries = ({ countries, setFilterCountries, weather }) => {
    return (
        countries.length >= 10
            ? <div>Too many matches, specify another filter</div>
            : countries.length == 1
                ? <Country country={countries[0]} weather={weather}/>
                : countries.length > 1 && countries.length < 10
                    ? countries.map((country) => <CountryList key={country.name.common} country={country} setFilterCountries={setFilterCountries} />)
                    : ''
    )
}

export default Countries