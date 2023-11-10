import React, { Fragment, useState,useContext } from "react";
import { Button,Modal} from 'react-bootstrap';
import { CityContext } from "../CitiesList";
import EditForm from "../Forms/AddEditForm";
import { Link  } from "react-router-dom";
import axios from "axios";



function ModalForm(props) {

  let data = useContext(CityContext); 
  const deleteCityFromState = data.deleteCityFromState;
  // const getAllCities = data.getAllCities;
  const label = props.buttonLabel;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete =(id)=>{
    const confirm = window.confirm("هل تريد حذف العنصر");
    if(confirm){
       axios.delete('http://localhost:3006/cities/'+id)
        .then(res => {
        })
        .catch(err => console.log(err));
         deleteCityFromState(id);
        }
    }
   


  let button ="";
  let title = "";
  if (label === "Edit") {
    button = <div><Link onClick={toggle}  className="edit" title="Edit" data-toggle="tooltip"> <i className="material-icons">&#xE254;</i> </Link>
             <Link  onClick={(e)=>handleDelete(props.City.id)} className="delete" title="Delete" data-toggle="tooltip"> <i className="material-icons">&#xE872;</i> </Link></div>;
    title = "Edit City";
  } else {
     button = <Button variant="primary" onClick={toggle}>Add New Country</Button>;
     title = " Add New City";   
  }
  return (
      <Fragment>
      {button}
      <div className="model_box">
        <Modal
          show={modal}
          onHide={toggle}
          backdrop="static"
          keyboard={false}>
          <Modal.Header toggle={toggle} closeButton>
            <Modal.Title> {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <EditForm toggle={toggle} City={props.City??null}/>
          </Modal.Body>
          <Modal.Footer>
         </Modal.Footer>
        </Modal>
      </div>
      </Fragment>
  );
}

export default ModalForm;
