import React, { Fragment, useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button,Modal,Input,Form  } from 'react-bootstrap';

import '../assets/form.css';

 function EditCity({id ,country}){
 
    const location = useLocation();
    // const ID = location.state.id;
    // const countries = location.state.countries;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [getData , setData] = useState(false);
    const [values ,setValues] = useState({
      name:'',
      countryId: '',
      code:''
     
    });
    
    const getCity =()=>{
      axios.get('http://localhost:3006/cities/'+ id)
      .then(res =>{
        setValues(res.data);
        setData(true);
      })
      .catch(err => console.log(err));
    }
  
    useEffect(()=>{
      if(getData){ 
		   console.log(getData);
		   return;
		}else{
      getCity();
		}	
      
    },[]);

    const handleInputChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    const  navigate = useNavigate();
    const handelSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:3006/cities/'+id,values)
      .then(res => {
        console.log(res)
        navigate('/Cities')
      })
      .catch(err => console.log(err));
      }

      return(
      <Fragment>
        {/* <Button variant="primary" onClick={handleShow}  >
            Add New Country
          </Button> */}
          <Link onClick={handleShow} className="edit" title="Edit" data-toggle="tooltip"> <i className="material-icons">&#xE254;</i> </Link>
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
                    <input type="text" className="form-control" placeholder="Enter Name" value={values.name} name="name" id="name" onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Enter  code" value={values.code} name="code" id="code" onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group mt-3">
                  <select className="form-select" value={values.countryId} onChange={e=>{setValues({...values, countryId: e.target.value})}}>
                {country.map((el) =>(<option value={el.id}>{el.name}</option>))} 
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

export default EditCity;
