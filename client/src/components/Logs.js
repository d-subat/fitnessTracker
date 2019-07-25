import React, { useState,useEffect} from "react";

import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";
import AxiosApiEndPoints from "./AxiosApiEndPoints";
import AxiosRequest from "./AxiosRequest";


const Logs = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [status, setStatus] = useState("");
  const [activities, setActivities] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [form, setValues] = useState({
    Activity: "",
    "From Date": today,
    "To Date": today
 
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
 
  const getExercises = () => {
    async function fetchGetAPI() {     
      const response =  await AxiosRequest.get(AxiosApiEndPoints.exercise.get);
        setExercises(response.reverse())      
    } 
    fetchGetAPI();
  };
  const selectActivity = (id) => {
    setValues({ Activity: id});   
    setExercises("")   
  }
  
 
   return (
  <>
          {status && (
          <div className="statusMessage" onClick={() => setStatus("")}>
            <SvgIcon name="bulb" /> {status}
          </div>
        )}
  <section>
  <h4>Overview</h4>
  <h1>Recent Exercises</h1>
  


  <div action="/api/exercise/log" method="get" id="usrfrm3" className="box">
      
  <fieldset>
              <legend>List your exercises</legend>
      
      <div className="fieldrow    ">
        <FormInput fieldName={"From Date"} type={"date"} required={true} value={today} handler={e => handleChange(e)}  />   
        <FormInput fieldName={"To Date"} type={"date"} required={true} minmax={[today,0]} value={today} handler={e => handleChange(e)}  />
        <FormInput fieldName={"Limit Count"} type={"number"} minmax={[1,500]} required={true} handler={e => handleChange(e)}  />
      </div>
    
 
     <ActivityList activity={form.Activity} activities={activities} handler={(id) => selectActivity(id)} />
      
      <button className="btn" onClick={() => getExercises() }  type="submit">List Exercises</button>
      Leave blank to show all.
      
      </fieldset>
      </div>
{exercises.length >= 1 &&             
            <div className="box">
              {console.log(form)}
      <h2>Successfully searched for exercises  with activity {form.Activity}<br/>  {form["From Date"]} to {form["To Date"]} :</h2>
      <div id="result3">
     
     
      {exercises.map((e, i) => {
                  return (
<div className="vertical">       
                      {e.username}
                    </div>
                  );
                })
                }

      </div>
    
      </div>
      }
     
  </section>
</>

);

}



export default Logs;