import React from 'react';
import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import Stats from "./Stats";

const Dashboard = (props) => (
  <section>
  <h1 style={{fontWeight:800}}>Dashboard</h1>
<nav>
  {props.routes.map(route => (
    <NavLink activeClassName='active' key={route.name}   to={route.path}>
      <SvgIcon name={route.name} />{route.name}
    </NavLink>
  ))}
  </nav>
  <div className="container">
  <Stats sum="2390"/> <Stats sum="9"/> <Stats sum="162"/> <Stats sum="72"/>
  </div>
</section>
)

export default Dashboard;