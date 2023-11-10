 import  useDispatch  from "react-redux";
 import axios from "axios";
 export const GET_COUNTRIES = "GET_COUNTRIES";
 export const ADD_COUNTRY = "ADD_COUNTRY";
 

 export const getCountries =(countries) =>{
    return{
        type : GET_COUNTRIES,
        payload : countries,
    }
 }
 export const addCountry =(country) =>{
    return{
        type : ADD_COUNTRY,
        payload : country,
    }
 }


 export const fetchCountries =() =>{
    return async(dispatch)=>{
        const res = await fetch('http://localhost:3000/countries');
		const data = await res.json();
        console.log("from actions " ,data)
        dispatch(getCountries(data));
  
    }
 };