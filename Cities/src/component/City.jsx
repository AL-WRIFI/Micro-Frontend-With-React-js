import axios from "axios";
import React, { Fragment ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/form.css';
import { CityContext } from "./CitiesList";
import ModalForm from "./ModalForm/ModalForm";

  
const City = () => {
  let data = useContext(CityContext) 
  const cities = data.cities();  
  const countries = data.countries;  
  return(
  <Fragment>
    {
	cities.map((el,idx)=>(
		<tr className="w-10" key={idx}>
		<th>{el.id}</th>
		<td>{el.name}</td>
		<td>{countries.find(country=>country.id === el.countryId )?.name}</td>
		<td>{el.code}</td>
		<td>
		 <div >
		   <ModalForm  City={el} buttonLabel="Edit" />
	     </div>    
		</td>
	  </tr>
     	))
 	}	
  </Fragment>
  );
};

export default City;