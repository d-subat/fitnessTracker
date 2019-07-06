import React from "react";

import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";

const Sidebar = props => (
  <nav className={props.sideBar && "active"}>
           
    <div className="profile">
    <NavLink key="profile" to="/profile">       
      <div className="user-image">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          className="img-radius"
          alt="User-Profile"
        />
      </div>
      <h4>Alessa Robert</h4>
      
      <h5>Activity Level: 87%</h5>
      <ul className="activity-lvl">
        <li className="active" />
        <li className="active" />
        <li className="active" />
        <li />
        <li />
      </ul>
    
    </NavLink>
    </div>
    {props.routes.map(route => (
      <NavLink activeClassName="active" key={route.name} to={route.path}>
        <SvgIcon name={route.name} />
        {route.name}
      </NavLink>
    ))}
  </nav>
);

export default Sidebar;
