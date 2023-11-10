
import React, { useState, useEffect ,useContext,Fragment,Link} from "react";
import { CurrencyContext } from "../CurrenciesList";
import shortid from 'shortid';
import axios from "axios";

function ADddEditForm(props) {

 let data = useContext(CurrencyContext)
 const currencies = data.namesHandler();
 const lastId =currencies[currencies.length -1];
 const updateState = data.updateState;
 const addCurrencyToState = data.addCurrencyToState;
 let id =props.Currency === null ? "" : props.Currency.id;
 
 const [form ,setValues] = useState({
      id:(props.Currency === null ? lastId.id+1 : ''),
      shortid: (props.Currency === null ? shortid.generate() : props.Currency.shortid), 
      name:'',
      code:'',
      fragment:''
    });

 useEffect(() => {
  if(props.Currency !== null){
    setValues({
      id:props.Currency.id,
      shortid:props.Currency.shortid,
      name:props.Currency.name,
      code:props.Currency.code,
      fragment:props.Currency.fragment
    });
  }
 }, [props.Currency]);



const handleInputChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
 };

 const submitFormAdd = (e) => {
  e.preventDefault();
  
  axios.post('http://localhost:3007/currencies',form)
  .then(res => {

  })
  .catch(err => console.log(err));
    addCurrencyToState(form);
    props.toggle();
 };
  

 const submitFormEdit = (e) => {
    e.preventDefault();
      axios.put('http://localhost:3007/currencies/'+id,form)
      .then(res => {})
      .catch(err => console.log(err));
      updateState(id,form);
      props.toggle();
 };

 return (
        <form onSubmit={props.Currency ? submitFormEdit : submitFormAdd}>
          <div className="form-group">
            <input type="text" className="form-control" value={form.name === null ? "" : form.name} placeholder="Enter Name" name="name" id="name" onChange={handleInputChange} required/>
            </div>
            <div className="form-group mt-3">
              <input type="text" className="form-control" value={form.code === null ? "" : form.code} placeholder="Enter code" name="code" id="code" onChange={handleInputChange} required/>
            </div>
            <div className="form-group mt-3">
            <input type="text" className="form-control" value={form.fragment === null ? "" : form.fragment} placeholder="Enter fragment" name="fragment" id="fragment" onChange={handleInputChange} required/>
            </div>
          <button type="submit" className="btn btn-success mt-4">{props.Currency ? 'Update' : "Add New"}</button>
        </form> 
 );
}

export default ADddEditForm;
