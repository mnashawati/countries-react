import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import allCountries from "./countriesAll.json";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesToShow, setCountriesToShow] = useState(allCountries);

  // useEffect(() => {
  //   fetch(`https://restcountries.eu/rest/v2/all`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountriesToShow(data);
  //     });
  // }, []);

  const [isCountryClicked, setIsCountryClicked] = useState(false);
  const [clickedCountry, setClickedCountry] = useState({});

  const handleBackButton = () => {
    setIsCountryClicked(false);
  };

  const BigCountryCard = ({ country }) => {
    function separateLanguages(languages) {
      let langs = "";
      languages.forEach(
        (language, index) =>
          (langs +=
            index !== languages.length - 1
              ? language.name + ", "
              : language.name)
      );
      return langs;
    }

    function getCountryByCode(countries, code) {
      return countries.find((country) => country.alpha3Code === code);
    }

    return (
      <div>
        <div className="back-btn-div">
          <button className="back-btn" onClick={handleBackButton}>
            Back
          </button>
        </div>
        <div className="single-country-big-card">
          <div className="flag-image-div">
            <img
              className="flag-image-lrg"
              src={country.flag}
              alt={`Flag of ${country.name}`}
            />
          </div>
          <div className="first-info-div">
            <h3>{country.name}</h3>
            <p>
              <span className="bold-title">Native Name: </span>
              {country.nativeName}
            </p>
            <p>
              <span className="bold-title">Population: </span>
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="bold-title">Region: </span>
              {country.region}
            </p>
            <p>
              <span className="bold-title">Sub Region:</span>
              {country.subregion}
            </p>
            <p>
              <span className="bold-title">Capital: </span>
              {country.capital}
            </p>
          </div>
          <div className="second-info-div">
            <p>
              <span className="bold-title">Top Level Domain: </span>
              {country.topLevelDomain[0]}
            </p>
            <p>
              <span className="bold-title">Currencies: </span>
              {country.currencies[0].name}
            </p>
            <p>
              <span className="bold-title">Languages: </span>
              {separateLanguages(country.languages)}
            </p>
          </div>
          {country.borders.length > 0 ? (
            <div className="border-countries-div">
              <h4>Border Countries:</h4>
              {country.borders.map((border) => (
                <button
                  key={border}
                  className="border-button"
                  onClick={() => {
                    setClickedCountry(getCountryByCode(allCountries, border));
                  }}
                >
                  {getCountryByCode(allCountries, border).name}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const CountryCard = ({ country }) => {
    const handleCountryCardClick = () => {
      setIsCountryClicked(true);
      setClickedCountry(country);
    };
    return (
      <div className={"country-card-container"}>
        <div
          className={"country-card" + (isDarkMode ? "dark-cards" : "")}
          onClick={handleCountryCardClick}
        >
          <div className="flag-img-container">
            <img
              className="flag-img"
              src={country.flag}
              alt={`Flag of ${country.name}`}
            />
          </div>
          <div className="country-info">
            <h3 className="country-name">{country.name}</h3>
            <p className="population">
              <span className="bold-title">Population: </span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p className="region">
              <span className="bold-title">Region: </span> {country.region}
            </p>
            <p className="capital">
              <span className="bold-title">Capital: </span> {country.capital}
            </p>
          </div>
        </div>
      </div>
    );
  };

  function displayCountries(countries, searchTerm) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSearch = (e) => {
    const searchInput = e.target.value;
    setSearchTerm(searchInput);
  };

  const handleRegionSelector = (e) => {
    const selectedRegion = e.target.value;

    const filteredCountriesByRegion =
      selectedRegion === "Filter By Region"
        ? allCountries
        : allCountries.filter((country) =>
            country.region.includes(selectedRegion)
          );

    setCountriesToShow(filteredCountriesByRegion);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeSwitch = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={!isDarkMode ? "App" : "dark-mode"}>
      <header>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        ></input>
        <select onChange={handleRegionSelector}>
          <option>Filter By Region</option>
          <option>Africa</option>
          <option>America</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
        <div className="mode-switcher">
          <p onClick={handleModeSwitch}>Dark Mode</p>
        </div>
      </header>
      {!isCountryClicked ? (
        <div className="container">
          {displayCountries(countriesToShow, searchTerm).map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      ) : (
        <BigCountryCard country={clickedCountry} />
      )}
    </div>
  );
}

export default App;
