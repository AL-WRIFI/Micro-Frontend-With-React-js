import React, { Fragment, useState, useContext } from "react";
import { Button,Modal} from 'react-bootstrap';
import {CurrencyContext} from "../CurrenciesList"
import ADddEditForm from "../Forms/AddEditForm";
import { Link  } from "react-router-dom";
import axios from "axios";



function ModalForm(props) {

  
  let data = useContext(CurrencyContext); 
  const deleteCurrencyFromState = data.deleteCurrencyFromState;
  const label = props.buttonLabel;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // const navigate = useNavigate();	
  const handleDelete =(id)=>{
	const confirm = window.confirm("هل تريد حذف العنصر");
	if(confirm){
	   axios.delete('http://localhost:3007/currencies/'+id)
      .then(res => {
        // navigate('/Currencies')
      })
      .catch(err => console.log(err));
       deleteCurrencyFromState(id);
      }
	}
   


  let button ="";
  let title = "";
  if (label === "Edit") {
    button = <div><Link onClick={toggle}  className="edit" title="Edit" data-toggle="tooltip"> <i className="material-icons">&#xE254;</i> </Link>
             <Link  onClick={(e)=>handleDelete(props.Currency.id)} className="delete" title="Delete" data-toggle="tooltip"> <i className="material-icons">&#xE872;</i> </Link></div>;
    title = "Edit Currency";
  } else {
     button = <Button variant="primary" onClick={toggle}>Add New Country</Button>;
     title = " Add New Currency";   
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
           <ADddEditForm toggle={toggle} Currency={props.Currency??null}/>
          </Modal.Body>
          <Modal.Footer>
         </Modal.Footer>
        </Modal>
      </div>
      </Fragment>
  );
}

export default ModalForm;
