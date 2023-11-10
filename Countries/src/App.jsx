import React from "react";
import ReactDOM from "react-dom";
import CountryList from "./component/CountryList.jsx";
// import AddCountry from "./component/AddCountry.jsx";
// import EditCountry from "./component/EditCountry.jsx";
import { createBrowserRouter,RouterProvider,BrowserRouter,Route, Routes} from 'react-router-dom';
import { Provider } from "react-redux";
// import {storeApi}  from "./store/index.jsx";
// import Header from "./component/Header.jsx";

import "./index.css";

const App = () => (
    // <Provider store={storeApi}>
         <BrowserRouter>
          <Routes>
            <Route exact path="/Countries" element={<CountryList />}></Route>
            {/* <Route  path="/AddCountry" element={<AddCountry />}></Route>
            <Route  path="/Edit" element={<EditCountry />}></Route> */}
          </Routes>  
        </BrowserRouter> 
    // </Provider> 
);
ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById("app"));
