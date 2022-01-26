import {createSlice} from "@reduxjs/toolkit";

export interface WeatherState {
  currentWeather: object | null | undefined,
}

const initialState: WeatherState = {
  currentWeather: null
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload
    }
  },
})

export const {setCurrentWeather} = weatherSlice.actions


export default weatherSlice.reducer