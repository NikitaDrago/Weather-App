import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {currentWeatherSelector, locationSelector} from "./store/selectors";
import {dayArray, monthArray} from "./constants";
import {fetchCurrentWeather} from "./store/weatherSlice";
import WeatherCard from "./WeatherCard";

const App = () => {
  const dispatch = useAppDispatch()
  const weather = useAppSelector(currentWeatherSelector)
  const location = useAppSelector(locationSelector)
  const date: Date = location && new Date(location.localtime)

  useEffect(() => {
    dispatch(fetchCurrentWeather())
  }, [dispatch]);

  return (
    <div className="weather">
      <div className="weather__city">{location && location.name}</div>
      <div className="">
        <span className="weather__degree"> {weather && weather.temp_c}&deg;</span>
        <img className="weather__icon"
             src={weather && weather.condition.icon} alt={weather && weather.condition.text}/>
      </div>
      <div className="weather__feelsLike">{`Ощущается как ${weather && Math.trunc(weather.feelslike_c)}`}&deg;</div>
      <ul className="weather-date">
        <li>{`${date.getDate()} ${monthArray[date.getMonth()]} \`${String(date.getFullYear()).slice(-2)}`}</li>
        <li>
          {`${dayArray[date.getDay()]}
          | ${date.getHours() > 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()}`
          }
        </li>
        <li>{`Скорость ветра: ${weather && Math.trunc(weather.wind_kph * 0.2778)} м/c | Влажность: ${weather && weather.humidity}%`}</li>
      </ul>
      <div className="weather-onWeak">
        <WeatherCard/>
      </div>
    </div>
  );
}

export default App;
