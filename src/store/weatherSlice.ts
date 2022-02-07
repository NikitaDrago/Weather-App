import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface WeatherState {
  currentWeather: object | null | undefined,
  forecast: object | null | undefined,
  location: object | null | undefined,
  city: string | null | undefined,
  ip: string | null | undefined
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  location: null,
  city: '',
  ip: null
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (city: string | null) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=90215fe220f443cab5f100651222701&q=${city}&days=7&lang=ru`);
    return response.json();
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setIp: (state, action) => {
      state.ip = action.payload
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.currentWeather = action.payload.forecast.forecastday[0].hour[new Date().getHours()]
      state.forecast = action.payload.forecast.forecastday
      state.location = action.payload.location
    })
  })
})

export const {setCurrentWeather, setCity, setIp} = weatherSlice.actions


export default weatherSlice.reducer