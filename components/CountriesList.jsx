import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer.jsx'  // shimmer file

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([])

  // console.log(countriesData)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // For debugging
        setCountriesData(data)
      })
  }, [])

// Shimmer effect 
   if (!countriesData.length) {
    return <CountriesListShimmer />
  }

  return (
    <>
      <div className="countries-container">
        {countriesData
            .filter((country) =>
              country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
            )
            .map((country) => (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data = {country}
              />
            ))}
      </div>
    </>
  )
}