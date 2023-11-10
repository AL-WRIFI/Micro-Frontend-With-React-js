import React, { Fragment , useEffect, useState,createContext,lazy,Suspense  } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Currency from "./Currency";
import '../assets/form.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ModalForm from "./ModalForm/ModalForm";

// Remote Micro Filter
const Filter = lazy (()=> import("Filter/Filter"));
export const CurrencyContext = createContext([]);

function CurrenciesList(){ 
	
    const [currencies,setCurrencies] = useState([]);
	const [getData ,setGetDatar] = useState(false);
	const [filter ,setFilter] = useState("");

    const getAllCurrencies =()=>{
		axios.get('http://localhost:3007/currencies')
		.then(res =>{
			setCurrencies(res.data);
			setGetDatar(true);
		})
		.catch(err => console.log(err));
	}

	useEffect(()=>{
		if(getData){ 
		   return;
		}else{
            getAllCurrencies();
		}	
	},[])


	const filterNames =(name) =>{
       setFilter(name);
	};

	const namesHandler =() =>{
        if(filter.length !== 0){
			return currencies.filter((el) => el.name.includes(filter));
		}
		return currencies;
	};

    const addCurrencyToState = (item) => {
        setCurrencies([...currencies, item]);

    };

    const updateState = (id,updatedData) => {
        setCurrencies(prevData => {return prevData.map(item => {
            if (item.id === id) {
                return {
                ...item,
                ...updatedData
                };
            }  
            return item;  
            });
        });
   };
    

  const deleteCurrencyFromState = (id) => {
    const updatedCities = currencies.filter((item) => item.id !== id);
    setCurrencies(updatedCities);
  };
    

   
    return(
     <CurrencyContext.Provider value={{
        namesHandler:namesHandler,
        addCurrencyToState:addCurrencyToState,
        updateState:updateState,
        deleteCurrencyFromState:deleteCurrencyFromState,}}>  
     <Fragment>

    <div className="container">
        <div className="table-responsive crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                 <Suspense fallback={<div>Loding....</div>}><Filter filterValue={filterNames} /> </Suspense>  
                  <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>CURRENCIES LIST</b></h2></div>
                  <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred text-end">			  
                  <ModalForm buttonLabel="Add" Currency={null}/>
                  </div>
                  <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>   
                            <th>#</th>
                            <th>NAME <i className="fa fa-sort"></i></th>
                            <th>CODE</th>
                            <th>FRAGMENT<i className="fa fa-sort"></i></th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    <Currency  />	              
                    </tbody>
                </table> 
                  
                </div>
               </div>
               <div className="clearfix">
                    <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item active"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                        <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>        
    </div>
    </Fragment>
    </CurrencyContext.Provider>
 );
};

export default CurrenciesList;