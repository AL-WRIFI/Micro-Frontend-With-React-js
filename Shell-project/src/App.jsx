import React,{Fragment, lazy,Suspense} from "react";
import ReactDOM from "react-dom";
import Header from "./Layouts/Header";
import { createBrowserRouter,RouterProvider,BrowserRouter,Route, Routes, Router  } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assest/form.css';
import './index.css';
 

  // Remot Micro Component

  //COUNTRIES
  const CountryList = lazy(() => import("Countries/CountryList"));
  // const AddCountry = lazy(() => import("Countries/AddCountry"));
  // const EditCountry = lazy(() => import("Countries/EditCountry"));
  //CITIES
  const CitiesList = lazy(() => import("Cities/CitiesList"));
  // const AddCity = lazy(() => import("Cities/AddCity"));
  // const EditCity = lazy(() => import("Cities/EditCity"));
  //CURRENCIES currencies
  const CurrenciesList = lazy(() => import("Currencies/CurrenciesList"));
  // const AddCurrency = lazy(() => import("Currencies/AddCurrency"));
  // const EditCurrency = lazy(() => import("Currencies/EditCurrency"));
  // const Header = lazy(() => import("Layouts/Header"));

  const App = () => (
    <Fragment>
    <BrowserRouter>
    <Header />
      <Routes>
        {/* COUNTRIES ROUTE*/}
        <Route exact path="/Countries" element={<Suspense fallback={<div>Loding....</div>}><CountryList /> </Suspense> }></Route>
        {/* CITIES ROUTE */}
        <Route  path="/Cities" element={<Suspense fallback={<div>Loding....</div>}><CitiesList /> </Suspense> }></Route>
        {/* CURRENCIES ROUTE  */}
        <Route  path="/Currencies" element={<Suspense fallback={<div>Loding....</div>}><CurrenciesList /> </Suspense> }></Route>
      </Routes>  
    </BrowserRouter> 
    </Fragment>
  );
  ReactDOM.render(<App />, document.getElementById("app"));
