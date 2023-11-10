import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button,Modal,Input,Form  } from 'react-bootstrap';

import { Link ,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import shortid from 'shortid';
import axios from "axios";

import '../assets/form.css';

function AddCity({countries,getAllCities,lastId}){

    
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values ,setValues] = useState({
      id: '',
      shortid: shortid.generate(),
      name:'',
      countryId:'',
      code:''
    });
   
    const handleInputChange = (e) => {
      setValues({ ...values, id:lastId+1, [e.target.name]: e.target.value });
    };

   
    const handelSubmit =(event) => {
      event.preventDefault();
      axios.post('http://localhost:3006/cities',values)
      .then(res=> {
        console.log(res);
        getAllCities();
        navigate('/Cities');
      })
      .catch(err => console.log(err));
      }



  return(
        <Fragment>
          <Button variant="primary" onClick={handleShow}  >
            Add New Country
          </Button>
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>ADD COUNTRY</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handelSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Name" name="name" id="name" onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Enter  code" name="code" id="code" onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group mt-3">
                    <select className="form-select" onChange={e => { setValues({ ...values, countryId: e.target.value }) }} >
                      {countries.map((el) =>(<option value={el.id}>{el.name}</option>))}
                    </select>
                  </div>
                  <button type="submit" onClick={handleClose} className="btn btn-success mt-4">Add Country</button>
                </form>
              </Modal.Body>
              <Modal.Footer>
             </Modal.Footer>
            </Modal>
          </div>
       </Fragment>       
    );
    };

export default AddCity;
