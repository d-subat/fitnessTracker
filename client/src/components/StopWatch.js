import React, { Component,useEffect,useState } from "react";
import SvgIcon from "./SvgIcon";


class Stopwatch extends Component {
  state = {
    status: false,
    runningTime: 0,
    time: "",
  };
  handleTimer = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
          let seconds = ("0" + (Math.floor(this.state.runningTime / 1000) % 60)).slice(-2);
          let minutes = ("0" + (Math.floor(this.state.runningTime / 60000) % 60)).slice(-2);
          let hours = ("0" + Math.floor(this.state.runningTime / 3600000)).slice(-2);
          this.setState({ time: hours+":"+minutes+":"+seconds});
          this.props.saveTimer( hours+":"+minutes+":"+seconds);
        },1000);
      }
      return { status: !state.status };
    });
  };
  handleReset = () => {
    clearInterval(this.timer); 
    this.props.saveTimer( ""+":"+":"+"");
    this.setState({ time:""+":"+":"+"", runningTime: 0, status: false });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { status, runningTime } = this.state;  
    return (
      <div className="field duration">     
              
            <button onClick={this.handleTimer}>{!status? <SvgIcon name="Record" />: <SvgIcon name="Stop" />}</button>

            <div className="field time">
            <label for="dur">Duration *(mins.)</label>
            <input
              id="dur"
              type="time"
              min="0"
              step="1"
              onChange={(ev) => {this.setState({time:ev.target.value})}}
              name="duration"
              value={this.state.time}
              required
            />
            
          </div>

            {this.state.status === true && runningTime > 0 && (
              <button className="reset" onClick={this.handleReset}><SvgIcon name="Reset" /></button>
            )}
            </div>
    );
  }
}

export default Stopwatch;
