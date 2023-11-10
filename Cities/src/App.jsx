import React from "react";
import ReactDOM from "react-dom";
import CitiesList from "./component/CitiesList.jsx";
// import AddCity from "./component/AddCity.jsx";
// import EditCity from "./component/EditCity.jsx";
import { BrowserRouter,Route, Routes} from 'react-router-dom';


import "./index.css";
import './assets/form.css';


const App = () => (
    
         <BrowserRouter>
          <Routes>
            <Route exact path="/Cities" element={<CitiesList />}></Route>
            {/* <Route  path="/AddCity" element={<AddCity />}></Route> */}
            {/* <Route  path="/EditCity" element={<EditCity />}></Route> */}
          </Routes>  
        </BrowserRouter> 
    
);
ReactDOM.render(<App />, document.getElementById("app"));
