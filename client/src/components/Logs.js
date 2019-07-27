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
  const [exercisesFilter, setExercisesFilter] = useState([]);
  const [showFilter, setFilter] = useState(false);
  const [sort, toggleSort] = useState(true);

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
 console.log(form)
  };

  const sortExercises = (e,type) => {
    const fieldName = e.target.id ? e.target.id.slice(2,): e.target.parentElement.id; //special case for select
    console.log(fieldName,e.target.value,e.target);
    setValues({
      ...form,
      [fieldName]: e.target.value
    });   
    let sortfield =e.target.value;
    let exerciseList =    exercisesFilter;;
    
    if(sortfield ==="All"){
          
    setExercises([...exerciseList]);
      return false;
    }
    
    const limiter = (count) =>{   
      exerciseList = exerciseList.slice( 0, count);
      return exerciseList;
    }
    const activity = (name) => {      
        return exerciseList.filter( item => item.username===name )}

        
     if (type==="activity") {
      exerciseList = exercisesFilter;
      exerciseList = activity(sortfield);
      console.log(exerciseList)
      if (form["Limit Count"]) 
      
        exerciseList = limiter(form["Limit Count"]);
        console.log(exerciseList)
    } 
    else if (type==="limit" && sortfield!=="") {    
     
          exerciseList = exercisesFilter;
      
      exerciseList = limiter(sortfield);      
      
      if (form["activitySelect"] && form["activitySelect"] !== "All")      
      exerciseList = activity(form["activitySelect"]);
      
      console.log(exerciseList)
    } 

    else if (type==="sort") {
      toggleSort(!sort);

      exerciseList = exercisesFilter;
      let sortfield =e.target.id;
      exerciseList.map( (item) => {
        console.log ( new Date(item.date).toLocaleDateString('en-us') >= "07/05/2019")
      })

      if (sort) {
        exerciseList =exerciseList.sort((a, b) =>       a[sortfield]>=(b[sortfield])      ,);  }
      else {
        exerciseList =exerciseList.sort((a, b) =>       a[sortfield]<=(b[sortfield])        ,);  }   
        
        if (form["activitySelect"] && form["activitySelect"] !== "All")      
        exerciseList = activity(form["activitySelect"]);  
        if (form["Limit Count"]) 
      
        exerciseList = limiter(form["Limit Count"]);
        console.log(exerciseList)
    } else if (type==="search") {

      exerciseList = exercisesFilter;
      console.log(sortfield)
        //exerciseList = exerciseList.filter((item) => item.description === sortfield) 
        console.log(exerciseList)


        
    let name  = exerciseList.filter(item => item.description.toLowerCase().search( e.target.value.toLowerCase()) !== -1);
    let prep = exerciseList.filter(item => item.username.toLowerCase().search( e.target.value.toLowerCase()) !== -1);  
    exerciseList = name.concat(prep);


    }
    //#################################################
    //#################################################
    
    setExercises([...exerciseList]);
  
  }; 

  const getExercises = () => {
    async function fetchGetAPI() {     
      const response =  await AxiosRequest.get(AxiosApiEndPoints.exercise.get );
        setExercises(response.reverse())    
        setExercisesFilter(response.reverse());  
    } 
    fetchGetAPI();
    
  };
  const selectActivity = (id) => {
    setValues({ Activity: id});   
   
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
              <div className="fieldrow" >
      <FormInput fieldName={"Search"} type={"text"} placeholder="Leave blank to show all."   handler={(e) => sortExercises(e,"search")}   />
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
 
     

      {(showFilter ) &&
      <fieldset>
      <div className="fieldrow" >
      <div className="field">
        <label htmlFor="daterange">
          Date
        </label>
        <div className="input">         
        <select onChange={e => handleChange(e)} id="feDaterange" >
<option value="all">show all    </option>   
<option value="today">today      </option>
<option value="yesterday">yesterday   </option>
<option value="sevendays">Last 7 Days </option>
<option value="thismonth">This Month  </option>
<option value="lastmonth">Last Month  </option>
<option value="true">Custom Range</option>
</select>

          <span>
            <SvgIcon name="feDate" />
          </span> 
          
        </div>
        </div>



       {form.Daterange === "true" &&
       <>
        <FormInput fieldName={"From Date"} type={"date"}  value={today} handler={e => handleChange(e)}  />   
        <FormInput fieldName={"To Date"} type={"date"}  minmax={[today,0]} value={today} handler={e => handleChange(e)}  />
        </>
      }

</div><div className="fieldrow">
 
        <FormInput fieldName={"Limit Count"} type={"number"} minmax={[1,500]}  handler={(e) => sortExercises(e,"limit")}  />
      
    
 
     <ActivityList deselectToggle={true} activity={form.Activity} activities={activities} handler={(e) => sortExercises(e,"activity")} />
     </div>
     </fieldset>
     }
 
    
      </fieldset>
      </div>
{exercises.length >= 1 &&             
            <div className="box">


      <div className="gridrow sortable">
                      <div className="field bold" id="description" onClick={(e) => sortExercises(e,"sort")}>&#8645; Description</div>
                      <div className="field bold" id="duration" onClick={(e) => sortExercises(e,"sort")}>&#8645; Duration</div>
                      <div className="field bold" id="username" onClick={(e) => sortExercises(e,"sort")} >&#8645; Activity</div>                     
                      <div className="field bold" id="date" onClick={(e) => sortExercises(e,"sort")} >&#8645; Date</div>
                      <div className="field bold" id="calories" onClick={(e) => sortExercises(e,"sort")} >&#8645; Calories</div>
                      <div className="delete"> </div>
                    </div>
     
      {exercises.map((e, i) => {
                  return (

                      
                      
                        
                    <div className="gridrow" style={i % 2? {background: "lightgrey"}: {} }>
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