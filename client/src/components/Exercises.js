import React, { Component } from "react";
import axios from "axios";
import StopWatch from "./StopWatch";
import MetTable, {calculate} from "./MetTable"
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";


const HOST = "http://localhost:4000";
const acticityGetUrl = "/api/exercise/users";
const acticityPostUrl = "/api/exercise/add";
const myUrl = HOST + acticityGetUrl;

class Exercises extends Component {
  state = {
    users: [],
    newuser: "",
    
    description: "",
    time: "",
    date: new Date().toISOString().substring(0, 10),
    kal: "",
    status: "",
    responseData: ""
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
  newExercise = () => {
    //#### STATUS MESSAGE!!!
    console.log(this.state);
    if (this.state.newuser.length > 3 && this.state.description && this.state.time && this.state.date){
      


    
    axios
        .post(HOST + acticityPostUrl ,(
           {
            withCredentials: true,
            xsrfCookieName: 'csrftoken_testtest',
            xsrfHeaderName: 'X-CSRFToken',
        },
          {
            "username": this.state.newuser,
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
        
      }
      else {
        this.setState({ status: "Please fill out mandatory fields (marked with *)." });
      }
  };
  selectActivity = (id) => {
    if (id.length > 3 ){
      this.setState({ newuser: id,status: ""});}
      else {
        this.setState({ status: "Please choose an activity." });
      }
  }
  saveTimer = (time) => {
    this.setState({ time: time});  
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
          <h1>Add new exercise</h1>

          <div
            action="/api/exercise/add"
            id="usrfrm2"
            className="box"
            method="post"
          >
            <label htmlFor="selectUser">Select Activity </label>
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

            <div className="field">
              <label htmlFor="desc">Description *</label>
              <input id="desc" type="text"   onChange={this.handleDesc} name="description" required />
            </div>
            <div className="fieldrow">
            
              <StopWatch saveTimer={this.saveTimer} time={this.state.time}/>           
            
              
              
              <FormInput fieldName={"Date"} type={"date"} required={true} handler={e => this.handleDate(e)} />
              <FormInput fieldName={"Calories"} type={"text"} required={false} handler={e => calculate(e)} />
 
              <div className="field">
                <label htmlFor="dat">Date </label>
                <input
                  id="dat"
                  type="date"
                  name="date"
                  onClick={this.handleDate}
                  defaultValue={this.state.date}
                />
              </div>
            
              <div className="field">
                <label htmlFor="kal">Kalories</label>
                <input
                  className="readonlyInput"
                  id="kal"
                  name="kal"
                  value={this.state.kal}
                />
              </div>
            </div>
             <button className="btn" onClick={() => this.newExercise()} type="submit">Save Exercise</button>
             or
             <div className="field"></div>
            <div className="container">                   
                <button className="activities select" style={{maxHeight:"auto"}}>Track on Map</button>
              </div>
          </div>
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
