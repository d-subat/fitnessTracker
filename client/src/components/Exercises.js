import React, { Component } from "react";
import axios from "axios";

import StopWatch from "./StopWatch";
import {calculate} from "./MetTable"
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";


const HOST = "http://192.168.178.20:4000";
const acticityGetUrl = "/api/exercise/users";
const acticityPostUrl = "/api/exercise/add";
const myUrl = HOST + acticityGetUrl;

class Exercises extends Component {
  state = {
    users: [],
    activity: "",
    
    description: "",
    time: "",
    date: new Date().toISOString().substring(0, 10),
    kal: "",
    status: "",
    responseData: "",

  };
  async componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get(myUrl)
      .then(data => this.setState({ users: data.data.reverse() }))
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  newExercise = (e) => {
    //#### STATUS MESSAGE!!!
    
 e.preventDefault();
 
    if (this.state.activity && this.state.description && this.state.time && this.state.date){
      const excObj = {

//################ get BMI from auth!!! 

        weight: 100,
        height: 150,
        age: 35,
        gender: "male",
        duration: this.state.runningTime,
        activity: this.state.activity
      }
const calculatedCalories = calculate(excObj);
     this.setState({kal:  calculatedCalories});
    console.log("kal", calculatedCalories)
      /*  
    axios
        .post(HOST + acticityPostUrl ,(
           {
            withCredentials: true,
            xsrfCookieName: 'csrftoken_testtest',
            xsrfHeaderName: 'X-CSRFToken',
        },
          {
            "username": this.state.activity,
            "description": this.state.description,
            "duration": this.state.time,
            "date": this.state.date
          
          }))
        .then(data => (this.setState({ responseData: data.data })
        ))
        .catch(err => {
            console.log(err);
            return null;
        });
        
        */
      }
      else {
        this.setState({ status: "Please fill out mandatory fields (marked with *)." });
      }
  };
  selectActivity = (id) => {
      
    this.setState({ activity: id});   
    console.log(this.state.activity);
  }
  saveTimer = (runningTime,time) => {
    this.setState({ runningTime: runningTime, time: time});  
  }
  handleDesc = (e) => {
    if (e.target.value.length > 3 ){
    this.setState({ description: e.target.value ,status: ""});}
    else {
      this.setState({ status: "Please set a description." });
    } 
  }
  handleDate = (e) => {
    if (e.target.value.length > 3 ){
    this.setState({ date: e.target.value ,status: ""});}
    else {
      this.setState({ status: "Please set a date." });
    } 
  }
  render() {
   
    return (
      <>
      {this.state.status && <div className="statusMessage"><SvgIcon name="bulb" /> {this.state.status}</div>}
        <section>
          <h4>Exercises</h4>
          <h1>Manage Exercises</h1>

          <form
            onSubmit={(e) => this.newExercise(e)}
            id="usrfrm2"
            className="box"
            method="post"
          >
    <fieldset>
              <legend>Add new exercise</legend>

            <FormInput fieldName={"Description"} type={"text"} required={true} handler={e => this.handleDesc(e)} />
   
            <div className="fieldrow">
            
              <StopWatch saveTimer={this.saveTimer} time={this.state.time}/>           
              <FormInput fieldName={"Date"} type={"date"} required={true} handler={e => this.handleDate(e)} />
              <FormInput fieldName={"Calories"} type={"text"} required={false} value={this.state.kal? this.state.kal : ""} />
 
              
            </div>
            </fieldset>
            <ActivityList activity={this.state.activity} activities={this.state.users} handler={(id) => this.selectActivity(id)} />

             <button className="btn" onSubmit={(e) => this.newExercise(e)} type="submit">Save Exercise</button>
             or
             <div className="field"></div>
            <div className="container">                   
                <button className="activities select" style={{maxHeight:"auto"}}>Track on Map</button>
              </div>
          </form>
          
{this.state.responseData && 
          <div className="box">
            <div className="field">
              <h2>
                Successfully created a new exercise.
              </h2>
              <h2>
                {this.state.responseData}
              </h2>
            </div>
          </div>


}        </section>
      </>
    );
  }
}

export default Exercises;
