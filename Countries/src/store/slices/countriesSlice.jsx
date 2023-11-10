import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';



export const fetchCountries = createAsyncThunk('countriesSlice/fetchCountries', async() => {
    const res = await fetch('http://localhost:3000/countries');
	const data = await res.json();
    console.log("from actions " ,data);
    return data;
});

export const countriesSlice = createSlice({
     initialState : [],
     name:'countriesSlice',
     reducers: {

        // addCountry: (state ,action) => {
        //    state.push(action.payload);
        // }
     },

    
     extraReducers: (builder)=>{
        builder.addCase(fetchCountries.fulfilled,(state,action)=>{
              state = action.payload;
        });
     },

});

export const {} = countriesSlice.actions;
export default countriesSlice.reducer;