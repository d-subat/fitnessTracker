import React, { Component } from "react";
import axios from "axios";

const HOST = "http://localhost:4000";
const acticityGetUrl = "/api/exercise/users";
const acticityPostUrl = "/api/exercise/new-user";
const myUrl = HOST + acticityGetUrl;

class Exercises extends Component {
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
  selectActivity = (e) => {
    this.setState({ newuser: e.target.value ,status: ""});   
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
            class="box"
            method="post"
          >
            <label for="selectUser">Select Activity </label>
            <div className="container">
              {this.state.users.length === 0 ? (
                <div>Loading...</div>
              ) : (
                this.state.users.map((e, i) => {
                  return (
                    <div key={i} onClick={this.selectActivity} className={this.state.newuser? "activities select" :"activities select"}>
                      {e.username}
                    </div>
                  );
                })
              )}
            </div>

            <div class="field">
              <label for="desc">Description *</label>
              <input id="desc" type="text" name="description" required />
            </div>
            <div class="fieldrow">
              <div class="field">
                <label for="dur">Duration *(mins.)</label>
                <input
                  id="dur"
                  type="number"
                  min="0"
                  name="duration"
                  required
                />
              </div>
              <div class="field">
                <label for="dat">Date </label>
                <input
                  id="dat"
                  type="date"
                  name="date"
                  value={new Date().toISOString().substring(0, 10)}
                />
              </div>
            </div>
            <button type="submit">Save Exercise</button>
          </div>

          <div class="box">
            <div class="field">
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
