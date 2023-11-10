import {GET_COUNTRIES ,ADD_COUNTRY} from "../actions/countryActions";

export const CountryReducer = (state = [] ,action)=>{

    switch(action.type){
        case ADD_COUNTRY:
            return [...action.payload];
        case GET_COUNTRIES:
            return [...state];
        default:
            return state;    
    }
}