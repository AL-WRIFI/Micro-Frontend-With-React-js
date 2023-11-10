
import React, { useState, useEffect ,useContext,Fragment,Link} from "react";
import { CityContext } from "../CitiesList";
import shortid from 'shortid';
import axios from "axios";

function EditForm(props) {

 let data = useContext(CityContext)
 const cities = data.namesHandler();
 const lastId =cities[cities.length -1];
 const countries = data.countries;
 const updateState = data.updateState;
 const addCityToState = data.addCityToState;
 let id =props.City === null ? "" : props.City.id;
 
 const [form ,setValues] = useState({
      id:(props.City === null ? lastId.id+1 : ''),
      shortid: (props.City === null ? shortid.generate() : props.City.shortid), 
      name:'',
      countryId:'',
      code:''
    });

 useEffect(() => {
  if(props.City !== null){
    setValues({
      id:props.City.id,
      shortid:props.City.shortid,
      name:props.City.name,
      countryId:props.City.countryId,
      code:props.City.code
    });
  }
 }, [props.City]);



const handleInputChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
 };

 const submitFormAdd = (e) => {
  e.preventDefault();
  
  axios.post('http://localhost:3006/cities',form)
  .then(res => {})
  .catch(err => console.log(err));
    addCityToState(form);
    props.toggle();
 };
  

 const submitFormEdit = (e) => {
    e.preventDefault();
    console.log(form);
      axios.put('http://localhost:3006/cities/'+id,form)
      .then(res => {})
      .catch(err => console.log(err));
      updateState(id,form);
      props.toggle();
 };



 return (
            <form onSubmit={props.City ? submitFormEdit : submitFormAdd}>
              <div className="form-group">
                <input type="text" className="form-control" value={form.name === null ? "" : form.name} placeholder="Enter Name" name="name" id="name" onChange={handleInputChange} required/>
               </div>
               <div className="form-group mt-3">
                 <input type="text" className="form-control" value={form.code === null ? "" : form.code} placeholder="Enter code" name="code" id="code" onChange={handleInputChange} required/>
                </div>
                <div className="form-group mt-3">
                 <select className="form-select" value={form.countryId} onChange={e => { setValues({ ...form, countryId: e.target.value }) }} >
                    {countries.map((el) =>(<option value={el.id}>{el.name}</option>))}
                 </select>
                </div>
              <button type="submit" className="btn btn-success mt-4">{props.City ? 'Update' : "Add New"}</button>
            </form>     
   );
  }

export default EditForm;
