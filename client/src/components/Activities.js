import React, { useState, useEffect } from "react";

import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";

import AxiosApiEndPoints from "./AxiosApiEndPoints";
import AxiosRequest from "./AxiosRequest";

const Activities = () =>  {
  const [status, setStatus] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);

  const [form, setValues] = useState({
    Activity: "",
    MET: "",
    user: "true",
  })
  
  useEffect(() => {
    async function fetchGetAPI() {     
      const response =  await AxiosRequest.get(AxiosApiEndPoints.activity.get);
        setActivities(response.reverse())      
    } 
    fetchGetAPI();
  }, [status]);

  const handleChange = e => {
    const fieldName = e.target.id.slice(2,); 
    
      setValues({
      ...form,
      [fieldName]: e.target.value
    });    
  };
  const selectActivity = (id) => {
    
      
      setValues({
...form,
         Activity: activities.filter( (item) => item.name === id).length>0?activities.filter( (item) => item.name === id)[0].name:null,
         MET: activities.filter( (item) => item.name === id).length>0?activities.filter( (item) => item.name === id)[0].MET:null
      });   
 
    }
  const newActivity = () => {
    async function fetchPostAPI() {     
      const response =  await AxiosRequest.post(AxiosApiEndPoints.activity.post,{
        name: form.Activity,
        MET:  form.MET,
        user: form.user
      });      
      setStatus( response )
      }    
    fetchPostAPI();
  };

  const deleteUser = (id, element) => {    
    async function fetchPostAPI() {     
      const response =  await AxiosRequest.post(AxiosApiEndPoints.activity.patch,{
        _id: id,
        name: element
      });      
      setStatus( response )
      }    
      window.confirm("Please confirm deletion of activity: " +element) &&
    fetchPostAPI() 
  };

// e.target.reportValidity() 

    return (
      <>
        {status && (
          <div className="statusMessage" onClick={() => setStatus("")}>
            <SvgIcon name="bulb" /> {status}
          </div>
        )}
        <section>
          <h4>Overview</h4>
          <h1>Edit Activities</h1>
          <div className="box">
            <fieldset>
              <legend>Manage Activities</legend>
              <div className="fieldrow">
                <FormInput fieldName={"Activity"} type={"text"} value={form.Activity} required={true} handler={e => handleChange(e)}   />
                <FormInput fieldName={"MET"} type={"text"} value={form.MET} required={true} handler={e => handleChange(e)}   />
              </div>
              MET = metabolic equivalent of task (more information)
              <ActivityList  deleteToggle={true} activities={activities} handler={(id) => selectActivity(id)} deleteUser={(id,name) => deleteUser(id, name)}  />    
              <div className="fieldrow">
              
                <button className="btn" onClick={ () => newActivity()}>
                  Create New Activity
                </button>
              </div>
            </fieldset>            
            

         
          </div>
        </section>
      </>
    );
  
}

export default Activities;
