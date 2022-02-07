import React, {useCallback, useEffect, useRef} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {citySelector, currentWeatherSelector, ipSelector, locationSelector} from "./store/selectors";
import {dayArray, monthArray} from "./constants";
import {fetchCurrentWeather, setCity, setIp} from "./store/weatherSlice";
import WeatherCard from "./WeatherCard";
import {getGeolocation, getIp} from "./utils";

const App = () => {
  const dispatch = useAppDispatch()
  const weather = useAppSelector(currentWeatherSelector)
  const location = useAppSelector(locationSelector)
  const city = useAppSelector(citySelector)
  const ip = useAppSelector(ipSelector)
  const date: Date = weather && new Date(weather.time)
  const inputField = useRef(null)

  const handleSearch = useCallback((e: any) => {
    if (e.key === 'Enter' || e.target.className === 'search__img') {
      // @ts-ignore
      dispatch(setCity(inputField.current.value))
    }
  }, [dispatch])

  useEffect(() => {
    getIp()
      .then(res => res.IPv4)
      .then(res => dispatch(setIp(res)))
  }, [dispatch])

  useEffect(() => {
    ip && getGeolocation(ip)
      .then(geolocation => dispatch(setCity(geolocation.region.name_ru)))
  }, [dispatch, ip])


  useEffect(() => {
    city && dispatch(fetchCurrentWeather(city))
  }, [dispatch, city]);

  return (
    <div className="weather">
      <span className="weather__city">{location && location.name}</span>
      <div className="">
        <span className="weather__degree"> {weather && weather.temp_c}&deg;</span>
        <img className="weather__icon"
             src={weather && weather.condition.icon} alt={weather && weather.condition.text}/>
      </div>
      <div className="weather__feelsLike">{`Ощущается как ${weather && Math.trunc(weather.feelslike_c)}`}&deg;</div>
      <ul className="weather-date">
        <li>{date && `${date.getDate()} ${monthArray[date.getMonth()]} \`${String(date.getFullYear()).slice(-2)}`}</li>
        <li>
          {date && `${dayArray[date.getDay()]}
          | ${date.getHours() > 10 ? date.getHours() : '0' + date.getHours()}:${new Date().getMinutes() > 10 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`
          }
        </li>
        <li>{`Скорость ветра: ${weather && Math.trunc(weather.wind_kph * 0.2778)} м/c | Влажность: ${weather && weather.humidity}%`}</li>
      </ul>
      <div className="weather-onWeak">
        <WeatherCard/>
      </div>
      <div className="search">
        <input type="search" ref={inputField} onKeyPress={handleSearch}/>
        <img className="search__img" src="https://img.icons8.com/ios-glyphs/30/000000/search--v2.png"
             onClick={handleSearch} alt='search'/>
      </div>
    </div>
  );
}

export default App;
