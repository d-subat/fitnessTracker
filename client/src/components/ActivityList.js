import React, { Component } from "react";
import axios from "axios";
import SvgIcon from "./SvgIcon";
import Loader from "./loader";

const HOST = "http://localhost:4000";
const activityGetUrl = "/api/exercise/users";

class ActivityList extends Component {
  state = {
    users: [],
    exercises: [],
    activity: "",
    status: ""
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

  render() {
    return (
      <>
        <legend>Select Activity </legend>
        <div className="container grid">
          {this.state.users.length === 0 ? (
             <Loader />
          ) : (
            this.state.users.map((e, i) => {
              return (
                <div
                  key={i}
                  onClick={() => this.props.handler(e.username)}
                  className={
                    this.props.activity === e.username
                      ? "activities select active"
                      : "activities select"
                  }
                >
                  {this.props.deleteUser && (
                    <div
                      className="delete"
                      onClick={() => this.props.deleteUser(e._id, e.username)}>
                      <SvgIcon name="Reset" />
                    </div>
                  )}
                  {e.username}
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
}

export default ActivityList;
