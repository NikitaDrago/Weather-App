import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {setCurrentWeather} from "./store/weatherSlice";
import {currentWeatherSelector} from "./store/selectors";
import {dayArray, monthArray} from "./constants";

function App() {
  const dispatch = useAppDispatch()
  const weather = useAppSelector(currentWeatherSelector)
  const date: Date = new Date()

  const fetchData = async () => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Brest&units=metric&lang=ru&appid=a1344a20b1254d79d23084ed2ff0fecb");
    // await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Brest&limit=5&appid=a1344a20b1254d79d23084ed2ff0fecb")
    return response.json();
  };

  useEffect(() => {
    fetchData().then(res => dispatch(setCurrentWeather(res)));
  }, [dispatch]);


  return (
    <div className="weather">
      <div className="weather__city">{weather && weather.name}</div>
      <div className="">
        <span className="weather__degree"> {weather && Math.trunc(weather.main.temp)}&deg;</span>
        <img className="weather__icon" src={`https://openweathermap.org/img/w/${weather && weather.weather[0].icon}.png`} alt="weather icon"/>
      </div>
      <div className="weather__feelsLike">{`Ощущается как ${weather && Math.trunc(weather.main.feels_like)}`}&deg;</div>
      <ul className="weather-date">
        <li>{`${date.getDate()} ${monthArray[date.getMonth()]} \`${String(date.getFullYear()).slice(-2)}`}</li>
        <li>{`${dayArray[date.getDay()]} | ${date.getHours()}:${date.getMinutes()}`}</li>
        <li>{`Скорость ветра: ${weather && weather.wind.speed} км/ч  |  Влажность: ${weather && weather.main.humidity}%`}</li>
      </ul>
    </div>

  );
}

export default App;
