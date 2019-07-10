import React from "react";

import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { AuthUserContext, withAuthorization}  from './Session';

const Sidebar = props => (
  <nav className={props.sideBar && "active"}>
            
    <div className="profile">
    <NavLink key="profile" to="/profile">  
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? 
 
     <>    
      <div className="user-image">
        <img
          src={authUser.providerData[0].photoURL}
          className="img-radius"
          alt="User-Profile"
        />
      </div>
      <h4>{authUser.providerData[0].displayName}</h4>
      
      <h5>Activity Level: 87%</h5>
      <ul className="activity-lvl">
        <li className="active" />
        <li className="active" />
        <li className="active" />
        <li />
        <li />
      </ul>
      </>
      : "NonAuth"
    }
      </AuthUserContext.Consumer>
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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Sidebar);
