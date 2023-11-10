import React, { Fragment, useState ,useContext} from "react";
import {CurrencyContext} from "./CurrenciesList"
import ModalForm from "./ModalForm/ModalForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/form.css';


  const Currency = () => {
  
	let data = useContext(CurrencyContext) 
	const currencies = data.namesHandler(); 
  return(
  <Fragment>
    {
	currencies.map((el,idx)=>(
		<tr className="w-10" key={idx}>
		<th>{el.id}</th>
		<td>{el.name}</td>
		<td>{el.code}</td>
		<td>{el.fragment}</td>	
		<td>
		<ModalForm  Currency={el} buttonLabel="Edit" />	    
		</td>
	  </tr>
     	))
 	}	
  </Fragment>
  );
};

export default Currency;