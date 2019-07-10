import React, { Component } from "react";
import axios from "axios";
import StopWatch from "./StopWatch";


const HOST = "http://localhost:4000";
const acticityGetUrl = "/api/exercise/users";
//const acticityPostUrl = "/api/exercise/new-user";
const myUrl = HOST + acticityGetUrl;

class Exercises extends Component {
  state = {
    users: [],
    newuser: "",
    status: "",
    time: ""
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
  selectActivity = (id) => {
      
    this.setState({ newuser: id});   
    console.log(this.state.newuser);
  }
  saveTimer = (time) => {
    this.setState({ time: time});  
  }
  render() {
    return (
      <>
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
              <input id="desc" type="text" name="description" required />
            </div>
            <div className="fieldrow">
            
              <StopWatch saveTimer={this.saveTimer} time={this.state.time}/>           
            
              
              
              
              <div className="field">
                <label htmlFor="dat">Date </label>
                <input
                  id="dat"
                  type="date"
                  name="date"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                />
              </div>
            
            </div>
             <button className="btn" type="submit">Save Exercise</button>
             or
             <div className="field"></div>
            <div className="container">                   
                <button className="activities select" style={{maxHeight:"auto"}}>Track on Map</button>
              </div>
          </div>

          <div className="box">
            <div className="field">
              <h2>
                Successfully created a new user 'test', User ID = 'a7fd89e'
              </h2>
              <h2>
                Successfully added a new exercise on '09-27-2018' for User ID
                'a7fd89e' (user 'test'), description is 'my exercise
                description', duration set to '10' mins.{" "}
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Exercises;
