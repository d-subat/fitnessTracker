import React, { Component } from "react";
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";

class Stopwatch extends Component {
  state = {
    status: false,
    runningTime: 0,
    time: "",
  };
  handleTimer = () => {
    console.log(this.state.time)
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
  handleChange = (e) => {
    this.setState({time:e.target.value})
  }
  handleReset = () => {
    clearInterval(this.timer); 
    this.props.saveTimer( "::");
    this.setState({ time:"", runningTime: 0, status: false });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { status, runningTime } = this.state;  
    return (
      <div className="field duration">     
              
             <FormInput fieldName={"StopWatch"} type={"time"} required={true} handler={e => this.handleChange(e)} />
 
            <div className="field time">
            <label htmlFor="dur">Duration *(mins.)</label>
            <input
              id="dur"
              type="time"
              min="0"
              step="1"
              onChange={(ev) => {this.setState({time:ev.target.value})}}
              name="duration"
              defaultValue={this.state.time}
              required
            />
            
          </div>
          <button onClick={this.handleTimer} title="Record exercise duration">{!status? <SvgIcon name="Record" />: <SvgIcon name="Stop" />}</button>

            {    runningTime>0 && (
              <button className="reset" onClick={this.handleReset}><SvgIcon name="Reset" /></button>
            )}
            </div>
    );
  }
}

export default Stopwatch;
