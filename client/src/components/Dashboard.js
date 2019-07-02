import React from "react";
import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import Stats from "./Stats";

const Dashboard = props => (
  <>
  <h4>Overview</h4>
    <h1 >Statistics Panel</h1>
    <section>
      <div className="container">
        <Stats sum="2390" name="Exercises"/> <Stats sum="9" name="Activities"/> <Stats sum="162" name="Days"/>{" "}
        <Stats sum="72" name="Kalories"/>
      </div>
    </section>

    
  </>
);

export default Dashboard;
