import React from "react";

import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { AuthUserContext, withAuthorization}  from './Session';

const Sidebar = props => (
  


  <nav  className={ props.sideBar && "active"}>

     
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
      {authUser.height}
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
     
     <div class="morph-shape" data-morph-open="M300-10c0,0,295,164,295,410c0,232-295,410-295,410" data-morph-close="M300-10C300-10,5,154,5,400c0,232,295,410,295,410">
	 
     <svg width="100" height="130" viewBox="0 0 75 47" xmlns="http://www.w3.org/2000/svg">
     <path fill="none" d="M300-10c0,0,0,164,0,410c0,232,0,410,0,410" fill-rule="nonzero" fill="#070707">
<animate dur="5s" repeatCount="indefinite" attributeName="d" 
values="M300-10c0,0,295,164,295,410c0,232-295,410-295,410 Z;" 
fill="freeze"
      calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </path>
</svg>
</div>
  </nav>
 
	

);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Sidebar);
