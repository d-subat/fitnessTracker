import React, { Component } from "react";
import axios from "axios";
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";
import ActivityList from "./ActivityList";


const HOST = "http://localhost:4000";
const acticityPostUrl = "/api/exercise/new-user";
const acticityPatchUrl = "/api/exercise/delete-user";


class Activities extends Component {
  state = {
    users: [],
    activity: "",
    status: ""
  };
 
  activity = () => {
    //#### STATUS MESSAGE!!!
    if (this.state.activity.length > 3) {
      const username = this.state.activity;
      axios
        .post(HOST + acticityPostUrl, { username: username })
        .then(data => this.setState({users: data.data.reverse()}) )
        .catch(err => {
          console.log(err);
          return null;
        });
    } else {
      this.setState({
        status: "Please fill out mandatory fields (marked with *)."
      });
    }
  };
  deleteUser = (id,element) => {
    //#### STATUS MESSAGE!!!

    axios
      .post(HOST + acticityPatchUrl, { _id: id })
      .then(data => {
        this.setState({ status: "Sucessfully deleted activity: " + element });
        console.log(data)
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  handleMessageInput = e => {
    //#### ERROR CHECK auf empty
    if (e.target.value.length > 3) {
      this.setState({ activity: e.target.value, status: "" });
    } else {
      this.setState({ status: "Activity name must be longer than 3 letters." });
    }
  }
errorCheck = e => {
    
    this.setState([]);    
    if(!e.target.reportValidity()) {
      this.setStates([e.target.type,"Please fill out mandatory fields (marked with *)."]);       
    }
    
}
  render() {
    return (
      <>
        {this.state.status && (
          <div className="statusMessage">
            <SvgIcon name="bulb" /> {this.state.status}
          </div>
        )}
        <section>
          <h4>Overview</h4>
          <h1>Edit Activities</h1>
          <div className="box">
            <fieldset>
              <legend>Manage Activities</legend>
              <div className="fieldrow">
                <FormInput fieldName={"Activity Name"} type={"text"} required={true} handler={e => this.handleMessageInput(e)}   />
                <FormInput fieldName={"MET value"} type={"text"} required={true} handler={e => this.handleMessageInput(e)}   />
              </div>
              <div className="fieldrow">
                <button className="btn" onClick={() => this.activity()}>
                  Create New Activity
                </button>
              </div>
            </fieldset>
            <ActivityList deleteToggle={true} handler={() => {return false}} deleteUser={(id,element) => this.deleteUser(id,element)}/>
 
         
          </div>
        </section>
      </>
    );
  }
}

export default Activities;
