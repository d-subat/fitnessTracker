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

  const [form, setValues] = useState({
    Activity: "",
 
  })
  
  useEffect(() => {
    async function fetchGetAPI() {     
      const response =  await AxiosRequest.get(AxiosApiEndPoints.activity.get);
        setActivities(response.reverse())      
    } 
    fetchGetAPI();
  }, [status]);



 
  const getExercises = () => {
    /*
    axios
      .get(HOST + exerciseGetUrl)
      .then(data => this.setState({ exercises: data.data.reverse() }))
      .catch(err => {
        console.log(err);
        return null;
      });
      */
  };
  const selectActivity = (id) => {
      
    this.setState({ activity: id});   
    console.log(this.state.newuser);
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
        <FormInput fieldName={"From Date"} type={"date"} required={true} value={today} handler={"e => this.handleDate(e)"} />
        <FormInput fieldName={"To Date"} type={"date"} required={true} minmax={[today,0]} value={today} handler={"e => this.handleDate(e)"} />
        <FormInput fieldName={"Limit Count"} type={"number"} minmax={[1,500]} required={true} handler={""} />
      </div>
      </fieldset>
 
     <ActivityList activity={form.activity} activities={activities} handler={(id) => selectActivity(id)} />
      
      <button className="btn" onClick={() => getExercises() }  type="submit">List Exercises</button>
      Leave blank to show all.
      </div>


{this.state.exercises.length >= 1 &&             
            <div className="box">
      <h2>Successfully searched for exercises  with activity {this.state.newuser}<br/>        '08-11-2017' to '09-27-2018':</h2>
      <div id="result3">
     
     
      {this.state.exercises.map((e, i) => {
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