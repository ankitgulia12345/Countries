import React, { useContext, useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import CountryDetailShimmer from './CountryDetailShimmer'
import { ThemeContext } from '../contexts/ThemeContext'

export default function CountryDetail() {
  const [isDark] = useContext(ThemeContext)  // context api
  const params = useParams()
  const { state } = useLocation()
  const countryName = params.country

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData(data) {
    setCountryData({
      name: data.name?.common || 'N/A',
      nativeName: data.name?.nativeName
        ? Object.values(data.name.nativeName)[0]?.common
        : 'N/A',
      population: data.population || 0,
      region: data.region || 'N/A',
      subregion: data.subregion || 'N/A',
      capital: Array.isArray(data.capital) ? data.capital : ['N/A'],
      flag: data.flags?.svg || '',
      tld: data.tld || [],
      languages: data.languages
        ? Object.values(data.languages).join(', ')
        : 'N/A',
      currencies: data.currencies
        ? Object.values(data.currencies)
          .map((currency) => currency.name)
          .join(', ')
        : 'N/A',
      borders: [],
    })

    const borders = data.borders || []

    if (borders.length > 0) {
      Promise.all(
        borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common)
        })
      ).then((borders) => {
        setTimeout(() => setCountryData((prevState) => ({ ...prevState, borders })))
      })
    }
  }

  useEffect(() => {
    // 🟢 Use passed state if available
    if (state) {
      updateCountryData(state)
      return
    }

    // 🟢 Fallback to fetch from API
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data)
      })
      .catch((err) => {
        console.error(err)
        setNotFound(true)
      })
  }, [countryName, state])

  if (notFound) {
    return <div>Country Not Found</div>
  }

  return (
    <main className={`${isDark ? 'dark' : ''} `}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: {countryData.nativeName}</b>
                </p>
                <p>
                  <b>
                    Population: {countryData.population.toLocaleString('en-IN')}
                  </b>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                </p>
                <p>
                  <b>Capital: {countryData.capital.join(', ')}</b>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld.join(', ')}</b>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies}</b>
                </p>
                <p>
                  <b>Languages: {countryData.languages}</b>
                </p>
              </div>

              {countryData.borders.length > 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
