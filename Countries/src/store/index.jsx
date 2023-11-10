import CountryReducer  from './slices/countriesSlice';




import { configureStore } from '@reduxjs/toolkit';

export const storeApi = configureStore({
  reducer: {
    Countries : CountryReducer,
  },
})
