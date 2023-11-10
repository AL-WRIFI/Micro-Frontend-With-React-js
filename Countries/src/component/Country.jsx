import React, { Fragment ,useState,useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalForm from "./ModalForm/ModalForm";
import {CountryContext} from "./CountryList";
import axios from "axios";


const Country = () => {
	
  let data = useContext(CountryContext) 
  const countries = data.countries();  

	const keys = [];
	for (const key in countries[0]) {
		if(key === "shortId" || key === "flag"){			
		}else{
			keys.push(key);
		}    
	}
  return(
  <Fragment>
	    			 
    <table className="table table-striped table-hover table-bordered">
        <thead>
            <tr> 
			{keys.map((key, idx) => (
             <th key={idx}>{key}</th>
                ))} 
            </tr>
        </thead>
        <tbody>
		{countries.map((el, idx) => (
		   <tr key={idx}>
		     {keys.map((key, idx) => (
		       <td key={idx}>{el[key]}</td>
		     ))}
		     <td>
			   <ModalForm  Country={el} buttonLabel="Edit" />
		     </td>
		   </tr>
		 ))}		              
        </tbody>
    </table>

  </Fragment>
  );
};

export default Country;

