import React, { useState,useEffect } from "react";

import StopWatch from "./StopWatch";
import CalculateCal  from "./MetTable"
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";
import AxiosApiEndPoints from "./AxiosApiEndPoints";
import AxiosRequest from "./AxiosRequest";

import {  AuthUserObjectContext,withAuthentication } from "./Session";

const Exercises = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [status, setStatus] = useState("");
  const [userobj, setUserObj] = useState("");
  const [runningTime, setTime] = useState("");
  const [activities, setActivities] = useState([]);
  const [exercises, setExercises] = useState([]);
  
  const [form, setValues] = useState({})

  useEffect(() => {
    async function fetchGetAPI() {     
      const response =  await AxiosRequest.get(AxiosApiEndPoints.activity.get);
        setActivities(response.reverse())      
    } 
    fetchGetAPI();
  }, [status]);

  const newExercise = async (e) => {
 
 e.preventDefault();
 console.log(form.test);
 const objExc = {
          weight: userobj.weight,
          height: userobj.height,
          age: userobj.age,
          gender: userobj.gender,
          duration: runningTime / 1000, // seconds
          activity: form.Activity,
        }
        
    const calculatedCalories =CalculateCal(activities,objExc    );      
    setValues({kal:  calculatedCalories});
    console.log("kal", calculatedCalories)

    if (form.Activity && form.Description && runningTime && form.Date){
      console.log(form,"--------",form.Activity , form.Description, runningTime , form.Date)
      async function fetchPostAPI() {     
        const response =  await AxiosRequest.post(AxiosApiEndPoints.exercise.post,{
          "username": form.Activity,
          "description": form.Description,
          "duration": runningTime,
          "date": form.Date,
          calories: parseInt(calculatedCalories,10)
        });      
        console.log("sdf")
        setStatus( response )
        }    
      fetchPostAPI();
      }
      else {
        setStatus(  "Please fill out mandatory fields (marked with *)." );
      }
  };
 
  const saveTimer = (runningTime,time) => {
    setTime(runningTime );  
  }

  const handleChange = e => {
    const fieldName = e.target.id.slice(2,); 
      setValues({
      ...form,
      [fieldName]: e.target.value
    });    
  };
 
  const selectActivity = (id) => {
    setValues({  ...form,Activity: id});   
    setExercises("")   
  }

    return (
      <>
          <AuthUserObjectContext.Consumer>
               {userobj =>
              {setUserObj(userobj)}
              }
          </AuthUserObjectContext.Consumer>
          {status && (
          <div className="statusMessage" onClick={() => setStatus("")}>
            <SvgIcon name="bulb" /> {status}
          </div>
        )}
        <section>
          <h4>Exercises</h4>
          <h1>Manage Exercises</h1>

          <form
            onSubmit={(e) => newExercise(e)}
            id="usrfrm2"
            className="box"
            method="post"
          >
    <fieldset>
              <legend>Add new exercise</legend>
            <FormInput fieldName={"Description"} type={"text"} required={true} handler={e => handleChange(e)}  />
            <div className="fieldrow">
              <StopWatch saveTimer={saveTimer} time={form.time}/>           
              <FormInput fieldName={"Date"} type={"date"} value={today} required={true} handler={e => handleChange(e)}  />
              <FormInput fieldName={"Calories"} type={"text"} required={false} value={form.kal>=0? form.kal : ""} />
            </div>
            
            <ActivityList activity={form.Activity} activities={activities} handler={(id) => selectActivity(id)} />
      
            <div className="fieldrow">                   
            <div className="field">
            <button className="btn" onSubmit={(e) => newExercise(e)} type="submit">Save Exercise</button>
            </div>
            <div className="field">or</div>
            <div className="field"><button className="activities select" style={{maxHeight:"auto"}}>Track on Map</button></div>
              </div>
              </fieldset>
          </form>
       </section>
      </>
    );
  
}

export default withAuthentication(Exercises);
