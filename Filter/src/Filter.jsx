import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";


const Filter = ({ filterValue }) => {

  const [filter ,setFilter] = useState("");

  const filterHandler = (event) =>{
    const name = event.target.value;
    setFilter(name);
    filterValue(name);
  };
  return (
    <Fragment>
      <div className="col-sm-3 mt-5 mb-4 text-gred">
        <div className="search">
          <form className="form-inline">
          <input className="form-control mr-sm-2" value={filter} onChange={filterHandler} type="search" placeholder="Search &hellip;" aria-label="Search"/>
          </form>
        </div>
      </div>
      {/* <div className="col-sm-4">
        <div className="search-box">
          <i className="material-icons">&#xE8B6;</i>
          <input
            type="text"
            className="form-control"
            placeholder="Search&hellip;"
            value={filter}
            onChange={filterHandler}
          />
        </div>
      </div> */}
    </Fragment>
  );
};

export default Filter;
