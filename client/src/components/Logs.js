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
  const [showFilter, setFilter] = useState(false);


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
  const sortExercises = e => {
    const sortfield =e.target.value;
console.log(sortfield);
    const test = exercises.sort((a, b) => 
      String(a[sortfield]).localeCompare(String(b[sortfield]))
    ,undefined,{'numeric': true});
    //#################################################
    //#################################################
    console.log(exercises)
    setExercises([...test]);
  }; 

  const getExercises = () => {
    async function fetchGetAPI() {     
      const tester = form.Activity? "?test=" + form.Activity +"&date=2019-07-01" +"&limit=2" : ""
      const response =  await AxiosRequest.get(AxiosApiEndPoints.exercise.get + tester);
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
  
{console.log(1, String(1))}

  <div action="/api/exercise/log" method="get" id="usrfrm3" className="box">
      
  <fieldset>
              <legend>List your exercises</legend>
              <div className="fieldrow" >
      <FormInput fieldName={"Search"} type={"text"} placeholder="Leave blank to show all."  handler={e => handleChange(e)}  />
      <button className="btn" onClick={() => getExercises() }  type="submit">List Exercises</button>
      </div>
           
      {(exercises.length >= 1) &&
         <>
      <div className="fieldrow" >
      <div className="field">
        <button className="searchfilter" onClick={() => setFilter(!showFilter)}> Show exercises that match the following filters</button>
      </div></div>
      </>
        }
 
     

      {(showFilter && exercises.length >= 1) &&
      <>
      <div className="fieldrow" >
      <div className="field">
        <label htmlFor="daterange">
          Date
        </label>
        <div className="input">         
        <select onChange={e => handleChange(e)} id="feDaterange" >
<option>show all    </option>   
<option>today      </option>
<option>yesterday   </option>
<option>Last 7 Days </option>
<option>This Month  </option>
<option>Last Month  </option>
<option>Custom Range</option>
</select>

          <span>
            <SvgIcon name="feDate" />
          </span> 
          
        </div>
        </div>



       {form.Daterange &&
       <>
        <FormInput fieldName={"From Date"} type={"date"}  value={today} handler={e => handleChange(e)}  />   
        <FormInput fieldName={"To Date"} type={"date"}  minmax={[today,0]} value={today} handler={e => handleChange(e)}  />
        </>
      }

</div><div className="fieldrow">
<div className="field">
        <label htmlFor="">
          Sort by
        </label>
        <div className="input">         
        <select onChange={sortExercises}>
<option>Please choose  </option>   
<option value="username"> Activity     </option>
<option value="duration"> Duration     </option>
<option value="description"> Description     </option>
<option value="date"> Date     </option>
<option value="dalories"> Calories     </option>
</select>

          <span>
            <SvgIcon name="feSort" />
          </span> 
          
        </div>
      </div>
        <FormInput fieldName={"Limit Count"} type={"number"} minmax={[1,500]}  handler={e => handleChange(e)}  />
      
    
 
     <ActivityList deselectToggle={true} activity={form.Activity} activities={activities} handler={(id) => selectActivity(id)} />
     </div>
     </>
     }
 
    
      </fieldset>
      </div>
{exercises.length >= 1 &&             
            <div className="box">


      <div className="fieldrow">
                      <div className="field bold">Description</div>
                      <div className="field bold">Duration</div>
                      <div className="field bold">Activity</div>                     
                      <div className="field bold">Date</div>
                      <div className="field bold">Calories</div>
                      <div className="delete"> </div>
                    </div>
     
      {exercises.map((e, i) => {
                  return (

                      
                      
                        
                    <div className="fieldrow" style={i % 2? {background: "lightgrey"}: {} }>
                      <div className="field limit" title={e.description}>{e.description}</div>
                      <div className="field">{e.duration}</div>
                      <div className="field" style={{ textAlign: "center"}}>{e.username}</div>
                      
                      <div className="field">{new Date(e.date).toLocaleDateString()}</div>
                      <div className="field">{e.calories}</div>
                      <div className="delete" onClick={"() => this.props.deleteUser(e._id, e.name)"}> <SvgIcon name="Reset" /></div>
                    </div>
                  );
                })
                }

    
    
      </div>
      }
     
  </section>
</>

);

}



export default Logs;