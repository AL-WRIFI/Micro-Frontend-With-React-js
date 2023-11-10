import React, { Fragment, useState,useContext } from "react";
import { Button,Modal} from 'react-bootstrap';
import { CountryContext } from "../CountryList";
import AddEditForm from "../Forms/AddEditForm";
import { Link  } from "react-router-dom";
import axios from "axios";



function ModalForm(props) {

  let data = useContext(CountryContext); 
  const deleteCountryFromState = data.deleteCountryFromState;
  const label = props.buttonLabel;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete =(id)=>{
    const confirm = window.confirm("هل تريد حذف العنصر");
    if(confirm){
       axios.delete('http://localhost:3005/countries/'+id)
        .then(res => {
        })
        .catch(err => console.log(err));
        deleteCountryFromState(id);
        }
    }
 
   


  let button ="";
  let title = "";
  if (label === "Edit") {
    button = <div><Link onClick={toggle}  className="edit" title="Edit" data-toggle="tooltip"> <i className="material-icons">&#xE254;</i> </Link>
             <Link  onClick={(e)=>handleDelete(props.Country.id)} className="delete" title="Delete" data-toggle="tooltip"> <i className="material-icons">&#xE872;</i> </Link></div>;
    title = "Edit Country";
  } else {
     button = <Button variant="primary" onClick={toggle}>Add New Country</Button>;
     title = " Add New Country";   
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
           <AddEditForm toggle={toggle} Country={props.Country ?? null}/>
          </Modal.Body>
          <Modal.Footer>
         </Modal.Footer>
        </Modal>
      </div>
      </Fragment>
  );
}

export default ModalForm;
