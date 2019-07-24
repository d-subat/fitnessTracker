import React, { Component } from "react";

import SvgIcon from "./SvgIcon";
import Loader from "./loader";



class ActivityList extends Component {
 
  

  async componentDidMount() {
 
   
    const item = document.getElementsByClassName("scrollwrapper")[0];
    item.addEventListener("wheel", onScroll);
    item.addEventListener("touchmove", onScroll);
    item.addEventListener("mousedown", onScroll);
    item.addEventListener("mouseup", () => item.removeEventListener('mousemove', onScroll ) );
    
    function onScroll(e) {
      if (e.deltaY > 0) item.scrollLeft += 25;
      else item.scrollLeft -= 25;
    }
  }





  render() {
    return (
      <>
 
        <legend>Select Activity </legend>
        <div className="scrollheader"></div>
        <div className="scrollwrapper no-scrollbar">
          <ul className={this.props.activities.length === 0 ? "hs full no-scrollbar center" : "hs full no-scrollbar"}>
          
            {this.props.activities.length === 0 ? (
          <Loader />
            ) : (
              this.props.activities.map((e, i) => {
                return (
                  <li 
                    key={i}
                    onClick={() => this.props.handler(e.name)}
                    className={
                      this.props.activity === e.name
                        ? "active  activities select item"
                        : "activities select item "
                    }
                  >
                 
                    {this.props.deleteToggle && (
                      <div
                        className="delete"
                        onClick={() => this.props.deleteUser(e._id, e.name)}
                      >
                        <SvgIcon name="Reset" />
                      </div>
                    )}
                    {e.name}
                  </li>
                );
              })
            )}
          </ul>
          
        </div>
      </>
    );
  }
}

export default ActivityList;
