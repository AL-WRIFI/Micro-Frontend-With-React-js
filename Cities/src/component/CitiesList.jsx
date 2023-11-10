import React, { Fragment , useEffect, useState ,lazy,Suspense,createContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import City from "./City";
import AddCity from "./AddCity";
import '../assets/form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalForm from "./ModalForm/ModalForm";


// Remote Micro Filter
const Filter = lazy (()=> import("Filter/Filter"));
export const CityContext = createContext([]);

function CitiesList(){ 
	
    const [cities,setCities] = useState([]);
    const [countries ,setCountries] = useState([]);
	const [getData ,setGetData] = useState({
        cities: false,
        countries:false,
    });
	const [filter ,setFilter] = useState("");
    const lastId = cities.length;

    const getAllCities =()=>{
		axios.get('http://localhost:3006/cities')
		.then(res =>{
			setCities(res.data);
           
		})
		.catch(err => console.log(err));
	}
   const getCountries =()=>{
    axios.get('http://localhost:3005/countries')
        .then(res =>{
        setCountries(res.data);
        setGetData({
            countries:true,
        });
        })
        .catch(err => setGetData({
            countries:false,
        }));
   }

    const addCityToState = (item) => {
        setCities([...cities, item]);

    };

    const updateState = (id,updatedData) => {
        setCities(prevData => {return prevData.map(item => {
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
    

  const deleteCityFromState = (id) => {
    const updatedCities = cities.filter((item) => item.id !== id);
    setCities(updatedCities);
  };

	useEffect(()=>{	
        getAllCities();
        getCountries();	
	},[])
	
	const filterNames =(name) =>{
       setFilter(name);
	};

	const namesHandler =() =>{
        if(filter.length !== 0){
			return cities.filter((el) => el.name.includes(filter));
		}
		return cities;
	};
    


    return(
    <CityContext.Provider value={{
        countries:countries,
        cities:namesHandler,
        addCityToState:addCityToState,
        updateState:updateState,
        deleteCityFromState:deleteCityFromState,
        getAllCities:getAllCities,
        lastId:lastId}}>  
     <Fragment>
		<div className="container">
        <div className="table-responsive crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                    <Suspense fallback={<div>Loding....</div>}><Filter filterValue={filterNames} /> </Suspense>  
					<div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>CITIES LIST</b></h2></div>
                  <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred text-end">			  
                   <ModalForm buttonLabel="Add" City={null}/>
                  </div>
                    </div>
                </div>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>   
                            <th>#</th>
                            <th>NAME <i className="fa fa-sort"></i></th>
                            <th>CODE</th>
                            <th>COUNTRY<i className="fa fa-sort"></i></th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    <City cities={namesHandler()} />	              
                    </tbody>
                </table>  
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
    </CityContext.Provider>   
 );
};

export default CitiesList;