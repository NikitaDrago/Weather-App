import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface WeatherState {
  currentWeather: object | null | undefined,
  forecast: object | null | undefined,
  location: object | null | undefined
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  location: null,
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async () => {
    const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=90215fe220f443cab5f100651222701&q=Минск&days=7&lang=ru");
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
  },
  extraReducers: (builder => {
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.currentWeather = action.payload.current
      state.forecast = action.payload.forecast.forecastday
      state.location = action.payload.location
    })
  })
})

export const {setCurrentWeather} = weatherSlice.actions


export default weatherSlice.reducer