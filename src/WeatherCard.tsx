import {useAppSelector} from "./store/hooks";
import {forecastSelector} from "./store/selectors";
import * as React from "react";
import {dayArray} from "./constants";

type TForecast = {
  date_epoch: number | null | undefined,
  day: {
    avgtemp_c: number | null | undefined,
    condition: {
      icon: string | undefined,
      text: string | undefined,
    },
  },
  date: string | number | Date,
}

const WeatherCard = () => {
  const forecast = useAppSelector(forecastSelector)

  return <>
    {
      forecast && forecast.map((item: TForecast) => {
        return (
          <div key={item.date_epoch} className="weather__card">
            <span>{item && item.day.avgtemp_c}&deg;</span>
            <img className="weather__icon" src={item && item.day.condition.icon} alt={item && item.day.condition.text}/>
            <span className="weather__desc">{item && item.day.condition.text}</span>
            <span className="card__day">{item && dayArray[new Date(item.date).getDay()]}</span>
          </div>
        )
      })
    }
  </>
};

export default WeatherCard;