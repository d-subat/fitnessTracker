import React, { Component } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import ReactDOM from 'react-dom'

const HOST = "http://localhost:4000";
const activityGetUrl = "/api/exercise/users";
const exerciseGetUrl = "/api/exercise/log";


class Logs extends Component {
  state = {
    users: [],
    exercises: [],
    newuser: "",
    status: "",
    isScrolling: false
  };


 

  async componentDidMount() {
    this.getUsers();
 
  }
  getUsers = () => {
    axios
      .get(HOST + activityGetUrl)
      .then(data => this.setState({ users: data.data.reverse() }))
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  getExercises = () => {
    axios
      .get(HOST + exerciseGetUrl)
      .then(data => this.setState({ exercises: data.data.reverse() }))
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  selectActivity = (id) => {
      
    this.setState({ newuser: id});   
    console.log(this.state.newuser);
  }
  
 
  render() {
    const today = new Date().toISOString().substring(0, 10);
    return (
  <>
  <section>
  <h4>Overview</h4>
  <h1>Recent Exercises</h1>
  


  <div action="/api/exercise/log" method="get" id="usrfrm3" className="box">
      
  <fieldset>
              <legend>List your exercises</legend>
      
      <div className="fieldrow    ">
        <FormInput fieldName={"From Date"} type={"date"} required={true} value={today} handler={"e => this.handleDate(e)"} />
        <FormInput fieldName={"To Date"} type={"date"} required={true} minmax={[today,0]} value={today} handler={"e => this.handleDate(e)"} />
        <FormInput fieldName={"Limit Count"} type={"number"} minmax={[1,500]} required={true} value={today} handler={""} />
      </div>
      </fieldset>
      <legend for="selectUser">Select Activity </legend>
            <div className="container grid">
              {this.state.users.length === 0 ? (
                <div>Loading...</div>
              ) : (
                this.state.users.map((e, i) => {
                  return (
                    <div key={i} onClick={() => this.selectActivity(e.username)} className={this.state.newuser===e.username? "activities select active" :"activities select"}>
                      {e.username}
                    </div>
                  );
                })
              )}
            </div>
      <button className="btn" onClick={() => this.getExercises() }  type="submit">List Exercises</button>
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
}


export default Logs;