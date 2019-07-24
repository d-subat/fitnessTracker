import React, { useState, useEffect } from "react";

import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";

import AxiosApiEndPoints from "./AxiosApiEndPoints";
import AxiosRequest from "./AxiosRequest";

const Activities = () =>  {
  const [status, setStatus] = useState("");
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
    fetchPostAPI();
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
                <FormInput fieldName={"Activity"} type={"text"} required={true} handler={e => handleChange(e)}   />
                <FormInput fieldName={"MET"} type={"text"} required={true} handler={e => handleChange(e)}   />
              </div>
              <div className="fieldrow">
                
                <button className="btn" onClick={ () => newActivity()}>
                  Create New Activity
                </button>
              </div>
            </fieldset>            
            <ActivityList  deleteToggle={true} activities={activities}  deleteUser={(id,name) => deleteUser(id, name)}  handler={e => false} />

         
          </div>
        </section>
      </>
    );
  
}

export default Activities;
