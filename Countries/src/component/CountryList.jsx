import React, { Fragment , useEffect, useState ,lazy,Suspense,createContext,useContext} from "react";
import  fetchCountries  from "../store/slices/countriesSlice";
import { useDispatch , useSelector } from "react-redux";
import { Button,Modal,Input } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Country from "./Country";
import '../assets/form.css';
import axios from "axios";
import ModalForm from "./ModalForm/ModalForm";

// Remote Micro Filter
const Filter = lazy (()=> import("Filter/Filter"));

export const CountryContext = createContext([]);

function CountryList(){ 
	// const countries = useSelector((state) => state)
	//  const dispatch = useDispatch();
	// useEffect(()=>{
	// 	dispatch(fetchCountries())
	// 	// console.log("fron list",countries);
	// },[])
	const [getData ,setGetData] = useState(false)
    const [countries,setCountries] = useState([]);
	const [filter ,setFilter] = useState("");
    const data =[];
    const getAllCountries =()=>{
		axios.get('http://localhost:3005/countries')
		.then(res =>{
			setCountries(res.data);
			setGetData(true);
		})
		.catch(err => console.log(err));
	}

	useEffect(()=>{
		if(getData){ 
            return;
		}else{  
			getAllCountries();    
		}	
	},[]);

	const filterNames =(name) =>{
       setFilter(name);
	};
    const namesHandler =() =>{
        if(filter.length !== 0){
			return countries.filter((el) => el.name.includes(filter));
		}
		return countries;
	};

    const addCountyToState = (item) => {
        setCountries([...countries, item]);
    };
    const updateState = (id,updatedData) => {
        setCountries(prevData => {return prevData.map(item => {
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
    

  const deleteCountryFromState = (id) => {
    const updatedCountries = countries.filter((item) => item.id !== id);
    setCountries(updatedCountries);
  };
     
    return(
     <CountryContext.Provider value={{
        countries:namesHandler,
        addCountyToState:addCountyToState,
        updateState:updateState,
        deleteCountryFromState:deleteCountryFromState,
        }}>

     <Fragment>
        <div className="container">
        <div className="table-responsive crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                 <Suspense fallback={<div>Loding....</div>}><Filter filterValue={filterNames} /> </Suspense>  
                  <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>COUNTRIES LIST</b></h2></div>
                  <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred text-end">			  
                  <ModalForm buttonLabel="Add" Country={null}/>
                  </div>
		            <Country  />
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
    </CountryContext.Provider>
 );
};

export default CountryList;