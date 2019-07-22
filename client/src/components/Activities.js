import React, { useState, useEffect } from "react";
import axios from "axios";
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";


const HOST = "http://192.168.178.20:4000";
const activityGetUrl = "/api/exercise/users";
const acticityPostUrl = "/api/exercise/new-user";
const acticityPatchUrl = "/api/exercise/delete-user";

const Activities = () =>  {
  const [form, setValues] = useState({
    Activity: "",
    MET: "",
    user: "true",
  })
  
  const [status, setStatus] = useState("");
  const [activities, setActivities] = useState([]);
  
   

  const handleChange = e => {
    const fieldName = e.target.id.slice(2,); 
    
      setValues({
      ...form,
      [fieldName]: e.target.value
    });
    
    
  };


  const deleteUser = (id, element) => {
    //#### STATUS MESSAGE!!!

    axios
      .post(HOST + acticityPatchUrl, { _id: id,name:element })
      .then(data => {
         setStatus(data.data);
        
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  useEffect(() => {
    //setStatus("status:" + HOST + activityGetUrl );
    axios
      .get(HOST + activityGetUrl)
      .then(data => setActivities(data.data.reverse() ))
      .catch(err => {
        setStatus(  JSON.stringify(err) );
        ///#####################################'''''/
        ///#####################################'''''/
        // MOBILE zeigt nichts an wegen cors???
        ///#####################################'''''/
        ///#####################################'''''/
        ///#####################################'''''/
        
      });
    }, [status])

  const newActivity = () => {
    //#### STATUS MESSAGE!!!
    console.log(form.Activity);
    if (form.Activity.length > 3) {
      axios
        .post(HOST + acticityPostUrl, {
          name: form.Activity,
          MET:  form.MET,
          user: form.user
        })
        .then(data => setStatus( "getActivities())" ) )
        .catch(err => {
          console.log(err);
          return null;
        });
    } else {
    //  setStatus("Please fill out mandatory fields (marked with *).");
    }
  };

// e.target.reportValidity() 

    return (
      <>
        {status && (
          <div className="statusMessage">
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
