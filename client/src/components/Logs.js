import React, { Component } from "react";
import axios from "axios";

const HOST = "http://localhost:4000";
const acticityGetUrl = "/api/exercise/users";
const acticityPostUrl = "/api/exercise/new-user";
const myUrl = HOST + acticityGetUrl;

class Logs extends Component {
  state = {
    users: [],
    newuser: "",
    status: ""
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
  render() {
    return (
  <>
  <section>
  <h4>Overview</h4>
  <h1>Recent Exercises</h1>
  
  <div action="/api/exercise/log" method="get" id="usrfrm3" class="box">
      
  <label for="selectUser">Select Activity </label>
            <div className="container">
              {this.state.users.length === 0 ? (
                <div>Loading...</div>
              ) : (
                this.state.users.map((e, i) => {
                  return (
                    <div key={i} className="activities select">
                      {e.username}
                    </div>
                  );
                })
              )}
            </div>
      
      <div class="fieldrow    ">
          <div class="field">
              <label for="from">From (Date)</label>
              <input id="from" type="date" name="from"      value={new Date().toISOString().substring(0, 10)}/>
          </div>
          <div class="field">
              <label for="to">To (Date)</label>
              <input id="to" min="" onfocus="document.getElementById('to').min = document.getElementById('from').value "
                  type="date" name="to"      value={new Date().toISOString().substring(0, 10)}/>
          </div>
          <div class="field">
              <label for="limit">Limit Count </label>
              <input id="limit" type="number" min="1" name="limit"/>
          </div>
      </div>
      <button type="submit">List Exercises</button>
      </div>
            
            <div class="box">
      <h2>Successfully searched for exercises for User ID 'a7fd89e' (user 'test') from
          '08-11-2017' to '09-27-2018':</h2>
      <div id="result3">

          <h3>View as List Grid</h3>
          <div class="log">
              <div class="exercise">
                  <div class="date"> 01-06-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 2 mins</div>
              </div>
              <div class="exercise">
                  <div class="date"> 02-07-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 20 mins</div>
              </div>
              <div class="exercise">
                  <div class="date"> 03-06-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 2 mins</div>
              </div>
          </div>
      </div>
      </div>
  </section>
</>

);
}
}


export default Logs;