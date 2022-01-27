import {useAppDispatch, useAppSelector} from "./store/hooks";
import {forecastSelector} from "./store/selectors";
import * as React from "react";
import {dayArray} from "./constants";
import {setCurrentWeather} from "./store/weatherSlice";

type TForecast = {
  date: number,
  date_epoch: number | undefined,
  hour: {
    temp_c: {
      date_epoch: number | undefined,
      hour: {
        condition: {
          text: string | undefined
        }
      }[];
      date: string | undefined
    };
    condition: {
      icon: string | undefined;
      text: string | undefined;
    },
  }[],
}

const WeatherCard = () => {
  const forecast = useAppSelector(forecastSelector)
  const dispatch = useAppDispatch()
  const nowTime = new Date().getHours()

  const changeForecast = (e: any) => {
    const index = e.currentTarget.getAttribute('data-index')
    dispatch(setCurrentWeather(forecast[index].hour[nowTime]))
  }

  return <>
    {
      forecast && forecast.map((item: TForecast, i: number) => {
        return (
          <div key={item.date_epoch} data-index={i} className="weather__card" onClick={changeForecast}>
            <span>{item && item.hour[nowTime].temp_c}&deg;</span>
            <img className="weather__icon" src={item && item.hour[nowTime].condition.icon}
                 alt={item && item.hour[nowTime].condition.text}/>
            <span className="weather__desc">{item && item.hour[nowTime].condition.text}</span>
            <span className="card__day">{item && dayArray[new Date(item.date).getDay()]}</span>
          </div>
        )
      })
    }
  </>
};

export default WeatherCard;