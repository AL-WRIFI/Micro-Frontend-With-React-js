import React from "react";
import ReactDOM from "react-dom";
import CurrenciesList from "./component/CurrenciesList.jsx";
// import AddCurrency from "./component/AddCurrency.jsx";
// import EditCurrency from "./component/EditCurrency.jsx";
import { BrowserRouter,Route, Routes} from 'react-router-dom';


import "./index.css";
import './assets/form.css';


const App = () => (
    
         <BrowserRouter>
          <Routes>
            <Route exact path="/Currencies" element={<CurrenciesList />}></Route>
            {/* <Route  path="/AddCurrency" element={<AddCurrency />}></Route> */}
            {/* <Route  path="/EditCurrency" element={<EditCurrency />}></Route> */}
          </Routes>  
        </BrowserRouter> 
    
);
ReactDOM.render(<App />, document.getElementById("app"));
