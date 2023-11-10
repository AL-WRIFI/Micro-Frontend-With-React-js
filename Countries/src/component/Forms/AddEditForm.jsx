import React, { useState, useEffect ,useContext,Fragment,Link} from "react";
import { CountryContext } from "../CountryList";
import shortid from 'shortid';
import axios from "axios";

function EditForm(props) {

 let data = useContext(CountryContext)
 const countries = data.namesHandler();
 const lastId =countries[countries.length -1];
 const updateState = data.updateState;
 const addCountyToState = data.addCountyToState;
 let id =props.Country === null ? "" : props.Country.id;

 const [form ,setValues] = useState({
      id: (props.Country === null ? lastId.id+1 : ''),
      shortid:(props.Country === null ? shortid.generate() : props.Country.shortid),
      name:'',
      code:'',
      nameEn:'',
      description:'',
      currencyCode:'',
      flag:'',
      nationality:'',
      iso3Code:'',
      dialPatterns:'',
    });

 useEffect(() => {
  if(props.Country !== null){
    setValues({
      id:props.Country.id,
      shortid:props.Country.shortid,
      name:props.Country.name,
      code:props.Country.code,
      nameEn:props.Country.nameEn,
      description:props.Country.description,
      currencyCode:props.Country.currencyCode,
      flag:props.Country.flag,
      nationality:props.Country.nationality,
      iso3Code:props.Country.iso3Code,
      dialPatterns:props.Country.dialPatterns,
    });
  }
 }, [props.Country]);
const handleInputChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
 };

 const submitFormAdd = (e) => {
  e.preventDefault();
  
  axios.post('http://localhost:3005/countries',form)
  .then(res => {})
  .catch(err => console.log(err));
    addCountyToState(form);
    props.toggle();
 };
  

 const submitFormEdit = (e) => {
    e.preventDefault();
      axios.put('http://localhost:3005/countries/'+id,form)
      .then(res => {})
      .catch(err => console.log(err));
      updateState(id,form);
      props.toggle();
 };

 return (
      <form onSubmit={props.Country ? submitFormEdit : submitFormAdd}>
        <div className="form-group">
          <input type="text" className="form-control" value={form.name === null ? "" : form.name} placeholder="Enter Name" name="name" id="name" onChange={handleInputChange} required/>
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control" value={form.code === null ? "" : form.code} placeholder="Enter code" name="code" id="code" onChange={handleInputChange} required/>
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.nameEn === null ? "" : form.nameEn} placeholder="Enter  nameEn" name="nameEn" id="nameEn" onChange={handleInputChange} required/>
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.description === null ? "" : form.description} placeholder="description" name="description" id="description" onChange={handleInputChange}  />
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.currencyCode === null ? "" : form.currencyCode} placeholder="Enter  currencyCode" name="currencyCode" id="currencyCode" onChange={handleInputChange} />
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.flag === null ? "" : form.flag} placeholder="Enter flag" name="flag" id="flag" onChange={handleInputChange} />
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.nationality === null ? "" : form.nationality} placeholder="Enter  nationality" name="nationality" id="nationality" onChange={handleInputChange} />
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.iso3Code === null ? "" : form.iso3Code} placeholder="Enter iso3Code" name="iso3Code" id="iso3Code" onChange={handleInputChange} />
          </div>
          <div className="form-group mt-3">
          <input type="text" className="form-control" value={form.dialPatterns === null ? "" : form.dialPatterns} placeholder="Enter dialPatterns" name="dialPatterns" id="dialPatterns" onChange={handleInputChange} />
          </div>
        <button type="submit" className="btn btn-success mt-4">{props.Country ? 'Update' : "Add New"}</button>
      </form>     
  );
}

export default EditForm;

